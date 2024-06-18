const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');



const loadpage = async (req, res) => {
    res.render('home');
}


const getMostFav = async (req, res) => {

    try {

        const Array = await favourites.find();
        const idList = [];
        for (let i = 0; i < Array.length; i++) {
            const favourite = Array[i];
            const jewelleryId = favourite.jewelleryId;
            idList.push(jewelleryId);
        }
        // console.log(idList)
        const idsObject = {}

        idList.forEach((id) => {
            idsObject[id] = (idsObject[id] || 0) + 1;
        })

        const idArr = Object.keys(idsObject);
        // console.log(idArr);
        const countArr = Object.values(idsObject);
        // console.log(countArr);

        let temp;
        for (i = 0; i < idArr.length; i++) {
            for (j = 0; j < idArr.length - 1; j++) {
                if (countArr[j] <= countArr[j + 1]) {
                    temp = countArr[j];
                    countArr[j] = countArr[j + 1];
                    countArr[j + 1] = temp;

                    temp = idArr[j];
                    idArr[j] = idArr[j + 1];
                    idArr[j + 1] = temp;
                }
            }
        }
        // console.log(countArr)
        // console.log(idArr)




        const mostFavs = [];
        for (i = 0; i < idArr.length; i++) {
            const id = idArr[i];
            const favCount = countArr[i];
            const jewellery = await jewelleries.findById(id);
            const withCount = {
                ...jewellery.toObject(),
                favCount: favCount
            }
            mostFavs.push(withCount);
        }

        if (Array.length == 0) {
            res.status(200).json({ mostFavs: null });
        } else {
            res.status(200).json({ mostFavs });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ err });
    }
}

const getTopSellers = async (req, res) => {
    try {

        const Array = await jewelleries.find();
        const jIdList = [];
        const soldCountList = [];
        for (let i = 0; i < Array.length; i++) {
            const jewellery = Array[i];
            if (jewellery.sold) {
                const jewelleryId = jewellery._id;
                const soldCount = jewellery.sold;
                jIdList.push(jewelleryId);
                soldCountList.push(soldCount);
            }
        }

        let temp;
        for (i = 0; i < jIdList.length; i++) {
            for (j = 0; j < jIdList.length - 1; j++) {
                if (soldCountList[j] <= soldCountList[j + 1]) {
                    temp = soldCountList[j];
                    soldCountList[j] = soldCountList[j + 1];
                    soldCountList[j + 1] = temp;

                    temp = jIdList[j];
                    jIdList[j] = jIdList[j + 1];
                    jIdList[j + 1] = temp;
                }
            }
        }
        // console.log(countArr)
        // console.log(idArr)

        console.log(soldCountList);



        const topSellers = [];
        for (i = 0; i < jIdList.length; i++) {
            const id = jIdList[i];
            const soldCount = soldCountList[i];
            const jewellery = await jewelleries.findById(id);
            const withCount = {
                ...jewellery.toObject(),
                sold: soldCount
            }
            topSellers.push(withCount);
        }
        // console.log(topSellers)
        if (Array.length == 0) {
            res.status(200).json({ topSellers: null });
        } else {
            res.status(200).json({ topSellers });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}


module.exports = { loadpage, getMostFav, getTopSellers }