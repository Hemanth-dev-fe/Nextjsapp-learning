import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODDB_URI

if(!MONGODB_URI)
{
    throw new Error("please define the MONGODB_URI in .env.local")
}

let catched=global.mongoose

if(!catched)
{
    catched=global.mongoose={connection:null,connectionPromise:null}
}

export async function connectionDB()
{
    if(catched.connection) return catched.connection
    if(!catched.connectionPromise)
    {
        catched.connectionPromise=mongoose.connect(MONGODB_URI,{
            bufferCommands:false
        })
    }
    catched.connection=await catched.connectionPromise
    return catched.connection
}