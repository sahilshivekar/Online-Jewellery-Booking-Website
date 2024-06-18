const bookings = require('../models/bookModel')
const jewelleries = require('../models/jModel');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const nodemailer = require('nodemailer');

//load page
const loadpage = async (req, res) => {
    res.render('bookList')
}





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










//giving list of all jewelleries in the favourites table
const getBookings = async (req, res) => {
    try {
        const { userId } = req.body;
        const Array = await bookings.find({ userId });

        if (Array.length == 0) {
            res.status(200).json({ Array: null });
        } else {
            res.status(200).json({ Array });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ err });
    }

}

//to get the specific jewellery Details on popup
const getBookingSingle = async (req, res) => {
    try {
        const { _id } = req.body;
        const Details = await bookings.findById(_id);

        res.status(200).json({ Details });


    } catch (err) {
        console.log(err.message);
        res.status(500).json({ err });
    }

}



const remBook = async (req, res) => {
    try {
        const { userId, jewelleryId, qtyBooked, _id } = req.body;
        const delAck = await bookings.deleteOne({ _id });
        const jewellery = await jewelleries.findById(jewelleryId);
        const qtyUpdate = qtyBooked + jewellery.qty;
        console.log(jewellery.qty, 1)
        console.log(qtyBooked, "1")
        console.log(qtyUpdate)

        const j = await jewelleries.findById(jewelleryId);
        const totalPrice = j.price * parseInt(qtyBooked);

        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const commaPrice = formatPrice(totalPrice);



        const addQty = await jewelleries.findByIdAndUpdate(
            jewelleryId,
            { qty: qtyUpdate, availability: true }
        )
        const updatedJewellery = await jewelleries.findById(jewelleryId);
        const user = await users.findById(userId);
        const email = user.email;
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
            subject: 'Booking is canceled', // Subject line
            text: `
You canceled your booking with the following details!


Jewellery Name:${updatedJewellery.name}
Category:${updatedJewellery.category}
Quantity:${qtyBooked}
Total Price:\u20B9${commaPrice}


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
                res.status(200).json({ delAck, addQty });
                // res.status(200).json({ add, updateAck, updatedJewellery });
            }
        });



        const toAdmin = {
            from: '"onlinejewellerybooking@gmail.com",<xlrg dblz oshj aamj>', // sender address
            to: 'onlinejewellerybooking@gmail.com', // list of receivers
            subject: 'Booking canceled', // Subject line
            text: `

A user with emailID ${email} has canceled his booking.

here are the booking Details:
Jewellery Name:${updatedJewellery.name}
Category:${updatedJewellery.category}
Quantity:${qtyBooked}
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
        // console.log("Removed:", delAck.acknowledged, "Count:", delAck.deletedCount);
        // console.log("total left:", addQty.qty, "availability:", addQty.availability);

    } catch (err) {
        const errorMsg = err.message;
        console.log("***in remFav(trash) fun***", err);
        res.status(500).json({ err: errorMsg });
    }
}



module.exports = {
    loadpage,
    checkUser,
    getBookings,
    remBook,
    getBookingSingle
}