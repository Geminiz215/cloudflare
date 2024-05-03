// pages/api/getUserData.js
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function POST(req: NextRequest, res: NextResponse) {
  const header = headers();
  var apikey = process.env.API_KEY || " ";
  const tokensign = jwt.sign({ userId: "username" }, apikey, {
    expiresIn: "1h",
  });
  cookies().set("token", "tokensign");

  const token = cookies().get("token");
  try {
    const decoded = jwt.verify(token?.value || "", apikey);
    return NextResponse.json(
      { message: "userData", data: { decoded }, success: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    } else if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 401 }
      );
    } else {
      console.error("JWT verification error:", error);
      NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
