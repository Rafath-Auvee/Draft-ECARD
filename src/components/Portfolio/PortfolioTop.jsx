import React from "react";
import { data } from "../../Data/Card_Data";

const PortfolioTop = ({ onFilterChange }) => {
  let count = 0;
  data.forEach(() => {
    count++;
  });

  return (
    <div className="flex flex-row mt-10 justify-center md:justify-start">
      <div className="lg:basis-3/12 lg:flex hidden"></div>

      <div className="basis-4/5 md:ml-[80px] md:mr-[55px] lg:ml-[107px] lg:basis-8/12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="max-w-xs mx-auto md:mx-0 md:text-left flex flex-row items-center justify-center border border-primary border-solid px-2 py-2 rounded">
            <p className="pr-2">Sort By:</p>
            <select
              className="w-auto"
              defaultValue="Default"
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="Default">Default</option>
              <option value="Highest Price">Highest Price</option>
              <option value="Lowest Price">Lowest Price</option>
              <option value="Popular">Popular</option>
            </select>
          </div>

          <p className="capitalize mt-5 md:mt-0">
            Showed 1 - 6 of {count} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTop;
