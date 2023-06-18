"use client";
import React from "react";
import { SlMagnifier } from "react-icons/sl";
import Logo from "public/logo/Navbar-Logo.svg";

const Navbar = () => {
  return (
    <div className="mx-14 text-[15px]">
      <div className="navbar bg-transparent border-b border-[#BBBCBD]">
        <div className="navbar-start">{/* <Logo />   */}</div>
        <div className="navbar-center hidden"></div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>How It Works</a>
            </li>
            <li>
              <a>Sign Up</a>
            </li>

            <li>
              <a>Sign In</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar bg-transparent ">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>

            <li>
              <a>Physical Wedding Cards</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          <div className="border-b border-black">
            <div className="mb-1 flex flex-row justify-content-center align-center items-center">
              <SlMagnifier />
              <input
                type="text"
                placeholder="Search here..."
                className="ml-2  w-24 md:w-60 placeholder:font-sans placeholder:text-primary placeholder-transparent placeholder-opacity-0 bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
