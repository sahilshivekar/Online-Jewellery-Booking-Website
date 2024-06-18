const express = require('express');
const router = express.Router();
const {
    loadpage,
    getTopSellers,
    search
} = require('../controller/adminTopSellersC');


router.get('/', loadpage);
router.get('/getTopSellers', getTopSellers);
router.post('/search', search);

module.exports = router; 