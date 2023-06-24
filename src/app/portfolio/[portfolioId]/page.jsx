import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import React from "react";
import CardDynamic from "/public/card-preview/card.svg";
import Cards from "@/components/Cards/Cards";
import { data } from "../../../Data/Card_Data";

const page = () => {
  const cardLimit = 4;
  let cardCount = 0;
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  md:place-items-center  mt-10">
        <CardDynamic />

        <div className="h-[300px] my-auto">
          <div className="flex flex-col justify-start mx-5 mt-10 md:mt-0">
            <div className="HeartIcon">
              <div className="w-12 h-12 p-[12px] rounded-[40px] border  border-stone-300 justify-start items-start gap-[10px] inline-flex">
                <div className="p-[0px] justify-start items-start gap-[10px] flex">
                  <div className="w-6 h-6 relative"></div>
                </div>
              </div>
            </div>
            <div className="text-zinc-800 text-[32px] font-semibold leading-10 mt-5">
              Marbel Textured Welcome Board
            </div>
            <p className="mt-5 ">
              Welcome your guests with our pretty welcome boards!
            </p>
            <div className=" text-zinc-800 text-[40px] font-bold capitalize leading-10 my-5">
              ৳2,500
            </div>
            <div className=" h-12 p-[0px] flex-col justify-start items-start inline-flex">
              <div className="self-stretch h-12 p-[0px] flex-col justify-start items-start flex">
                <div className="self-stretch h-12 px-6 py-[10px] bg-zinc-800 rounded-md flex-col justify-center items-center gap-[10px] flex">
                  <div className="p-[0px] justify-center items-center gap-[7px] inline-flex">
                    <div className="text-center text-white text-[18px] font-medium leading-7">
                      Customize with My Content
                    </div>
                    <div className="w-[20px] h-[20px] relative">
                      <div className="w-[20px] h-[20px] left-[0px] top-[0px] absolute"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-10">
        <div className="flex flex-col items-center justify-center h-full mt-[6rem]">
          <h1 className="font-bold text-[56px] text-primary capitalize text-center mb-10 mt-10 md:mt-0">
            Our Popular Cards
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 md:place-items-center  gap-4 md:mx-10 lg:mx-24 ">
          {data.map((items, index) => {
            if (cardCount >= cardLimit) {
              return null;
            }
            if (
              // activeTab === "singlePage" &&
              items.cardType === "Single Page"
            ) {
              cardCount++;
              return <Cards key={index} items={items} />;
            }
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
