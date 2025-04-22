import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    if (!cookieStore.get("userId")) {
      NextResponse.json({message: "Error logging out"}, {status: 400});
    }

    cookieStore.delete("userId");
    const res = NextResponse.json({message: "Logging out"}, {status: 200});
    return res;
  } catch (err) {
    NextResponse.json({message: "Error logging out"}, {status: 400});
  };
};