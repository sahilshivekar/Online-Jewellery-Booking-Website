const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');


const loadpage = async (req, res) => {
    const id = req.query.id;
    const j = await jewelleries.findById(id);
    
    res.render("adminReadJForm",{j});
}

// const deleteJ = async (req, res) => {
//     const { formData } = req.body;
//     const id = formData._id;

//     try {
//         const jewellery = await jewelleries.findByIdAndDelete(id);
//         res.status(201).json({jewellery});

//     } catch (error) {
//         console.error(error);
//         res.status(500).json(error);
//     }
// }

module.exports = {
    loadpage,
    // deleteJ
}