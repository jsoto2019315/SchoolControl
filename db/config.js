const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('DB connection successful');
    } catch (e) {
        throw new Error('Mistake on DB connection', e);
    }
}

module.exports={
    dbConnection
}