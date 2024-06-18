const jwt = require('jsonwebtoken');
const users = require('../models/userModel')


const requireAuth = (req, res, next) => {
    const token = req.cookies.user;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("Error occured while verifying token")
                res.redirect('/');
            } else {
                // console.log("token is verified");
                next();
            }
        })
    } else {
        res.redirect('/');
    }
}

const adminOnly = (req, res, next) => {
    const token = req.cookies.admin;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("Error occured while verifying token")
                res.redirect('/');
            } else {
                // console.log("token is verified");
                next();
            }
        })
    } else {
        res.redirect('/');
    }
}


const checkUserEJS = (req, res, next) => {
    const token = req.cookies.user;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await users.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, adminOnly, checkUserEJS };
