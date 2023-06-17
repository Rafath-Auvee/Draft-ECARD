import React from "react";
import Card_Preview from "/public/Home/card_preview.png";
import Image from "next/image";

const Card = () => {
  return (
    <div className="main-card basis-3/12">
      <div className="h-full w-full items-center ">
        <p className="bg-[#23272A] w-28 h-11 text-center items-center flex rounded-lg justify-center">
          Single page
        </p>
        <div>
          <Image src={Card_Preview} alt="Card-Preview" className="rounded-xl" />
        </div>
        <h2>Marble Textured Welcome Board</h2>
        <p>৳2,500</p>
        <button>View Design</button>
      </div>
    </div>
  );
};

export default Card;
