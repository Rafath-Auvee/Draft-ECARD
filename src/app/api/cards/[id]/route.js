// pages/api/card/[id].js
import { NextResponse } from "next/server";
import CardModel from "../../../../models/cardModel";

export async function GET(request) {
  console.log(request.url)
  const id = request.url.slice(request.url.lastIndexOf('/') + 1)
  
  try {
    const card = await CardModel.findOne({ id });

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
