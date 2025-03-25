import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, { password: 0 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
