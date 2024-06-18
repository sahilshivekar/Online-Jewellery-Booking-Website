const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');


const loadpage = async (req, res) => {
    res.render("adminUsersDetails");
}

const getUsers = async (req, res) => {
    try {
        const usersList = await users.find();
        res.status(200).send({ usersList });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}

const search = async (req, res) => {
    try {
        const { toSearch } = req.body;
        const user = await users.find({
            $or: [
                { fullName: { $regex: new RegExp(toSearch, 'i') } },
                { email: { $regex: new RegExp(toSearch, 'i') } }
            ]
        });

        // Return the results
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}

module.exports = {
    loadpage,
    getUsers,
    search
}