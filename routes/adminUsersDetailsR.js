const express = require('express');
const router = express.Router();
const {
    loadpage,
    getUsers,
    search
} = require('../controller/adminUsersDetailsC');


router.get('/', loadpage);
router.get('/getUsers', getUsers);
router.post('/search', search);

module.exports = router; 