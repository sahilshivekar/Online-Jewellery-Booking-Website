const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter ID'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter password'],
            minlength: [8, 'Minimum Password length is 8'],
            maxlength: [10, "Maximum Password Length is 15"],
        },

    },
    {
        timestamps: true,
    },
);


adminSchema.statics.login = (async function (username, password) {
    const admin = await this.findOne({ username });
    console.log(admin)
    const db = await this.find();
    console.log(db)
    if (admin) {
        // console.log("admin with this id exist")
        
        if (admin.password == password) {
            // console.log("password is correct")
            return admin;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect username')
})

const admins = mongoose.model('admins', adminSchema);
module.exports = admins;