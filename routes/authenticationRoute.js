const express = require('express');
const router = express.Router();
const {
    userSignin,
    userSignup,
    adminSignin,
    adminAlready
}  = require('../controller/authenticationController');


router.post('/userSignup', userSignup)
router.post('/userSignin', userSignin)
router.post('/adminSignin', adminSignin)
router.get('/adminAlready', adminAlready)



module.exports = router; 