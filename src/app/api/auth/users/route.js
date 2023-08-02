// const startDb = require("@/lib/db");
import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  //   console.log(body);
  await startDb();

  const oldUser = await UserModel.findOne({ email: body.email });

  if (oldUser) {
    return NextResponse.json(
      { error: "Email is already in use" },
      { status: 422 }
    );
  }

  const user = await UserModel.create({ ...body });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};

export const GET = async () => {
  await startDb();

  try {
    // Fetch all users from the database
    const users = await UserModel.find();

    // Extract only the relevant user information
    const usersData = users.map((user) => ({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    }));

    return NextResponse.json({ users: usersData });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
};

// export default { POST, GET };
