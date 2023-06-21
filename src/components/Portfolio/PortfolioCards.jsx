import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { data } from "../../Data/Card_Data";
import PortfolioPagination from "./PortfolioPagination";

const PortfolioCards = ({
  minValue,
  maxValue,
  selectedCategory,
  selectedFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    // Randomize price values in the data array


    // Apply filtering based on selectedCategory and selectedFilter
    let cards = data;

    if (selectedFilter === "Default") {
      cards = data;
    }
    
    if (selectedCategory === "singlePageCard") {
      cards = cards.filter((item) => item.cardCategory === "singlePageCard");
    }
    if (selectedCategory === "multiPageCard") {
      cards = cards.filter((item) => item.cardCategory === "multiPageCard");
    }

    if (selectedFilter === "Highest Price") {
      cards = cards.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    if (selectedFilter === "Lowest Price") {
      cards = cards.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    if (selectedFilter === "Popular") {
      cards = cards.filter((item) => item.popularity > 4.5);
      cards = cards.sort((a, b) => b.popularity - a.popularity);
    }

    cards = cards.filter(
      (item) => parseFloat(item.price) >= minValue && parseFloat(item.price) <= maxValue
    );



    setFilteredCards(cards);
  }, [minValue, maxValue, selectedCategory, selectedFilter]);

  // Apply pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ml-[1rem] md:ml-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 min-h-[120vh]">
        {currentCards.map((item, index) => (
          <>
            <Cards key={index} items={item} />
          </>
        ))}
      </div>
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mx-[40px]">
          <p className="capitalize basis-3/12 mb-10 md:mb-0">
            Showed {indexOfFirstCard + 1} -{" "}
            {Math.min(indexOfLastCard, filteredCards.length)} of{" "}
            {filteredCards.length} products
          </p>

          <PortfolioPagination
            className="basis-9/12"
            totalPages={Math.ceil(filteredCards.length / cardsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCards;
