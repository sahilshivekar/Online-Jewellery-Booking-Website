const express = require('express');
const router = express.Router();
const {
    loadpage,
    // deleteJ
} = require('../controller/adminSeeJFormC');


router.get('/', loadpage);
// router.delete('/deleteJ', deleteJ);

module.exports = router; 