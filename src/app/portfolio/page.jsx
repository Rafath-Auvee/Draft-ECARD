"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PortfolioCards from "@/components/Portfolio/PortfolioCards";
import PortfolioSidebar from "@/components/Portfolio/PortfolioSidebar";
import PortfolioTop from "@/components/Portfolio/PortfolioTop";
import React, { useState } from "react";
import { data } from "../../Data/Card_Data";

const page = () => {
  const [selectedSortBy, setSelectedSortBy] = useState("");

  let count = 0;
  data.forEach(() => {
    count++;
  });

  const handleSortByChange = (e) => {
    setSelectedSortBy(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="mx-16 mt-20">
        <div className="flex flex-row ">
          <div className="basis-3/12"></div>
          <div className="basis-9/12 flex flex-row justify-between ml-[185px] mr-[55px] items-center">
            <div>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Sort By
                </option>
                <option>Default</option>
                <option>Highest Price</option>
                <option>Lowest Price</option>
                <option>Popular</option>
              </select>
            </div>
            <p className="capitalize">Showed 1 - 6 of {count} products</p>
          </div>
        </div>
        <div className="flex flex-row mt-10">
          <div className="basis-3/12 md:flex hidden">
            <PortfolioSidebar />
          </div>
          <div className="basis-9/12">
            <div  className="md:flex hidden">
              <PortfolioTop />
            </div>
            <PortfolioCards />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
