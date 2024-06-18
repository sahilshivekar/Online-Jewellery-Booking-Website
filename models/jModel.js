const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');
const availabilitySchema = new mongoose.Schema({
    available: Boolean,
    sold: Boolean,
    booked: Boolean
})

const typeSchema = new mongoose.Schema({
    gold: Boolean,
    diamond: Boolean,
    silver: Boolean
})

const jSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name'],
            unique: true
        },
        category: {
            type: String,
            required: [true, 'Please enter category']
        },
        description: {
            type: String,
            required: true,
        },
        gross_weight: {
            type: Number,
            required: true
        },
        picture1: {
            type: String,
            required: true
        },
        picture2: {
            type: String,
            required: true
        },
        type: typeSchema,
        availability: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        gold_purity: {
            type: Number,
            required: false
        },
        diamond_weight: {
            type: Number,
            required: false
        },
        size: {
            type: Number,
            required: false
        },
        gender: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        sold: {
            type: Number,
            required: false
        }

    },
    {
        timestamps: true,
    },
);


const jewelleries = mongoose.model('jewelleries', jSchema);
module.exports = jewelleries;