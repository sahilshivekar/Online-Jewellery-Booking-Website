const express = require('express');
const router = express.Router();
const {
    loadpage
} = require('../controller/adminReadJC');


router.get('/', loadpage);

module.exports = router; 