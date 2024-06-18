const jewelleries = require('../models/jModel');
const users = require('../models/userModel');
const favourites = require('../models/favModel');
const bookings = require('../models/bookModel');
const jwt = require('jsonwebtoken');


const loadpage = async (req, res) => {
    res.render("adminMostFav");
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
            // const withCount = jewellery ? { ...jewellery.toObject(), favCount: favCount } : null;

            mostFavs.push(withCount);
        }

        if (Array.length == 0) {
            res.status(200).json({ mostFavs: null });
        } else {
            res.status(200).json({ mostFavs });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}


const search = async (req, res) => {
    try {
        const { toSearch } = req.body;






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
            // const withCount = jewellery ? { ...jewellery.toObject(), favCount: favCount } : null;

            mostFavs.push(withCount);
        }







        const ids = [];

        mostFavs.forEach((j) => {
            const id = j._id;
            ids.push(id);
        })

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


        const newIds = []

        jewellery.forEach((j) => {
            newIds.push(j.id);
        })


        const newJewellery = [];
        newIds.forEach(id => {
            mostFavs.forEach(fav=>{
                if(fav._id == id){
                    // console.log("working")
                    newJewellery.push(fav);
                }else{
                    // console.log("not working");
                }
            })
        })

        res.status(200).json({ newJewellery });
    }
    catch (err) {
        console.log("***in searcg fun***", err)
        res.status(500).json({ err });
    }
}



module.exports = {
    loadpage,
    getMostFav,
    search
}