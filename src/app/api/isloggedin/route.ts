import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { errors } from "@/app/lib/Errors";

export async function GET() {
  try {
    const cookie = await cookies();

    const userId = cookie.get("userId")

    return NextResponse.json({ isLoggedIn: !!userId, userId: userId?.value || null }, { status: 200 }); 
  } catch (err) {
    return NextResponse.json({error: errors.fetch_failed}, {status: 400})
  }
}
