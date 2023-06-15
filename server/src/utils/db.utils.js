import mongoose from 'mongoose'
import logger from '../logger/index'



export const connectDB = async() => {
    try {
        //process.env.DB_URI
        //"mongodb://127.0.0.1:27017/"
        await mongoose.connect(process.env.DB_URI ,{})
        logger.warn('Connected to DB')
    } catch (error) {
        logger.error(error.message)
    }
}