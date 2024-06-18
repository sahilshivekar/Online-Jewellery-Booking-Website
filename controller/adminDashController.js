const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');




const logout = async (req, res) => {
    try {
        res.cookie('admin', '', { maxAge: 1 });
        res.status(200).json({ "cookieStatus": "removed" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}


const loadpage = async (req, res) => {
    res.render("adminDash");
}

// const mostFav = async (req, res) => {
//     try {
//         res.render('adminMostFav');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }

// const topSellers = async (req, res) => {
//     try {
//         res.render('adminTopSellers');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }

// const usersDetails = async (req, res) => {
//     try {
//         res.render('adminUsersDetails');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }

// const manageBookings = async (req, res) => {
//     try {
//         res.render('adminManageBookings');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }

// const addJ = async (req, res) => {
//     try {
//         res.render('adminAddJ');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }

// const remJ = async (req, res) => {
//     try {
//         res.render('adminRemJ');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }

// const updateJ = async (req, res) => {
//     try {
//         res.render('adminUpdateJ');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }

// const readJ = async (req, res) => {
//     try {
//         res.render('adminReadJ');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ err });
//     }
// }



module.exports = {
    loadpage,
    logout
    // mostFav,
    // topSellers,
    // usersDetails,
    // manageBookings,
    // addJ,
    // remJ,
    // updateJ,
    // readJ,
}
