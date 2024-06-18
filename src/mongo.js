const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/OJB');
        console.log(`Database Connected: ${connect.connection.host} ${connect.connection.name}`);
    }
    catch(err){
        console.log(err.name);
    }
} 

module.exports = connectDb;
