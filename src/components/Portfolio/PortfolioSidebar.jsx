"use client";

import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

const PortfolioSidebar = () => {
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(100);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  return (
    <div>
      {/* <div>
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>
              <a>Link</a>
            </li>
          </ul>
        </div>
      </div> */}
      <div className=" mr-20">
        <p className="font-bold text-[18px]">Category</p>
        <div className="divider"></div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Single Page Card</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-black"
              checked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Single Page Animated Card </span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-black"
              checked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Multi Page Card</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-black"
              checked
            />
          </label>
        </div>
        <p className="font-bold text-[18px] mt-[20px]">Pricing</p>
        <div className="divider"></div>
        <MultiRangeSlider
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          min={0}
          max={1000}
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
          onInput={(e) => {
            handleInput(e);
          }}
        />
        <div className="flex flew-row items-center mt-5">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-md basis-3/5 mr-[40px] bg-white"
            disabled={true}
            value={`${minValue} - ${maxValue}`}
          />
          <button className="btn btn-primary btn-md text-white font-sans leading-relaxed"
            onClick={() => {
              console.log(`Min: ${minValue}, Max: ${maxValue}`)
            }}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSidebar;
