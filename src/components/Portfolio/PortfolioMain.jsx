import React, { useState } from "react";
import PortfolioCards from "@/components/Portfolio/PortfolioCards";
import PortfolioSidebar from "@/components/Portfolio/PortfolioSidebar";
import PortfolioTop from "@/components/Portfolio/PortfolioTop";

const PortfolioMain = () => {

  const handleFilterChange = (selectedFilter) => {
    console.log(`Selected Filter: ${selectedFilter}`);
  };
  const handleFilters = (minValue, maxValue, selectedCategory) => {
    console.log(
      `Min: ${minValue}, Max: ${maxValue}, Category: ${selectedCategory}`
    );
  };

  return (
    <div>
      <div className="lg:mx-16 mt-20">
        <PortfolioTop onFilterChange={handleFilterChange} />
        <div className="flex flex-row mt-10">
          <div className="lg:basis-3/12 lg:flex hidden">
            <PortfolioSidebar onApplyFilters={handleFilters} />
          </div>
          <div className="lg:basis-9/12">
            <PortfolioCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMain;
