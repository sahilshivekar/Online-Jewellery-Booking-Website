const express = require('express');
const router = express.Router();
const {
    loadpage
} = require('../controller/adminRemJC');


router.get('/', loadpage);

module.exports = router; 