const express = require('express');
const router = express.Router();
const {
    loadpage,
    getMostFav,
    search
} = require('../controller/adminMostFavC');


router.get('/', loadpage);
router.get('/getMostFav', getMostFav);
router.post('/search', search);

module.exports = router; 