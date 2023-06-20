import React from "react";
import { data } from "../../Data/Card_Data";

const PortfolioTop = () => {
  let count = 0;
  data.forEach(() => {
    count++;
  });

  return (
    <div className="flex flex-row mt-10 justify-center md:justify-start">
      <div className="lg:basis-3/12 lg:flex hidden"></div>

      <div className="basis-4/5 md:ml-[80px] md:mr-[55px] lg:ml-[140px] lg:basis-8/12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="w-full max-w-xs mx-auto md:mx-0 md:text-left">
            <select className="select select-bordered w-full">
 
              <option disabled defaultValue>Default</option>
              <option>Highest Price</option>
              <option>Lowest Price</option>
              <option>Popular</option>
            </select>
          </div>
          <p className="capitalize mt-5 md:mt-0">Showed 1 - 6 of {count} products</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTop;
