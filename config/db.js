const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ikascorp:Scorpion120@cluster0.g9xgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
module.exports = connectDB;
