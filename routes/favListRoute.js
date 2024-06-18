const express = require('express');
const router = express.Router();
const { loadpage, checkUser, getFavourites, removeFav } = require('../controller/favListController');


router.get('/', loadpage);
router.get('/user', checkUser);
router.post('/getFavourites', getFavourites);
router.post('/remFav', removeFav);





module.exports = router;