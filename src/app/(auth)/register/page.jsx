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

const Register = () => {
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

    setBusy(true);

    setError("");
    let errorMessage = "";

    if (!userInfo.email && !userInfo.password) {
      errorMessage = "Email and password are required";
    } else if (!userInfo.email) {
      errorMessage = "Email is required";
    } else if (!userInfo.password) {
      errorMessage = "Password is required";
    }

    if (errorMessage) {
      setError(errorMessage);
      setType("error");
      setShowToast(true);
      setBusy(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/users/", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });

      if (res.ok) {
        // Registration successful
        setError("Registration successful");
        setType("success");
        setShowToast(true);
        setBusy(false);
        setUserInfo({
          email: "",
          password: "",
        });
      } else {
        // Handle non-successful responses if needed
        const data = await res.json();
        if (data.error && data.error === "email_exists") {
          setError("Email already exists");
          setType("error");
          setBusy(false);
        } else {
          setError("Registration failed. Please try again later.");
          setType("error");
          setBusy(false);
        }
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error while fetching: ", error);
      setType("error");
      setError("An unexpected error occurred. Please try again later.");
      setShowToast(true);
      setBusy(false);
    }

    // If login is successful
    setType("success");
    setError("Registration Success.");
    setShowToast(true);
    setBusy(false);
    router.push("/login/");
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
                  <div className="grid place-items-center mb-5 ">
                    <Link href="/">
                      <>
                        <Logo />
                      </>
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
                        {/* <div>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              // checked={false}
                              className="checkbox"
                            />
                            <span className="text-base ml-5">Remember me</span>
                          </label>
                        </div> */}
                        <button
                          className="btn btn-primary mt-4 mb-4 text-white text-base capitalize font-medium"
                          disabled={busy}
                          style={{ opacity: busy ? 0.5 : 1 }}
                        >
                          Sign Up
                        </button>
                        <div className="flex flex-row items-center justify-between">
                          <h3 className="text-base">
                            {" "}
                            Already Have an Account?
                          </h3>
                          <Link href="/login">
                            <div className="cursor-pointer border-2 border-[#DADDE7] text-[#23272A] px-5 lg:px-12 py-2 rounded-2xl flex flex-row items-center justify-center text-sm lg:text-1xl">
                              <span className="mr-1 lg:mr-3">Sign In</span>
                              <IconRight />
                              {/* <Image src={IconRight} alt="Facebook Icon" /> */}
                            </div>
                          </Link>
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
