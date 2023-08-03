import CardModel from "@/models/CardModel";
import startDb from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await startDb();

  try {
    // Fetch all users from the database
    const cardsData = await CardModel.find();

    return NextResponse.json({ cards: cardsData });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
};

export const POST = async ({ body }) => {
  await startDb();

  try {
    const newCard = await CardModel.create(body);
    
    return NextResponse.json({ card: newCard }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating card" }, { status: 500 });
  }
};
