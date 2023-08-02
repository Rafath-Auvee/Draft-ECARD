import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const GET_BY_EMAIL = async (req) => {
  await startDb();

  const { email } = req.query; // Extract the 'email' query parameter from the request

  if (!email) {
    // If 'email' query parameter is missing, return an error response
    return NextResponse.json(
      { error: "Email parameter is missing" },
      { status: 400 }
    );
  }

  try {
    // Find the user with the specified email in the database
    const user = await UserModel.findOne({ email });

    if (!user) {
      // If no user is found with the specified email, return an error response
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user's information
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching user details" },
      { status: 500 }
    );
  }
};

export const GET_ALL = async () => {
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
