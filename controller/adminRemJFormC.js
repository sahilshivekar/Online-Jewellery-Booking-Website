const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');


const loadpage = async (req, res) => {
    const id = req.query.id;
    const j = await jewelleries.findById(id);

    res.render("adminRemJForm", { j });
}

const deleteJ = async (req, res) => {
    const { formData } = req.body;
    const id = formData._id;
    const jewelleryId = id;

    try {
        const jewellery = await jewelleries.findByIdAndDelete(id);
        const favJs = await favourites.deleteMany({ jewelleryId });
        const bookjs = await bookings.deleteMany({ jewelleryId });
        // const j = await jewelleries.findById(id);
        // favJs.forEach((j) => {
        //     console.log(j);
        // })
        // bookjs.forEach((j) => {
        //     console.log(j);
        // })
        res.status(201).json({ jewellery, favJs, bookjs });

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = {
    loadpage,
    deleteJ
}