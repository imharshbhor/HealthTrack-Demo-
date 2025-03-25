import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    const user = await User.findById(userId, { password: 0 });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
