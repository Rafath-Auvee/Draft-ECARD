import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  startDb()
  console.log(request.url);
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log(id)
  try {
    const card = await UserModel.findOne({ id });

    if (!card) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json(
      { message: "Error fetching card" },
      { status: 500 }
    );
  }
}
