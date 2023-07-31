"use client";

import Image from "next/image";
import React, { useState } from "react";
import HeroImage from "/public/images/hero_login.png";
import Facebook from "/public/icons/facebook.svg";
import Google from "/public/icons/google.svg";
import IconRight from "/public/icons/Icon-right.svg";
import Logo from "/public/icons/logo_second.svg";
import Link from "next/link";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { password, email } = userInfo;

  const handleChange = ({ target }) => {
    // const { email, password } = target;
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(userInfo);
    // Check if both email and password are provided
    if (!userInfo.email) {
      console.error("Email is required");
      return;
    }

    if (!userInfo.password) {
      console.error("Password is required");
      return;
    }

    try {
      const res = await fetch("/api/auth/users/", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });

      if (!res.ok) {
        // Handle non-successful response (e.g., status code 4xx or 5xx)
        console.error("Failed to fetch: ", res);
        return;
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error while fetching: ", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-base-100 text-primary relative">
        {/* <div class="absolute w-1/2 top-[8px] left-[9px] lg:w-full md lg:bottom-0 lg:left-10 lg:top-[1rem]lg:right-0 ...">
          <Logo />
        </div> */}
        <div className="flex flex-row justify-center">
          <div className="basis-1/2 hidden lg:block">
            <Image
              src={HeroImage}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "100%" }}
              alt="Login Image"
            />
          </div>
          <div className="basis-1/2 ">
            <div className="grid place-items-center h-screen">
              <div className="join join-vertical">
                <div className="join-item">
                  <div className="grid place-items-center mb-5 ">
                    <Link href="/">
                      <><Logo /></>
                    </Link>
                  </div>
                  <h1 className="text-primary text-2xl text-center mb-5 font-semibold">
                    Welcome to Save the Date
                  </h1>
                  <div className="flex flex-col ">
                    <div className="btn btn-outline text-[16px] w-[20rem] md:w-[23rem] lg:w-[25rem] border-[#D1D5DB] border-1 mb-2">
                      <Google />
                      {/* <Image src={IconRight} alt="Facebook Icon" /> */}
                      <button className="font-medium">
                        Sign Up with Google
                      </button>
                    </div>
                    <div className="btn btn-outline text-[1rem] w-[20rem] md:w-[23rem] lg:w-[25rem] border-[#D1D5DB] border-1  mb-2">
                      <Facebook />
                      {/* <Image src={IconRight} alt="Facebook Icon" /> */}
                      <button className="font-medium">
                        Sign Up with Facebook
                      </button>
                    </div>
                  </div>
                  <div className="divider divide-[#E5E7EB] mb-3"></div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-control  join-item text-base">
                      <div className="mb-1">
                        <label className="label">
                          <span className="text-base">Username or Email *</span>
                        </label>
                        <input
                          type="text"
                          value={email}
                          name="email"
                          placeholder="example@email.com"
                          className="input input-bordered w-full h-11 placeholder:italic placeholder:font-normal"
                          onChange={handleChange}
                        />
                        {/* <label className="label">
                        <span className="label-text-alt text-error text-base">
                          Email Error Message
                        </span>
                      </label> */}
                      </div>
                      <div>
                        <label className="label">
                          <span className="text-base">Password *</span>
                        </label>
                        <input
                          type="password"
                          value={password}
                          name="password"
                          placeholder="Password at least 6 Characters long"
                          className="input input-bordered w-full h-11 placeholder:italic placeholder:font-normal"
                          onChange={handleChange}
                        />
                        {/* <label className="label">
                        <span className="text-base text-error">
                          Password Error Message
                        </span>
                      </label> */}
                      </div>
                      <div className="form-control mb-3 mt-4 ">
                        <div>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              // checked={false}
                              className="checkbox"
                            />
                            <span className="text-base ml-5">Remember me</span>
                          </label>
                        </div>
                        <button className="btn btn-primary mt-4 mb-4 text-white text-base capitalize font-medium">
                          Sign Up
                        </button>
                        <div className="flex flex-row items-center justify-between">
                          <h3 className="text-base">
                            {" "}
                            Already Have an Account?
                          </h3>
                          <button className="border-2 border-[#DADDE7] text-[#23272A] px-5 lg:px-12 py-2 rounded-2xl flex flex-row items-center justify-center text-sm lg:text-1xl">
                            <span className="mr-1 lg:mr-3">Sign Up</span>
                            <IconRight />
                            {/* <Image src={IconRight} alt="Facebook Icon" /> */}
                          </button>
                        </div>

                        <div className="mt-4 max-w-sm ">
                          <p className="text-xs">
                            By signing up, you agree to the{" "}
                            <span className="underline">
                              Terms and Conditions
                            </span>{" "}
                            and{" "}
                            <span className="underline">Privacy Policy</span>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
