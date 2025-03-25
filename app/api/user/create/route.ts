import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { firstName, lastName, role, email, password } = await req.json();
    const status = "Active"; // Default status set to Active

    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, role, status, email, password: hashedPassword });

    await newUser.save();
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
