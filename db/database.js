
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //console.log(process.env.MONGO_URI, "process.env.MONGO_URI")
        await mongoose.connect(process.env.MONGO_URI, {
          
            useNewUrlParser: true
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
