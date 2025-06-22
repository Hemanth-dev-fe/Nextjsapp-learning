import { NextResponse } from "next/server";
import { connectionDB } from "@/lib/mongoDB";
import User from "@/models/registerModel"
import bcrypt from "bcrypt"

export async function POST(req)
{

    try{
        const {name,email,password}=await req.json()
    if(!name || !email || !password)
    {
        return NextResponse.json(
            {message:"name, email and password are required..." },
            {status:400 }
       )
    }
    await connectionDB()
const existingUser=await User.findOne({email})
{
    if(existingUser)
    {
       return NextResponse.json({
            message:"Email already exist, please try with different one"
        },{status:400})
    }
}
    const hassedPassword=await bcrypt.hash(password,10)
    const newUser= new User({name,email,password:hassedPassword})
    await newUser.save()
return NextResponse.json(
      { message: "User registered successfully"},
      { status: 201 }
    );
    }
    catch(err)
    {
       return  NextResponse.json({
            message:"internal server error"
        },
        {
            status:500
        }
    )
    }

}