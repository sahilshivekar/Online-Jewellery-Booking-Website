const express = require('express');
const router = express.Router();
const {
    loadpage,
    updateJ
} = require('../controller/adminUpdateJFormC');


router.get('/', loadpage);
router.put('/updateJ', updateJ);

module.exports = router; 