const express = require('express');
const router = express.Router();
const {
    loadpage,
    // updateJ
} = require('../controller/adminUpdateJC');


router.get('/', loadpage);
// router.post('/updateJ', updateJ);
// router.post('/search', updateJ);

module.exports = router; 