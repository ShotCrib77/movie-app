import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { errors } from "@/app/lib/Errors";
import { MovieDb } from "@/app/lib/Db";

export async function POST(req: NextRequest) {
  const movieDb = new MovieDb();
  let isConnected = false;
  
  try {
    const cookie = await cookies();
    if (cookie.get("userId")) {
      return NextResponse.json({error: "Request conflict"}, {status: 409})
    }
    
    await movieDb.Connect();
    isConnected = true;

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: errors.input_nan }, { status: 400 });
    }

    const userInfo = await movieDb.VerifyUser(username, password);

    if (!userInfo) {
      return NextResponse.json({ error: errors.result_null }, { status: 404 });
    }

    const res = NextResponse.json({ message: "Login successful" }, {status: 200});

    res.cookies.set("userId", userInfo.userId.toString(), {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
      path: "/"
    });

    return res;

  } catch (err) {
    console.error("Error in Login", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    if (isConnected) {
      movieDb.Disconnect();
    }
  }
}