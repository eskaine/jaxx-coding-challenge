const mongoose = require('mongoose');


const connectMongo = async() => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log('MongoDB is Connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectMongo;
