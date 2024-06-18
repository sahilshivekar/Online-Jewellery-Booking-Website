const express = require('express');
const app = express();
const router = express.Router();
const {loadpage, logout, saveInfo}  = require('../controller/userAccountController');


router.get('/', loadpage);
router.get('/logout', logout);
router.put('/saveInfo', saveInfo);

module.exports = router;