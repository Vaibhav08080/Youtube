import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config()
const port = process.env.PORT
connectDB().then(()=>{
    app.listen( port|| 8000 ,()=>{
    `port is listen on the server ${port} `
    })
}).catch((err)=>{
    console.log("error in connecting to the server",err)
})
/*
(async ()=>{
    try {
        await  mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
        
    } catch (error) {
        console.error("error",error)
        
    }
})()
    */