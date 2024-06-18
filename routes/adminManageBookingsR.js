const express = require('express');
const router = express.Router();
const {
    loadpage,
    getBookings,
    remBook,
    getBookingSingle,
    markSold,
    search
} = require('../controller/adminManageBookingsC');


router.get('/', loadpage);
router.get('/getBookings', getBookings);
router.post('/remBook', remBook);
router.post('/getBookingSingle', getBookingSingle);
router.post('/markSold', markSold);
router.post('/search', search);


module.exports = router; 