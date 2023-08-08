import { NextResponse } from "next/server";
import OrderModel from "../../../../models/orderModel";
import UserModel from "@/models/userModel";
import startDb from "@/lib/db";

export async function GET(request) {
  console.log(request.url); //'http://localhost:3000/api/orders/tyu@user.com'
  const userEmail = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log(userEmail); //'tyu@user.com'

  await startDb();
  try {
    const myOrder = await OrderModel.find({ userEmail });
    console.log(myOrder);
    if (!myOrder) {
      return NextResponse.json(
        { message: "User Orders not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ myOrders: myOrder }, { status: 201 });
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json(
      { message: "Error fetching card" },
      { status: 500 }
    );
  }
}
