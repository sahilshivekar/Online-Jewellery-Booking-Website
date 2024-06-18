const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');


const loadpage = async (req, res) => {
    const id = req.query.id;
    const j = await jewelleries.findById(id);
    
    res.render("adminUpdateJForm",{j});
}


const updateJ = async (req, res) => {
    const { formData } = req.body;
    const id = formData._id;
    delete formData._id;
    for(key in formData){
        if(formData[key].length == 0){
            // console.log(formData[key].length);
            // console.log(formData[key]);
            delete formData[key];
        }
    }
    // console.log(typeof formData);
    // console.log(id);
    // console.log(formData);
    try {
        const jewellery = await jewelleries.findByIdAndUpdate(
            id,
            formData
        );
        res.status(201).json({jewellery});

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}


module.exports = {
    loadpage,
    updateJ


}