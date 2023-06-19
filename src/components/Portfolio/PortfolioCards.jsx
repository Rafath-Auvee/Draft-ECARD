import React from "react";
import Cards from "../Cards/Cards";
import { data } from "../../Data/Card_Data";

const PortfolioCards = () => {
  const cardLimit = 6;
  let cardCount = 0;
  return (
    <div className="ml-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 ">
        {data.slice(0,8).map((items, index) => (
          <Cards key={index} items={items} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioCards;
