const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')


const loadpage = async (req, res) => {
    res.render("adminManageBookings");
}

//giving list of all jewelleries in the favourites table
const getBookings = async (req, res) => {
    try {

        const bookingsList = await bookings.find();

        const Array = [];
        for (let i = 0; i < bookingsList.length; i++) {
            const booking = bookingsList[i];
            const userId = booking.userId;
            const user = await users.findById(userId);
            const emailId = user.email;
            const newBooking = {
                ...booking.toObject(),
                email: emailId
            }
            Array.push(newBooking)
        }
        // console.log(Array);
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



const remBook = async (req, res) => {
    try {
        const { jewelleryId, qtyBooked, _id } = req.body;
        const booking = await bookings.findById(_id);
        const delAck = await bookings.deleteOne({ _id });
        const jewellery = await jewelleries.findById(jewelleryId);
        const qtyUpdate = qtyBooked + jewellery.qty;

        const userId = booking.userId;

        const totalPrice = booking.totalPrice;

        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const commaPrice = formatPrice(totalPrice);


        const addQty = await jewelleries.findByIdAndUpdate(
            jewelleryId,
            { qty: qtyUpdate, availability: true }
        )

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
Dear Customer, your booking with the following details is canceled by the admin!


Jewellery Name:${jewellery.name}
Category:${jewellery.category}
Quantity:${qtyBooked}
Total Price:\u20B9${commaPrice}


` // plain text body
        };

        // Send email
        transporter.sendMail(toUser, (error, info) => {
            if (error) {
                console.error('Error occurred while sending email:', error.message);
                res.status(500).json({ error });

                // res.status(500).send('Error occurred while sending email');
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
            
You canceled booking of a user with emailID ${email}.

here are the booking Details:
Jewellery Name:${jewellery.name}
Category:${jewellery.category}
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

        // res.status(200).json({ delAck, addQty });
    } catch (err) {
        const errorMsg = err.message;
        console.log("***in remFav(trash) fun***", err);
        res.status(500).json({ err: errorMsg });
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


// mark as sold

const markSold = async (req, res) => {
    try {
        const { jewelleryId, qtyBooked, _id } = req.body;
        const booking = await bookings.findById(_id);
        const delAck = await bookings.deleteOne({ _id });
        const jewellery = await jewelleries.findById(jewelleryId);
        console.log(jewellery);
        if (jewellery.sold) {
            jewellery.sold += qtyBooked;
        } else {
            jewellery.sold = qtyBooked;
        }
        const newJ = await jewelleries.updateOne(
            { _id: jewelleryId },
            { $set: { sold: jewellery.sold } }
        )



        //////////////
        const userId = booking.userId;

        const totalPrice = booking.totalPrice;

        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const commaPrice = formatPrice(totalPrice);


        // const addQty = await jewelleries.findByIdAndUpdate(
        //     jewelleryId,
        //     { qty: qtyUpdate, availability: true }
        // )

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
            subject: 'Thanks for Purchasing', // Subject line
            text: `
Dear Customer,

We hope this message finds you well and filled with excitement for your recent purchase!
            
Thank you for choosing us for your jewelry needs. It's our pleasure to serve you, and we're thrilled that you've found something special in our collection. Each piece is crafted with care and designed to bring joy and elegance to your life.

Here are the details:
Jewellery Name:${jewellery.name}
Category:${jewellery.category}
Quantity:${qtyBooked}
Total Price:\u20B9${commaPrice}


` // plain text body
        };

        // Send email
        transporter.sendMail(toUser, (error, info) => {
            if (error) {
                console.error('Error occurred while sending email:', error.message);
                res.status(500).json({ error });

                // res.status(500).send('Error occurred while sending email');
            } else {
                console.log('Email sent successfully:', info.response);
                res.status(200).json({ delAck, newJ });
                v
                // res.status(200).json({ add, updateAck, updatedJewellery });
            }
        });



        const toAdmin = {
            from: '"onlinejewellerybooking@gmail.com",<xlrg dblz oshj aamj>', // sender address
            to: 'onlinejewellerybooking@gmail.com', // list of receivers
            subject: 'Purchase alert', // Subject line
            text: `
           
Dear admin,
            

A user with emailID ${email} purchased a jewellery.

Below are the details:
Jewellery Name:${jewellery.name}
Category:${jewellery.category}
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

        // const jewellery = await jewelleries.findById(jewelleryId);
        // console.log(checkJ)
        // console.log("Removed:", delAck.acknowledged, "Count:", delAck.deletedCount);

    } catch (err) {
        const errorMsg = err.message;
        console.log("***in marksold fun***", err);
        res.status(500).json({ err: errorMsg });
    }
}



const search = async (req, res) => {
    try {
        const { toSearch } = req.body;


        const jewellery = await bookings.find({

            $or: [
                { name: { $regex: new RegExp(toSearch, 'i') } },
                { category: { $regex: new RegExp(toSearch, 'i') } },
                { email: { $regex: new RegExp(toSearch, 'i') } },
            ]

        });
        const b = [];
        for (let booking of jewellery) {
            const userId = booking.userId;
            const user = await users.findById(userId);
            const email = user.email;
            const withEmail = {
                ...booking.toObject(),
                email: email,
            }
            b.push(withEmail);
        }
        console.log(b)
        const newJewellery = b;

        res.status(200).json({ newJewellery });
    }
    catch (err) {
        console.log("***in searcg fun***", err)
        res.status(500).json({ err });
    }
}


module.exports = {
    loadpage,
    getBookings,
    remBook,
    getBookingSingle,
    markSold,
    search
}