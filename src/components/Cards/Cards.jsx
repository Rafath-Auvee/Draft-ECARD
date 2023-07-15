import React, { useState } from "react";

const Cards = ({ items }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`mx-5 lg:mx-10 relative transition-opacity ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-[30rem] md:h-[25rem] lg:h-[20rem] bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${items.imageUrl}')`,
          backgroundSize: "cover",
          filter: isHovered ? "blur(4px)" : "none",
          transition: "filter 0.5s",
        }}
      >
        <div
          className={`bg-[#23272a93] absolute z-0 w-32 mb-4 ml-4 h-11 text-center items-center flex rounded-sm justify-center ${
            isHovered ? "opacity-20 fade-out" : "opacity-100 fade-in"
          }`}
          style={{
            transition: "opacity 0.5s, margin-top 0.5s", // Added margin-top transition
            marginTop: isHovered ? "10px" : "10px", // Adjust the top margin based on your preference
          }}
        >
          <p className="text-base-100 uppercase">{items.cardType}</p>
        </div>
      </div>
      <div className="flex flex-row mt-4 justify-between">
        <h2 className="font-normal text-[1.5rem] md:text-[1.4rem] lg:text-xl basis-2/3">
          {items.title}
        </h2>
        <p className="font-bold text-2xl lg:text-xl basis-1/3 text-right md:text-left lg:text-right">
          ৳{items.price}
        </p>
      </div>
    </div>
  );
};

export default Cards;
