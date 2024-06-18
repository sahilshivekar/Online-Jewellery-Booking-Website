const express = require('express');
const router = express.Router();
const {loadpage, getMostFav, getTopSellers}  = require('../controller/homeController');


router.get('/', loadpage);
router.get('/getMostFav', getMostFav);
router.get('/getTopSellers', getTopSellers);


module.exports = router; 