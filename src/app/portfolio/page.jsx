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
      <div className="lg:mx-16 mt-20">
        <PortfolioTop />
        <div className="flex flex-row mt-10">
          <div className="lg:basis-3/12 lg:flex hidden">
            <PortfolioSidebar />
          </div>
          <div className="lg:basis-9/12">
            <PortfolioCards />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
