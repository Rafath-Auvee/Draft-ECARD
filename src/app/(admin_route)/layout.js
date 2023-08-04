
import { getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import AuthProvider from "@/context/AuthProvider";
import { useSession } from "next-auth/react";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  // const session = await useSession()
  // console.log(session.user);

  if (!session?.user) redirect("/");

  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
