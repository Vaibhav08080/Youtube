import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config()

connectDB()
/*
(async ()=>{
    try {
        await  mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
        
    } catch (error) {
        console.error("error",error)
        
    }
})()
    */