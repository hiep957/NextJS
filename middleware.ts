import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies["token"];
  console.log(token);
  console.log("đa vào đây");
  if (!token) {
    return NextResponse.redirect("/register");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return NextResponse.redirect("/register");
  }
}

export const config = {
  matcher: ["/dashboard"],
};
