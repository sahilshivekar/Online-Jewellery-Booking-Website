const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');


const loadpage = async (req, res) => {
    res.render("adminTopSellers");
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

        // console.log(soldCountList);



        const topSellers = [];
        for (i = 0; i < jIdList.length; i++) {
            const id = jIdList[i];
            const soldCount = soldCountList[i];
            const jewellery = await jewelleries.findById(id);
            const withCount = {
                ...jewellery.toObject(),
                soldCount: soldCount
            }
            topSellers.push(withCount);
        }

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


const search = async (req, res) => {
    try {
        const { toSearch } = req.body;


        const Array = await jewelleries.find();
        const ids = [];
        const soldCountList = [];
        for (let i = 0; i < Array.length; i++) {
            const jewellery = Array[i];
            if (jewellery.sold) {
                const jewelleryId = jewellery._id;
                const soldCount = jewellery.sold;
                ids.push(jewelleryId);
                soldCountList.push(soldCount);
            }
        }
        console.log(ids);
        const jewellery = await jewelleries.find({
            $and: [
                {
                    _id: { $in: ids }
                },
                {
                    $or: [
                        { name: { $regex: new RegExp(toSearch, 'i') } },
                        { description: { $regex: new RegExp(toSearch, 'i') } },
                        { category: { $regex: new RegExp(toSearch, 'i') } },
                        { gender: { $regex: new RegExp(toSearch, 'i') } },
                    ]
                }
            ]
        });

        const newJewellery = jewellery;
        

        res.status(200).json({ newJewellery });
    }
    catch (err) {
        console.log("***in searcg fun***", err)
        res.status(500).json({ err });
    }
}


module.exports = {
    loadpage,
    search,
    getTopSellers
}