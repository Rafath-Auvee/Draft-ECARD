import startDb from "@/lib/db";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import OrderModel from "@/models/orderModel"

export const POST = async (req) => {
    const body = await req.json();
    await startDb();
  
    try {
      const client = new MongoClient(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      await client.connect();
      const db = client.db("save-the-date"); // Use the correct database name
      const OrderCollection = db.collection("orders"); // Use the correct collection name
      const result = await OrderCollection.insertOne(body);
      client.close();
  
      return NextResponse.json({ orders: result }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };
  

  export const GET = async () => {
  await startDb();

  try {
    // Fetch all users from the database
    const ordersData = await OrderModel.find();

    return NextResponse.json({ orders: ordersData });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
};