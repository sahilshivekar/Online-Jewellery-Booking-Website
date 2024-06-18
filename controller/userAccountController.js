const users = require('../models/userModel')
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const errHandler = (err) => {
    let errObj = { fullName: "", dob: "", phone: "" };
    if (err.message.includes('Maximum Length is 30 charaters')) {
        errObj.fullName = "Maximum Length is 30 charaters";
    }
    if (err.message.includes('Phone number must be a 10-digit number')) {
        errObj.phone = "Phone number must be a 10-digit number";
    }
    if (err.message.includes('Invalid Birthdate')) {
        errObj.dob = "Birthdate cannot be in the future";
    }
    // console.log(errObj);
    return errObj
}


const loadpage = async (req, res) => {
    res.render('userAccount');
}

const logout = async (req, res) => {
    res.cookie('user', '', { maxAge: 1 });
    res.status(200).json({ "cookieStatus": "removed" });
}

const saveInfo = async (req, res) => {
    try {
        const { email, phone, fullName, dob } = req.body;
        const token = req.cookies.user;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userID = decodedToken.id;

        const update = await users.updateOne(
            { _id: userID },
            { $set: { email, phone, fullName, dob } },
            { runValidators: true }
        );

        res.status(200).json({ user: userID });
    } catch (err) {
        errors = errHandler(err);
        res.status(400).json({ errors });
    }

}

module.exports = { loadpage, logout, saveInfo };


