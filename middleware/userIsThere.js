// const users = require("../models/userModel");
// const jwt = require("jsonwebtoken");


// let userId;
// const verify = (req, res) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 userStatus = false;
//                 userId = null;

//             } else {
//                 userStatus = true;
//                 userId = decoded.id;
//             }
//         })
//     } else {
//         userStatus = false;
//         userId = null;
//     }
// }
// // const getUserStatus = () => {
// //     return userStatus;
// // };

// module.exports = { verify };
