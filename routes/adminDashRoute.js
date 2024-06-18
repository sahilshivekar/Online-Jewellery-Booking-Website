const express = require('express');
const router = express.Router();
const {
    loadpage,
    logout
    // mostFav,
    // topSellers,
    // usersDetails,
    // manageBookings,
    // addJ,
    // remJ,
    // updateJ,
    // readJ,
} = require('../controller/adminDashController');


router.get('/', loadpage);
router.get('/logout', logout)
// router.get('/mostFav', mostFav);
// router.get('/topSellers', topSellers);
// router.get('/usersDetails', usersDetails);
// router.get('/manageBookings', manageBookings);
// router.get('/addJ', addJ);
// router.get('/remJ', remJ);
// router.get('/updateJ', updateJ);
// router.get('/readJ', readJ);


module.exports = router; 