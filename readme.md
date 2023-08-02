📦api
 ┗ 📂auth
 ┃ ┣ 📂users
 ┃ ┃ ┗ 📜route.js
 ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┗ 📜route.js


get specific user details (name, email, role, objectID)  by user email in 

 ┣ 📂users
 ┃ ┃ ┗ 📜route.js


and console log here by get route here "api/auth/user/:email" in 


📦(admin_route)
 ┗ 📜layout.js


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





Here I want to console log here 📜layout.js

📦(admin_route)
 ┣ 📂test
 ┃ ┗ 📜page.jsx
 ┗ 📜layout.js


import { getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function PrivateLayout({ children }) {
  const session = await getServerSession(authOptions);

  console.log(session);
  
  if (!session?.user) redirect("/login");

  return <>{children}</>;
}


Code is working. I can show all texts from textStyles in image

But now how can I show images from textStyle in Image