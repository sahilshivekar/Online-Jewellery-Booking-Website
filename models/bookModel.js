const mongoose = require('mongoose');

const bSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        jewelleryId: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: String,
            required: true
        },
        picture1: {
            type: String,
            required: true,
        },
        picture2: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        
    },

    {
        timestamps: true,
    },
);


const bookings = mongoose.model('bookings', bSchema);
module.exports = bookings;