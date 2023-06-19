import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import Iphone from "/public/Home/iPhone.png";
import Link from "next/link";
const HeroSection = () => {
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
              <Link href="/portfolio">
                <>
                  <button className="bg-primary text-white py-[1rem] text-[18px] px-[1.5rem] mt-[24px] rounded flex items-center justify-center">
                    Check out The Designs Here
                    <BsArrowRight className="text-[20px] ml-[10px] mt-[2px]" />
                  </button>
                </>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center flex-grow mb-[64px] md:mb-[137px] lg:mb-[]">
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
    </div>
  );
};

export default HeroSection;
