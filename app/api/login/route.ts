import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import { sign } from "@/jose/joseToken";
dotenv.config();
var jwt = require("jsonwebtoken");

interface RequestLogin {
  username: string;
  password: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body: RequestLogin = await req.json();
    var apikey = process.env.API_KEY || " ";

    let username = "user123";
    if (process.env.USERNAME_LOGIN) {
      username = process.env.USERNAME_LOGIN;
    }

    let password = "12345678";
    if (process.env.PASSWORD_LOGIN) {
      password = process.env.PASSWORD_LOGIN;
    }

    if (body.username === username && body.password === password) {
      var tokensign = await sign({ username: username }, apikey);
      cookies().set("token", tokensign);
      return NextResponse.json({
        massage: "successed",
        status: 200,
        success: true,
      });
    } else {
      return NextResponse.json({
        massage: "invalid user",
        status: 405,
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
};
