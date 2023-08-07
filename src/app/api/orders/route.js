import startDb from "@/lib/db";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


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
  