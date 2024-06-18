const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');


const loadpage = async (req, res) => {
    res.render("adminUpdateJ");
}


// const updateJ = async (req, res) => {
//     const { formData } = req.body;
//     console.log(formData);
//     try {
//         const jewellery = await jewelleries.create(formData);
//         // await jewellery.save();
//         res.status(201).send('Jewellery added successfully!');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Failed to add jewellery');
//     }
// }


module.exports = {
    loadpage,
    // updateJ


}