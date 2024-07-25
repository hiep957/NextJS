import { redirect } from "next/dist/server/api-utils";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(
  req: NextRequest & { userId: any },
  ev: NextFetchEvent
) {
  console.log("Middleware is working");
  const token = req.cookies.get("token");
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/register", req.url), 302);
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const userId = payload.userId;
    const response = NextResponse.next();
    response.cookies.set("userId", userId);
    return response;
  } catch (e) {
    console.log("Lỗi rồi", e);
    return NextResponse.redirect(new URL("/register", req.url), 302);
  }
  // return Response.redirect("http://localhost:3000");
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
