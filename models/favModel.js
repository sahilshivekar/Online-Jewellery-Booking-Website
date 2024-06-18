const mongoose = require('mongoose');

const fSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        jewelleryId: {
            type: String,
            required: true,
            unique: false
        },
    },
    {
        timestamps: true,
    },
);


const favourites = mongoose.model('favourites', fSchema);
module.exports = favourites;