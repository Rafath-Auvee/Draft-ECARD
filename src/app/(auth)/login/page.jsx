import Image from "next/image";
import React from "react";
import HeroImage from "/public/images/hero_login.png";
import Facebook from "/public/icons/facebook.svg";
import Google from "/public/icons/google.svg";
import IconRight from "/public/icons/Icon-right.svg";

const Login = () => {
  return (
    <div>
      <div className="min-h-screen bg-base-100">
        <div className="flex flex-row">
          <div className="basis-1/2">
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
                  <h1 className="text-primary text-4xl text-center mb-12">
                    Welcome to Save the Date
                  </h1>
                  <div className="flex flex-col ">
                    <div className="btn btn-outline text-[1.2rem] w-[30rem] h-[3.5rem] mb-4">
                      <Google />
                      <button className="font-medium">
                        Sign Up with Google
                      </button>
                    </div>
                    <div className="btn btn-outline text-[1.2rem] w-[30rem] h-[3.5rem] mb-7">
                      <Facebook />
                      <button className="font-medium">
                        Sign Up with Facebook
                      </button>
                    </div>
                  </div>
                  <div className="divider divide-[#E5E7EB] mb-10"></div>
                  <div className="form-control  join-item text-base">
                    <div className="mb-7">
                      <label className="label">
                        <span className="text-xl">Username or Email *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                      />
                      {/* <label className="label">
                        <span className="label-text-alt text-error text-base">
                          Email Error Message
                        </span>
                      </label> */}
                    </div>
                    <div>
                      <label className="label">
                        <span className="text-xl">Password *</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                      />
                      {/* <label className="label">
                        <span className="text-base text-error">
                          Password Error Message
                        </span>
                      </label> */}
                    </div>
                    <div className="form-control mb-5 mt-4 ">
                      <div>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            // checked={false}
                            className="checkbox"
                          />
                          <span className="text-xl ml-5">Remember me</span>
                        </label>
                      </div>
                    </div>
                    <button className="btn btn-primary mb-8 text-white text-[20px] capitalize font-medium py-4 pb-[36px]">
                      Sign Up
                    </button>
                    <div className="flex flex-row items-center justify-between">
                      <h3 className="text-xl"> Don’t have an account?</h3>
                      <button className="border-2 border-[#DADDE7] text-[#23272A] pl-16 pr-16 py-3 rounded-2xl flex flex-row items-center justify-center text-2xl">
                        <span className="mr-3">Sign Up</span>
                        <IconRight />
                      </button>
                    </div>
                  </div>
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
