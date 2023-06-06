"use client";
import React from "react";
import { SlMagnifier } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";
import Logo from "public/Logo/Navbar-Logo.svg";

const Navbar = () => {
  return (
    <div className="mx-2 md:mx-14 text-[15px]">
      <div className="navbar bg-transparent border-b border-[#BBBCBD] hidden md:flex">
        <div className="navbar-start">{/* <Logo />   */}</div>
        <div className="navbar-center hidden"></div>
        <div className="navbar-end hidden md:flex">
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
      <div className="navbar bg-transparent">
        <div className="navbar-start ">
          <div>
            <Logo />
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
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
          <div className="flex justify-end md:hidden">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button">
                  <FiMenu />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Portfolio</a>
                  </li>

                  <li>
                    <a>Physical Wedding Cards</a>
                  </li>
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
          </div>
          <div className="border-b border-black">
            <div className="mb-1 flex-row justify-content-center align-center items-center hidden lg:flex">
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
