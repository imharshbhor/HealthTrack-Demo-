import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs"; // Import bcrypt

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, firstName, lastName, email, phone, department, specialization, status, password } = await req.json(); // Include password in the request

    // Hash the password if it is provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phone, department, specialization, status, ...(hashedPassword && { password: hashedPassword }) }, // Update password only if provided
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
