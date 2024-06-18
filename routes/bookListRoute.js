const express = require('express');
const router = express.Router();
const { 
    loadpage, 
    checkUser, 
    getBookings, 
    remBook,
    getBookingSingle
} = require('../controller/bookListController');


router.get('/', loadpage);
router.get('/user', checkUser);
router.post('/getBookings', getBookings);
router.post('/remBook', remBook);
router.post('/getBookingSingle', getBookingSingle);





module.exports = router;