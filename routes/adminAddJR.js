const express = require('express');
const router = express.Router();
const {
    loadpage,
    addJ
} = require('../controller/adminAddJC');


router.get('/', loadpage);
router.post('/addJ', addJ);

module.exports = router; 