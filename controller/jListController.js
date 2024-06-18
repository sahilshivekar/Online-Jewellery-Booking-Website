const users = require('../models/userModel')
const jewelleries = require('../models/jModel')
const favourites = require('../models/favModel')
const jwt = require('jsonwebtoken');
const { fileLoader } = require('ejs');
const { query } = require('express');



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









const search = async (req, res) => {
    try{
        const { toSearch } = req.body;
        const jewellery = await jewelleries.find({
            $or: [
                { name: { $regex: new RegExp(toSearch, 'i') } },
                { description: { $regex: new RegExp(toSearch, 'i') } },
                { category: { $regex: new RegExp(toSearch, 'i') } },
                { gender: { $regex: new RegExp(toSearch, 'i') } },
            ]
        });

        // Return the results
        res.status(200).json({ jewellery });
    }
    catch (err) {
        console.log("***in sort fun***", err)
        res.status(500).json({ err });
    }
}


//loadpage if try to access from search bar********************************************************
const loadpage = (req, res) => {
    try {
        res.render('jList');
    } catch (err) {
        console.log(err)
    }
}

// const loadWithParams = (req, res) => {
//     try {
//         res.render('jList');
//     } catch (err) {
//         console.log(err)
//     }
// }












//show jewelleries when page loads********************************************************************
const getJewelleries = async (req, res) => {
    const data = await jewelleries.find();
    res.json({ data });
}












// add fav****************************************************************
const addFav = async (req, res) => {
    try {

        const { userId, jewelleryId } = req.body;
        const add = await favourites.create({ userId, jewelleryId })
        res.status(201).json({ add });

    } catch (err) {
        res.status(500).json({ err });
    }
}









//remove fav
const remFav = async (req, res) => {
    try {

        const { userId, jewelleryId } = req.body;
        const currentJ = await favourites.deleteOne({ userId, jewelleryId });
        res.status(200).json({ currentJ });

    } catch (err) {
        console.log("***in remFav fun***", err.message);
        res.status(404).json({ err });
    }
}












//show fav
const showFav = async (req, res) => {

    try {
        const { userId, jArray } = req.body;
        let favIds = [];
        let jewelleryId;
        if (jArray) {
            const generateArray = async () => {
                for (i = 0; i < jArray.length; i++) {
                    jewelleryId = jArray[i];
                    favIds[i] = await favourites.findOne({ userId, jewelleryId });


                    //idk why not working here in below comment its working console.log(favIds[i].jewelleryId)
                    if (i + 1 == jArray.length) {
                        return favIds;
                    }
                }
            }

            const resFavIds = await generateArray();
            //here its working console.log(resFavIds[0].jewelleryId);
            if (resFavIds) {
                res.status(200).json({ resFavIds });
            }
            else {
                const resFavIds = null
                res.status(200).json({ resFavIds });
            }
        }
        else {
            const resFavIds = null
            res.status(200).json({ resFavIds });
        }

    } catch (err) {
        console.log("***in showFav fun***", err)
        res.status(500).json({ err });
    }
    // console.log("showFav ended")
}





const filter = async (req, res) => {
    try {
        const {
            ringsC,
            necklacesC,
            goldcoinsC,
            earringsC,
            pendantsC,
            braceletsC,
            chainsC,
            banglesC,
            nosepinsC,
            mangalsutrasC,
            goldC,
            diamondC,
            silverC,
            nineC,
            tenC,
            fourteenC,
            eighteenC,
            twentytwoC,
            twentyfourC,
            maleC,
            femaleC,
            unisexC,
            // minPrice,
            // maxPrice

        } = req.body;



        const categories = [];
        if (ringsC) categories.push("rings");
        if (necklacesC) categories.push("necklaces");
        if (goldcoinsC) categories.push("goldcoins");
        if (earringsC) categories.push("earrings");
        if (pendantsC) categories.push("pendants");
        if (braceletsC) categories.push("bracelets");
        if (chainsC) categories.push("chains");
        if (banglesC) categories.push("bangles");
        if (nosepinsC) categories.push("nosepins");
        if (mangalsutrasC) categories.push("mangalsutras");



        const genders = [];
        if (maleC) genders.push("men");
        if (femaleC) genders.push("women");
        if (unisexC) genders.push("unisex");


        const karats = [];
        if (nineC) karats.push(9);
        if (tenC) karats.push(10);
        if (fourteenC) karats.push(14);
        if (eighteenC) karats.push(18);
        if (twentytwoC) karats.push(22);
        if (twentyfourC) karats.push(24);


        const gType = [];
        const dType = [];
        const sType = [];

        if (goldC) gType.push(true);
        if (diamondC) dType.push(true);
        if (silverC) sType.push(true);

        let query = {};
        if (categories.length > 0) {
            query.category = { $in: categories };
        }
        if (genders.length > 0) {
            query.gender = { $in: genders };
        }
        if (karats.length > 0) {
            query.gold_purity = { $in: karats };
        }
        if (gType.length > 0) {
            query['type.gold'] = { $in: gType };
        }
        if (dType.length > 0) {
            query['type.diamond'] = { $in: dType };
        }
        if (sType.length > 0) {
            query['type.silver'] = { $in: sType };
        }

        const filtered = await jewelleries.find(query);
        res.status(200).json({ filtered });               
    }
    catch (err) {
        console.log("***in filter fun***", err.message)
        res.status(500).json({ err });
    }

}



const sort = async (req, res) => {
    try {
        const { current, jewelleryIds } = req.body;

        if (current == 'Best Sellers') {
            const sorted = await jewelleries.find({ _id: { $in: jewelleryIds } }).sort({ sold: -1 });
            res.status(200).json({ sorted });
        }
        else if (current == 'Most Favourites') {
            try {

                const j2 = await jewelleries.find();
                const ids = [];
                j2.forEach(j=>{
                    ids.push(j._id);
                })
                const Array = await favourites.find();
                // jewelleryIds.push(Array);
                const idList = [];
                for (let i = 0; i < Array.length; i++) {
                    const favourite = Array[i];
                    const jewelleryId = favourite.jewelleryId;
                    idList.push(jewelleryId);
                    ids.forEach(id => {
                        idList.push(id);
                    })
                }
                // // console.log(idList)
                const idsObject = {}

                idList.forEach((id) => {
                    idsObject[id] = (idsObject[id] || 0) + 1;
                })

                const idArr = Object.keys(idsObject);
                // console.log(idArr);
                const countArr = Object.values(idsObject);
                console.log(countArr);

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

                const favSorted = [];
                for (i = 0; i < idArr.length; i++) {
                    const id = idArr[i];
                    const favCount = countArr[i];
                    const jewellery = await jewelleries.findById(id);
                    const withCount = {
                        ...jewellery.toObject(),
                        favCount: favCount
                    }
                    favSorted.push(withCount);
                }

                const sorted = [];
                favSorted.forEach((j) => {
                    jewelleryIds.forEach((jId) => {
                        if (jId == j._id.toString()) {
                            sorted.push(j)
                            // consolet.log(j.favCount)
                        }
                    })
                })


                if (Array.length == 0) {
                    res.status(200).json({ sorted: null });
                } else {
                    res.status(200).json({ sorted });
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else if (current == 'Price:Low to High') {
            const sorted = await jewelleries.find({ _id: { $in: jewelleryIds } }).sort({ price: 1 });
            res.status(200).json({ sorted });
        }
        else if (current == 'Price:High to Low') {
            const sorted = await jewelleries.find({ _id: { $in: jewelleryIds } }).sort({ price: -1 });
            res.status(200).json({ sorted });
        }
        else if (current == 'Gold Purity') {
            const sorted = await jewelleries.find({ _id: { $in: jewelleryIds } }).sort({ gold_purity: -1 });
            res.status(200).json({ sorted });
        }
        else if (current == 'Higher Quantity') {
            const sorted = await jewelleries.find({ _id: { $in: jewelleryIds } }).sort({ qty: -1 });
            res.status(200).json({ sorted });
        }
        else if (current == 'Diamond Weight') {
            const sorted = await jewelleries.find({ _id: { $in: jewelleryIds } }).sort({ diamond_weight: -1 });
            res.status(200).json({ sorted });
        }


    }
    catch (err) {
        console.log("***in sort fun***", err)
        res.status(500).json({ err });
    }
}









module.exports = {
    loadpage,
    getJewelleries,
    checkUser,
    addFav,
    showFav,
    remFav,
    filter,
    sort,
    // loadWithParams,
    search
}
