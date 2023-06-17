import Image from "next/image";
import React from "react";
import Hero from "/public/Home/hero.png";
const HeroSection = () => {
return (
<div className="relative">
<Image
        src={Hero}
        width={0}
        height={0}
        className="w-full h-screen bg-cover bg-no-repeat bg-scroll"
        alt="Hero Image"
      />
{/_ <p>Hello</p> _/}
</div>
);
};

export default HeroSection;
