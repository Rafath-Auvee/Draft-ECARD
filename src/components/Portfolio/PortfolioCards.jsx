"use client";
import React, { useState } from "react";
import Cards from "../Cards/Cards";
import { data } from "../../Data/Card_Data";
import PortfolioPagination from "./PortfolioPagination";

const PortfolioCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ml-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 min-h-[120vh]">
        {currentCards.map((items, index) => (
          <Cards key={index} items={items} />
        ))}
      </div>
      <div className="mt-10">
        <div className="flex flex-row justify-between  items-center mx-[40px] ">
          <p className="capitalize basis-3/12">
            Showed 1 - 6 of {data.length} products
          </p>

          <PortfolioPagination
            className="basis-9/12"
            totalPages={Math.ceil(data.length / cardsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCards;
