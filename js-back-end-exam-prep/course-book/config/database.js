const mongoose = require('mongoose');
const MONGOURL = 'mongodb://localhost:27017/courseBook';

async function connectToDB() {
    try {
        await mongoose.connect(MONGOURL);
        console.log('database connected');
    } catch (err) {
        console.error(err);
        process.exit(1);        
    }
}

module.exports = connectToDB;