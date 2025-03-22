const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://sahilshivekar:${process.env.MONGO_PASSWORD}@ce-projects.9va1e.mongodb.net/ojb`);
        console.log(`Database Connected: ${connect.connection.host} ${connect.connection.name}`);
    }
    catch(err){
        console.log(err.name);
    }
} 

module.exports = connectDb;
