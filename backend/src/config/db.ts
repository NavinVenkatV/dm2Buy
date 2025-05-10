import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectString = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL!)
        console.log('connected to mongo string!')
    }catch(e){
        console.log("error connecting mongo string", e)
    }
}

export default connectString;