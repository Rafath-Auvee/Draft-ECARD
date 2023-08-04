import CardModel from "../../../models/cardModel";
import startDb from "@/lib/db";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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

export const POST = async (req) => {
  const body = await req.json();
  await startDb();

  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db("save-the-date"); // Use the correct database name
    const collection = db.collection("cards"); // Use the correct collection name

    const result = await collection.insertOne(body);

    client.close();

    return NextResponse.json({ card: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
