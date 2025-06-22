// middleware.js

//You're using jwt (which is Node.js-only) inside middleware, which runs on the Edge Runtime — and Edge Runtime 
// does not support Node built-in modules like crypto, buffer, or jsonwebtoken


/* jsonwebtoken is built for Node.js only:
It uses Node's built-in crypto module.

Everything happens in memory and synchronously.

Fast, but not usable in Edge functions or middleware in Next.js.

jose is built on Web Crypto API:
It’s designed to work both in browsers and edge environments (like Cloudflare Workers or Next.js Middleware). */




/* import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  console.log("Middleware");

  // Get accessToken cookie
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log("Access token:", accessToken);

  if (!accessToken) {
    console.log("No access token found, redirecting to /UserAuth/login");
    return NextResponse.redirect(new URL('/UserAuth/login', request.url));
  }

  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("Access token valid, continuing");
    return NextResponse.next();
  } catch (err) {
    console.log("Invalid access token:", err.message);
    return NextResponse.redirect(new URL('/UserAuth/login', request.url));
  }
}

// Protect /hemanth and all nested routes under it
export const config = {
  matcher: ["/hemanth", "/hemanth/:path*"],
}; */


import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {


  const accessToken = request.cookies.get("accessToken")?.value;


  if (!accessToken) {
    console.log("No access token found, redirecting to /UserAuth/login");
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    await jwtVerify(accessToken, secret);
    console.log("Access token valid, continuing");
    return NextResponse.next();
  } catch (err) {
    console.log("Invalid access token:", err.message);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/hemanth", "/hemanth/:path*"],
};
