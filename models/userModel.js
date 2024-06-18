const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter an valid email']
        },
        password: {
            type: String,
            required: [true, 'Please enter password'],
            minlength: [8, 'Minimum Password length is 8'],
            maxlength: [10, "Maximum Password Length is 15"],
        },
        fullName: {
            type: String,
            required: false,
            maxlength: [30, "Maximum Length is 30 charaters"],
            
        },
        dob:{
            type: Date,
            required:false,
            max:[new Date(), "Invalid Birthdate"],
        },
        phone: {
            type: Number,
            required: false,
            maxlength: [10, "Enter a 10 Digit number"],
            validate: {
                validator: (value) => /^[0-9]{10}$/.test(value),
                message: 'Phone number must be a 10-digit number'
            },
        },
    },
    {
        timestamps: true,
    },
);


//hashing the password

usersSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

usersSchema.statics.login = (async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        console.log("user is there")
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            console.log("password is correct")
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect emailID')
})

const users = mongoose.model('users', usersSchema);
module.exports = users;