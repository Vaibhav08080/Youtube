import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv"
const link =process.env.MONGO_DB_URL
console.log(link)
const connectDB = async()=>{
    try {
        console.log(`${link}/${DB_NAME}`)
         const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
         console.log(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
         console.log(`MONGO DB CONNECTED ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.error("Error:",error)
        process.exit(1)
        
    }
    
}

export default connectDB