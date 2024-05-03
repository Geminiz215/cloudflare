import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "./jose/joseToken";
import { JOSEError } from "jose/errors";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  var apikey = process.env.API_KEY || " ";
  let token = request.cookies.get("token");
  try {
    await verify(token?.value ?? " ", apikey);
    return response;
  } catch (error) {
    if (error instanceof JOSEError) {
      return NextResponse.json(
        { success: false, message: "Invalid token", data: error },
        { status: 401 }
      );
    } else {
      console.error("JWT verification error:", error);
      return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}

export const config = {
  matcher: "/api/zone",
};
