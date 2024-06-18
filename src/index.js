const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { requireAuth, checkUserEJS, adminOnly } = require('../middleware/authMiddleware.js');
// const { checkJ } = require('../middleware/jDetailsMiddleware.js');
// const expressLayouts = require('express-ejs-layouts')        
//env**********************************************************
require('dotenv').config();
const port = 5555;

//Db***********************************************************
const connectDb = require('./mongo.js')
connectDb();

//path*********************************************************
const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
console.log(publicPath)

app.set('view engine', 'ejs');

//middleware************************************
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressLayouts);
//routes*************************************************

app.get('*', checkUserEJS);
app.post('*', checkUserEJS);
app.put('*', checkUserEJS);
app.delete('*', checkUserEJS);

const homeRoute = require('../routes/homeRoute.js');
app.use('/', homeRoute);

const authenticationRoute = require('../routes/authenticationRoute.js');
app.use('/authentication', authenticationRoute);

const userAccountRoute = require('../routes/userAccountRoute.js');
app.use('/userAccount', requireAuth, userAccountRoute);

// const forgotRoute = require('../routes/forgotRoute.js');
// app.use('/forgot',forgotRoute);

const jListRoute = require('../routes/jListRoute.js');
app.use('/jList', jListRoute);

const favListRoute = require('../routes/favListRoute.js');
app.use('/favList', requireAuth, favListRoute);

const jDetailsRoute = require('../routes/jDetailsRoute.js');
app.use('/jDetails', jDetailsRoute);

const bookListRoute = require('../routes/bookListRoute.js');
app.use('/bookList', requireAuth, bookListRoute);


//admin************************************************
const adminDashRoute = require('../routes/adminDashRoute.js');
app.use('/admin', adminOnly, adminDashRoute);

const adminAddJR = require('../routes/adminAddJR.js');
app.use('/adminAddJ', adminOnly, adminAddJR);

const adminRemJR = require('../routes/adminRemJR.js');
app.use('/adminRemJ', adminOnly, adminRemJR);

const adminRemJFormR = require('../routes/adminRemJFormR.js');
app.use('/adminRemJForm', adminOnly, adminRemJFormR);  

const adminUpdateJR = require('../routes/adminUpdateJR.js');
app.use('/adminUpdateJ', adminOnly, adminUpdateJR);

const adminUpdateJFormR = require('../routes/adminUpdateJFormR.js');
app.use('/adminUpdateJForm', adminOnly, adminUpdateJFormR);

const adminReadJR = require('../routes/adminReadJR.js');
app.use('/adminReadJ', adminOnly, adminReadJR);

const adminSeeJFormR = require('../routes/adminSeeJFormR.js');
app.use('/adminSeeJForm', adminOnly, adminSeeJFormR);  

const adminManageBookingsR = require('../routes/adminManageBookingsR.js');
app.use('/adminManageBookings', adminOnly, adminManageBookingsR);

const adminMostFavR = require('../routes/adminMostFavR.js');
app.use('/adminMostFav', adminOnly, adminMostFavR);

const adminTopSellersR = require('../routes/adminTopSellersR.js');
app.use('/adminTopSellers', adminOnly, adminTopSellersR);

const adminUsersDetailsR = require('../routes/adminUsersDetailsR.js');
app.use('/adminUsersDetails', adminOnly, adminUsersDetailsR);


//port listen********************************************
app.listen(port, () => {
    console.log(`${port} Port connected`);
});