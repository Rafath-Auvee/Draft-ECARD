"use client";

import Image from "next/image";
import Iphone from "/public/Home/iPhone.png";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";



export const data = [
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
  },
  // Add more data objects as needed
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("singlePage");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-scroll"
        style={{ backgroundImage: `url('/Home/hero.png')` }}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center h-full mt-[6rem]">
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
          <div className="flex items-center justify-center flex-grow">
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

      <div className="flex flex-col justify-between ">
        <div className="flex flex-col items-center justify-center h-full mt-[6rem]">
          <h1 className="font-bold text-[56px] text-primary capitalize text-center">
            Our Popular Cards
          </h1>
          <div className="tabs mt-[32px]  mb-[58px] leading-6">
            <a
              className={`tab ${
                activeTab === "singlePage"
                  ? "tab-active underline underline-offset-8 "
                  : ""
              } text-[16px]`}
              onClick={() => handleTabClick("singlePage")}
            >
              Single Page Cards
            </a>
            <a
              className={`tab ${
                activeTab === "multiplePage"
                  ? "tab-active underline underline-offset-8 "
                  : ""
              } text-[16px]`}
              onClick={() => handleTabClick("multiplePage")}
            >
              Multiple Page Cards
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20  gap-4 md:mx-10 lg:mx-24 ">
          {data.map((item, index) => (
            <div className="mx-5  lg:mx-10 " key={index}>
              <div
                className="w-full h-[30rem] md:h-[25rem]  lg:h-[20rem] items-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url('${item.imageUrl}')` }}
              >
                <div className="bg-[#23272a93] relative z-0 w-32 mb-4 ml-4 h-11 text-center items-center flex rounded-sm justify-center ">
                  <p className="text-base-100">Single page</p>
                </div>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <h2 className="font-normal text-[1.5rem] md:text-[1.4rem] lg:text-xl basis-2/3">
                  {item.title}
                </h2>
                <p className="font-bold text-2xl lg:text-xl basis-1/3 text-right md:text-left lg:text-right">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
      
      <Footer/>
    </div>
    </div>
  );
}
