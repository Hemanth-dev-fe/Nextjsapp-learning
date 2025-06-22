import { connectionDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import User from "@/models/registerModel";
import jwt from "jsonwebtoken"
export async function POST(req)
{
    try{

        await connectionDB()
        const {email,password}=await req.json()
        const user=await User.findOne({email})
        if(!user)
        {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        const valid= await bcrypt.compare(password,user.password)
        if (!valid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

const accessToken=jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'})

 const res= NextResponse.json({ message: "Login successful" });

res.cookies.set('accessToken',accessToken,{
    httpOnly:true,
    secure:false,
    sameSite:"Strict",
    path:'/',
    maxAge:60*15
})
res.cookies.set('refreshToken',refreshToken,{
    httpOnly:true,
    secure:false,
    sameSite:"Strict",
    path:'/',
    maxAge:60 * 60 * 24 * 7
})
return res

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