const express = require('express');
const router = express.Router();
const {
    loadPage,
    checkUser,
    addFav,
    remFav,
    showFav,
    addBook,
    // remBook,
    // showBook
} = require('../controller/jDetailsController');

router.get('/', loadPage);
router.get('/user', checkUser);
router.post(`/addFav`, addFav);
router.post(`/remFav`, remFav);
router.post(`/showFav`, showFav);
router.post(`/addBook`, addBook);
// router.post(`/remBook`, remBook);
// router.post(`/showBook`, showBook);
module.exports = router;