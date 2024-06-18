const express = require('express');
const router = express.Router();
const { 
    loadpage,
    checkUser, 
    getJewelleries, 
    addFav, 
    showFav, 
    remFav, 
    filter,
    sort,
    // loadWithParams,
    search
} = require('../controller/jListController');


router.get('/', loadpage);
// router.post('/', loadWithParams);
router.get('/getJewelleries', getJewelleries);
router.get('/user', checkUser);
router.post('/addFav', addFav);
router.post('/remFav', remFav);
router.post('/showFav', showFav);
router.post('/filter', filter);
router.post('/search', search);

router.post('/sort', sort);

module.exports = router; 