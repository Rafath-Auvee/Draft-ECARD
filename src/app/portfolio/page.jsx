"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PortfolioCards from "@/components/Portfolio/PortfolioCards";
import PortfolioSidebar from "@/components/Portfolio/PortfolioSidebar";
import PortfolioTop from "@/components/Portfolio/PortfolioTop";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row mx-16 mt-20">
        <div className="basis-3/12">
          <PortfolioSidebar />
        </div>
        <div className="basis-9/12">
          <div>
            <PortfolioTop />
          </div>
          <PortfolioCards />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
