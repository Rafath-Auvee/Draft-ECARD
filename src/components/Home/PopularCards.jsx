"use client";
import React from "react";

import { useState } from "react";
import { data } from "../../Data/Card_Data";
import Cards from "@/components/Cards/Cards";

const PopularCards = () => {

  const cardLimit = 8; // Set the limit to 8 cards
  let cardCount = 0; // Counter variable


  const [activeTab, setActiveTab] = useState("singlePage");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <div className="flex flex-col justify-between ">
        <div className="flex flex-col items-center justify-center h-full mt-[6rem]">
          <h1 className="font-bold text-[56px] text-primary capitalize text-center">
            Our Popular Cards
          </h1>
          <div className="tabs mt-[32px] mb-[58px] leading-6">
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
          {data.map((items, index) => {
            
            if (cardCount >= cardLimit) {
              return null; 
            }

            if (
              activeTab === "singlePage" &&
              items.cardType === "Single Page"
            ) {
              cardCount++;
              return <Cards key={index} items={items} />;
            } else if (
              activeTab === "multiplePage" &&
              items.cardType === "Multiple Page"
            ) {
              cardCount++;
              return <Cards key={index} items={items} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCards;
