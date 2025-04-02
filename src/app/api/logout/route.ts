import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json({message: "Logging out"}, {status: 200});
    console.log(res.cookies.get("userId"))
    return res;
  } catch (err) {
    NextResponse.json({message: "Error logging out"}, {status: 400});
  };
};