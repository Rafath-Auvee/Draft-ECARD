"use client";

import Image from "next/image";
import Card_Preview from "/public/Home/card_preview.png";
import Hero from "/public/Home/hero.png";
import Iphone from "/public/Home/iPhone.png";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";

const Card = ({imageUrl, title, price}) => {
  return (
    <div className="mx-5  lg:mx-10 ">
      <div
        className="w-full h-[30rem] md:h-[25rem]  lg:h-[20rem] items-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="bg-[#23272a93] relative z-0 w-32 mb-4 ml-4 h-11 text-center items-center flex rounded-sm justify-center ">
          <p className="text-base-100">Single page</p>
        </div>
      </div>
      <div className="flex flex-row mt-4 justify-between">
        <h2 className="font-normal text-[1.5rem] md:text-[1.4rem] lg:text-xl basis-2/3">
          {title}
        </h2>
        <p className="font-bold text-2xl lg:text-xl basis-1/3 text-right md:text-left lg:text-right">
          {price}
        </p>
      </div>
    </div>
  );
};

export default Card;
