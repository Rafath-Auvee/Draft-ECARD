"use client";

import Cards from "../../components/Cards/Cards";
import { draft } from "../../Data/Draft_Data";

const ExperimentalCard = () => {
  return (
    <div className="ml-[1rem] md:ml-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 min-h-[120vh]">
        {draft.map((item, index) => (
          <Cards key={index} items={item} />
        ))}
      </div>
    </div>
  );
};

export default ExperimentalCard;
