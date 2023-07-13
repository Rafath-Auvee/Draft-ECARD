import React from "react";

const Cards = ({ items }) => {
  return (
    <div>
      <div className="mx-5  lg:mx-10">
        <div
          className="w-full h-[30rem] md:h-[25rem]  lg:h-[20rem] items-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url('${items.imageUrl}')` }}
        >
          <div className="bg-[#23272a93] relative z-0 w-32 mb-4 ml-4 h-11 text-center items-center flex rounded-sm justify-center ">
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
        {/* <p>Popularity: {items.popularity}</p> */}
      </div>
    </div>
  );
};

export default Cards;
