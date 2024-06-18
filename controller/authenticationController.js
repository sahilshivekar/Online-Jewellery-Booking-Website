const users = require('../models/userModel');
const admins = require('../models/adminModel');

//Creating jwt token with id*************************************************************************************************************
const jwt = require('jsonwebtoken');
const oneDay = 1 * 24 * 60 * 60;
const createToken = (id) => {
    //expiresin takes time in seconds
    console.log({ id }, process.env.SECRET_KEY, { expiresIn: oneDay });
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: oneDay });
}

//handle errors**************************************************************************************************************************
const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errorObj = { email: '', password: '' };

    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {  //instead of properties we can normall also use (e) and then to get msg write in second line e.properties.message
            errorObj[properties.path] = properties.message;
        })
    }
    if (err.code) {
        if (err.code == 11000) {
            errorObj.email = "This emailID is already registerd";
            console.log(err.code);
        }
    }
    if (err.message == 'Incorrect emailID') {
        errorObj.email = err.message;
    }
    if (err.message == 'Incorrect password') {
        errorObj.password = err.message;
    }

    return errorObj;

}

const handleAdminErrors = (err) => {
    let errorObj = { username: '', password: '' };

    if (err.message.includes("Incorrect username")) {
        errorObj.username = "Incorrect username";
    }
    if (err.message.includes("Incorrect password")) {
        errorObj.password = "Incorrect Password";
    }

    return errorObj;
}

//load page******************************************************************************************************************************


//user signup*******************************************************************************************************
const userSignup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const createUser = await users.create({
            email,
            password
        });

        //calling fun createToken to create a token
        const token = createToken(createUser._id);

        //adding a cookie named "jwt" name can be anything after name the token is next and then limits
        res.cookie('user', token, { httpOnly: true, maxAge: oneDay * 1000 });

        res.status(201).json({ user: createUser._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.json({ errors });
    }
}


//user signin**************************************************
const userSignin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await users.login(email, password); //login method written in model

        //calling fun createToken to create a token
        const token = createToken(user._id);

        //adding a cookie named "jwt" name can be anything after name the token is next and then limits
        res.cookie('user', token, { httpOnly: true, maxAge: oneDay * 1000 });

        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({ errors });
    }

}

//user signin**************************************************
const adminSignin = async (req, res) => {

    const { username, password } = req.body;


    try {

        const admin = await admins.login(username, password); //login method written in model

        //calling fun createToken to create a token
        const token = createToken(admin._id);

        //adding a cookie named "jwt" name can be anything after name the token is next and then limits
        res.cookie('admin', token, { httpOnly: true, maxAge: oneDay * 1000 });

        res.status(200).json({ admin });
    }
    catch (err) {
        const errors = handleAdminErrors(err);

        res.status(400).json({ errors });
    }

}

//check already admin there or not
const adminAlready = async (req, res) => {
    try {
        const token = req.cookies.admin;
        console.log("request came");
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (decoded) {
                    console.log("already signed in");
                    res.status(200).json({ token });
                }
            })
        } else {
            const noAdmin = true;
            res.status(200).json({ noAdmin });
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({err});
    }
        
}

module.exports = {
    userSignup,
    userSignin,
    adminSignin,
    adminAlready
};