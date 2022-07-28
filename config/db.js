const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config({ path: './config.env' });


const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(
            `MongoDB connection successfull ${conn.connection.host}`
        );

    } catch (error) {
        console.log(error);
    }

}


module.exports = connectDB;