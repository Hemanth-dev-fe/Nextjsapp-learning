import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req)
{
    const refreshToken=req.cookies.get("refreshToken")?.value
    if(!refreshToken)
    {
        return NextResponse.json({message:"refreshtoken is not available.."},{status:401})
    }
    try{
        const decode=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        const newAccessToken=jwt.sign({id:decode.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15min'})
        const response=NextResponse.json({message:"Token is Refreshed"})
response.cookies.set('accessToken',newAccessToken,{
    httpOnly:true,
    secure:false,
    sameSite:'Strict',
    path:'/',
    maxAge:60*15
})
return response
    }

    catch(err)
    {
        return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 })
    }
}
