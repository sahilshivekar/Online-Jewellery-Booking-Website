const favourites = require('../models/favModel');
const jewelleries = require('../models/jModel');
const jwt = require('jsonwebtoken');

//load page
const loadpage = async (req, res) => {
    res.render('favList')
}








//to get userId in backend
const checkUser = (req, res) => {
    try {
        const token = req.cookies.user;
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedUser.id;
        res.json({ userId });
    } catch (err) {
        res.json({ err });
        console.log(err.message);
    }
}













//giving list of all jewelleries in the favourites table
const getFavourites = async (req, res) => {
    try {
        const { userId } = req.body;
        const favArray = await favourites.find({ userId });

        const jArrayGen = async () => {
            let jewellery = [];
            let jId;
            for (i = 0; i < favArray.length; i++) {
                jId = favArray[i].jewelleryId
                jewellery[i] = await jewelleries.findById(favArray[i].jewelleryId);
                if (i + 1 == favArray.length) {
                    return jewellery;
                }
            }
        }

        const Array = await jArrayGen();
        if(Array == null){
            res.status(200).json({Array:null});
        }else{
            res.status(200).json({ Array });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ err });
    }

}



const removeFav = async (req, res) => {
    try {
        const {userId, jewelleryId} = req.body;
        const delAck = await favourites.deleteOne({ userId, jewelleryId });
        res.status(200).json({ delAck });
    } catch (err) {
        const errorMsg = err.message;
        console.log("***in remFav(trash) fun***", err.message);
        res.status(500).json({ err:errorMsg });
    }
}
module.exports = { loadpage, checkUser, getFavourites, removeFav }