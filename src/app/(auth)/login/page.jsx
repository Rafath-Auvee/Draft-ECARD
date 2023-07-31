"use client";

import Image from "next/image";
import React, { useState } from "react";
import HeroImage from "/public/images/hero_login.png";
import Facebook from "/public/icons/facebook.svg";
import Google from "/public/icons/google.svg";
import IconRight from "/public/icons/Icon-right.svg";
import Logo from "/public/icons/logo_second.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Toast from "@/components/Toast/Toast";

import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState("");
  const [busy, setBusy] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { password, email } = userInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setType("error");
      setError("Login Failed.");
      setShowToast(true);
      return;
    }
    // If login is successful
    setType("success");
    setError("Login Success.");
    setShowToast(true);
    setLoginSuccess(true);
    router.push("/");
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div>
      <div className="min-h-screen bg-base-100 text-primary relative">
        {/* <div class="absolute w-1/2 top-[8px] left-[9px] lg:w-full md lg:bottom-0 lg:left-10 lg:top-[1rem]lg:right-0 ...">
          <Logo />
        </div> */}
        {/* <div className="navbar bg-transparent bg-opacity-0">
          <div className="navbar-start">
            <Logo />
          </div>
        </div> */}
        {showToast && (
          <Toast message={error} onClose={handleToastClose} type={type} />
        )}
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
                  <div className="grid place-items-center mb-5">
                    <Link href="/">
                      <>
                        <Logo />
                      </>
                    </Link>
                  </div>
                  <h1 className="text-primary text-2xl text-center mb-10 font-semibold">
                    Welcome Back!
                  </h1>
                  <div className="flex flex-col ">
                    <div className="btn btn-outline text-[16px] w-[20rem] md:w-[23rem] lg:w-[25rem] border-[#D1D5DB] border-1 mb-3">
                      <Google />
                      <button className="font-medium">
                        Sign Up with Google
                      </button>
                    </div>
                    <div className="btn btn-outline text-[1rem] w-[20rem] md:w-[23rem] lg:w-[25rem] border-[#D1D5DB] border-1  mb-3">
                      <Facebook />
                      <button className="font-medium">
                        Sign Up with Facebook
                      </button>
                    </div>
                  </div>
                  <div className="divider divide-[#E5E7EB] mb-3"></div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-control  join-item text-base">
                      <div className="mb-2">
                        <label className="label">
                          <span className="text-base">Username or Email *</span>
                        </label>
                        <input
                          type="text"
                          onChange={handleChange}
                          value={email}
                          name="email"
                          placeholder="example@email.com"
                          className="input input-bordered w-full h-11 placeholder:italic placeholder:font-normal"
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
                          onChange={handleChange}
                          placeholder="Password at least 6 Characters long"
                          className="input input-bordered w-full h-11 placeholder:italic placeholder:font-normal"
                        />
                        {/* <label className="label">
                        <span className="text-base text-error">
                          Password Error Message
                        </span>
                      </label> */}
                      </div>
                      <div className="form-control mb-5 mt-4 ">
                        <div className="flex flex-row items-center justify-between">
                          <div>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                // checked={false}
                                className="checkbox"
                              />
                              <span className="text-base ml-5">
                                Remember me
                              </span>
                            </label>
                          </div>
                          <h3 className="text-base font-normal">
                            Forgot password?
                          </h3>
                        </div>
                        <button className="btn btn-primary mt-4 mb-6 text-white text-base capitalize font-medium">
                          Sign In
                        </button>
                        <div className="flex flex-row items-center justify-between">
                          <h3 className="text-base">Don’t have an account?</h3>
                          <button className="border-2 border-[#DADDE7] text-[#23272A] px-7 lg:px-12 py-2 rounded-2xl flex flex-row items-center justify-center text-sm lg:text-1xl">
                            <span className="mr-3">Sign Up</span>
                            <IconRight />
                          </button>
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

export default Login;

// font-size: small;
//     margin: 17px 0px;
//     width: 386px;
