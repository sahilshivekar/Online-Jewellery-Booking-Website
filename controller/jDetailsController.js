const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

//to get userId in backend
const checkUser = (req, res) => {
    try {
        const token = req.cookies.user;
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedUser.id;
        res.json({ userId });
    } catch (err) {
        res.json({ err });
        console.log(err.message);
    }
}


//loadpage with details

//if you are getting the params in frontend first and then sendign request then it wont work
const loadPage = async (req, res) => {
    try {
        const cardId = req.query.cardId;
        const id = cardId;
        const jewellery = await jewelleries.findById(id);
        // console.log(jewellery.id)
        res.render("jDetails", { jewellery: jewellery });
    } catch (error) {
        const err = error.message;
        res.status(500).json({ err });
    }
}
//favourites*************************************************

const showFav = async (req, res) => {

    try {
        const { userId, jewelleryId } = req.body;
        const inFav = await favourites.findOne({ userId, jewelleryId });

        if (inFav) {
            res.status(200).json({ inFav });
        } else {
            const notInFav = "notInFav"
            res.status(200).json({ notInFav });
        }

    } catch (err) {
        console.log("***in showFav fun***", err.message)
        res.status(500).json({ err });
    }
    // console.log("showFav ended")
}

const addFav = async (req, res) => {
    try {
        const { jewelleryId, userId } = req.body;
        const add = await favourites.create({ userId, jewelleryId })
        res.status(200).json({ add });
    }
    catch (error) {
        const err = error.message;
        res.status(500).json({ err });
    }
}

const remFav = async (req, res) => {
    try {
        const { jewelleryId, userId } = req.body;
        const rem = await favourites.deleteOne({ userId, jewelleryId });
        res.status(200).json({ rem });
    }
    catch (error) {
        const err = error.message;
        res.status(500).json({ err });
    }
}

//bookings*************************************************
// const showBook = async (req, res) => {

//     try {
//         const { userId, jewelleryId } = req.body;
//         //start here
//         const inBook = await bookings.findOne({ userId, jewelleryId });

//         if (inBook) {
//             res.status(200).json({ inBook });
//         } else {
//             const notInBook = "notInBook"
//             res.status(200).json({ notInBook });
//         }

//     } catch (err) {
//         console.log("***in showFav fun***", err.message)
//         res.status(500).json({ err });
//     }
//     // console.log("showFav ended")
// }

const addBook = async (req, res) => {
    try {
        const { jewelleryId, userId, qty, totalPrice } = req.body;
        const id = jewelleryId;

        //finding the jewellery details to get the quantity and modify it after booking
        const jewellery = await jewelleries.findById(id);
        const qtyUpdate = jewellery.qty - qty;
        const avaUpdate = qtyUpdate == 0 ? false : true;
        const picture2 = jewellery.picture2;
        const picture1 = jewellery.picture1;
        const name = jewellery.name;
        const category = jewellery.category;


        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const commaPrice = formatPrice(totalPrice);
        //adding the booking and checking jewellery
        const add = await bookings.create({ userId, jewelleryId, qty, totalPrice, picture1, picture2, name, category });
        if (add) {
            const updateAck = await jewelleries.updateOne(
                { _id: id },
                {
                    $set: { qty: qtyUpdate, availability: avaUpdate }
                }
            )
            const updatedJewellery = await jewelleries.findById(id);
            // console.log(`Id: ${add._id}\nModified Count: ${updateAck.modifiedCount}\navailability status: ${updatedJewellery.availability}\nquatity: ${updatedJewellery.qty}\n`);





            //sending email through nodemailer




            //getting user email

            const user = await users.findById(userId)
            const email = user.email;


            // Create a Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'onlinejewellerybooking@gmail.com', // your Gmail email address
                    pass: 'xlrg dblz oshj aamj' // your Gmail password
                }
            });

            // Define a route to send an email

            // Email content
            const toUser = {
                from: '"onlinejewellerybooking@gmail.com",<xlrg dblz oshj aamj>', // sender address
                to: email, // list of receivers
                subject: 'Booking is confirmed', // Subject line
                text: `
Thank you for booking with us! 
Please note that your booking will be canceled if another customer wants to puchase the jewellery. Kindly ensure to collect your jewellery from the store as soon as possible. Failure to do so may result in cancellation of your booking. 


here are the booking Details:
Jewellery Name:${updatedJewellery.name}
Category:${updatedJewellery.category}
Quantity:${qty}
Total Price:\u20B9${commaPrice}


We look forward to serving you!
` // plain text body
            };

            // Send email
            transporter.sendMail(toUser, (error, info) => {
                if (error) {
                    console.error('Error occurred while sending email:', error.message);
                    // res.status(500).send('Error occurred while sending email');
                    res.status(500).json({ error });

                } else {
                    console.log('Email sent successfully:', info.response);
                    res.status(200).json({ add, updateAck, updatedJewellery });
                }
            });



            const toAdmin = {
                from: '"onlinejewellerybooking@gmail.com",<xlrg dblz oshj aamj>', // sender address
                to: 'onlinejewellerybooking@gmail.com', // list of receivers
                subject: 'New booking alert', // Subject line
                text: `

A user with emailID ${email} has booked a jewellery.

here are the booking Details:
Jewellery Name:${updatedJewellery.name}
Category:${updatedJewellery.category}
Quantity:${qty}
Total Price:\u20B9${commaPrice}


                ` // plain text body
            };
            // Send email
            transporter.sendMail(toAdmin, (error, info) => {
                if (error) {
                    console.error('Error occurred while sending email:', error.message);
                    // res.status(500).send('Error occurred while sending email');
                } else {
                    console.log('Email sent successfully:', info.response);
                    // res.status(200).json({ add, updateAck, updatedJewellery });
                }
            });



        }
    }
    catch (error) {
        const err = error.message;
        res.status(500).json({ err });
    }
}

// const remBook = async (req, res) => {
//     try {
//         const { jewelleryId, userId } = req.body;
//         const rem = await bookings.deleteOne({ userId, jewelleryId })
//         res.status(200).json({rem});
//     }
//     catch (error) {
//         const err = error.message;
//         res.status(500).json({ err });
//     }
// }

module.exports = {
    loadPage,
    checkUser,
    addFav,
    remFav,
    showFav,
    addBook,
    // remBook,
    // showBook
}
