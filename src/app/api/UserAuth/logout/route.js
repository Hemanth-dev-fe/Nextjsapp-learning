import { NextResponse } from "next/server";

export async function POST(req)
{
    const response=NextResponse.json({message:"Loged Out"})
response.cookies.set('accessToken',"",{maxAge:0})
response.cookies.set('refreshToken',"",{maxAge:0})
return response
}