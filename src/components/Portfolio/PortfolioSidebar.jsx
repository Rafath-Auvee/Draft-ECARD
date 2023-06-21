import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

const PortfolioSidebar = ({ onApplyFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("singlePageCard");
  const [minValue, set_minValue] = useState(500);
  const [maxValue, set_maxValue] = useState(4000);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
    onApplyFilters(e.minValue, e.maxValue, selectedCategory);
  };

  return (
    <div>
      <div className="mr-10">
        <p className="font-bold text-[18px]">Category</p>
        <div className="divider"></div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Single Page Card</span>
            <input
              type="radio"
              name="category"
              className="radio checked:bg-black"
              checked={selectedCategory === "singlePageCard"}
              onChange={() => setSelectedCategory("singlePageCard")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Multi Page Card</span>
            <input
              type="radio"
              name="category"
              className="radio checked:bg-black"
              checked={selectedCategory === "multiPageCard"}
              onChange={() => setSelectedCategory("multiPageCard")}
            />
          </label>
        </div>

        <p className="font-bold text-[18px] mt-[20px]">Pricing</p>
        <div className="divider"></div>
        <MultiRangeSlider
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          min={0}
          max={10000}
          step={1}
          minValue={minValue}
          maxValue={maxValue}
          label="false"
          ruler="false"
          barLeftColor="#ffffff"
          barInnerColor="#23272A"
          barRightColor="#ffffff"
          thumbLeftColor="#23272A"
          thumbRightColor="#23272A"
          onInput={handleInput}
        />
        <div className="flex flew-row items-center mt-5">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-md disabled:text-black cursor-none basis-3/5 mr-[40px] disabled:bg-white"
            disabled={true}
            value={`$${minValue} - $${maxValue}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioSidebar;
