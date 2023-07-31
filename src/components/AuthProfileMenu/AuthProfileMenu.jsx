"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AuthProfileMenu() {
  const { data, status } = useSession();

  const isAuth = status === "authenticated"; // Assuming this value is correctly set based on authentication state.

  //   const isAuth = false; // Assuming this value is correctly set based on authentication state.

  if (isAuth) {
    return (
      <li>
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <label tabIndex={0} className="">
            My Account
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/my-favourites">My Favourites</Link>
            </li>
            <li>
              <Link href="/orders">My Orders</Link>
            </li>
            <li>
              <Link href="/my-profile">My Profile</Link>
            </li>
            <li>
              {/* <Link href="/">Logout</Link> */}
              <button onClick={() => signOut()}>Log Out</button>
            </li>
          </ul>
        </div>
      </li>
    );
  }

  // If not authenticated, render the Sign Up and Sign In links
  return (
    <>
      <li>
        <Link href="/register">Sign Up</Link>
      </li>
      <li>
        <Link href="/login">Sign In</Link>
      </li>
    </>
  );
}
