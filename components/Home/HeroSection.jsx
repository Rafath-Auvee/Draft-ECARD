import Image from "next/image";
import React from "react";
import Hero from "/public/Home/hero.png";
import Static from "/public/Home/static.png";
import Card from "./Card";
const HeroSection = () => {
  return (
    <div>
      {/* <Image
        src={Hero}
        width={0}
        height={0}
        className="w-full h-screen bg-cover bg-no-repeat bg-scroll"
        alt="Hero Image"
      /> */}

      <div className="flex flex-row justify-between">
        <div className="basis-3/12">
          <Card />
        </div>

        <div className="basis-3/12">
          <Card />
        </div>
        <div className="basis-3/12">
          <Card />
        </div>
        <div className="basis-3/12">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
