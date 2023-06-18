"use client";

import Image from "next/image";
import Iphone from "/public/Home/iPhone.png";
import { BsArrowRight } from "react-icons/bs";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-scroll"
        style={{ backgroundImage: `url('/Home/hero.png')` }}
      >
      <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-[24px] text-primary uppercase">Looking for</p>
            <h1 className="font-bold text-center text-[56px] text-primary capitalize">
              the Perfect E-card?
            </h1>
            <div className="flex flex-row items-center justify-center">
              <button className="bg-primary text-white py-[1rem] text-[18px] px-[1.5rem] mt-[24px] rounded flex items-center justify-center">
                Check out The Designs Here
                <BsArrowRight className="text-[20px] ml-[10px] mt-[2px]" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center flex-grow mb-[132px]">
            <Image
              src={Iphone}
              width={0}
              height={0}
              className=""
              alt="Hero Image"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
