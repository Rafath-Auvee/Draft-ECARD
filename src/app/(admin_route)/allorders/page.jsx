"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

const CardList = () => {
  const [allCards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        const response = await axios.get("/api/orders");
        setCards(response.data.orders);
        setIsLoading(false);
      } catch (error) {
        setError("Error loading data");
        setIsLoading(false);
      }
    };

    fetchAllCards();
  }, []);

  if (error) {
    return <div className="min-h-[100vh]">{error}</div>;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const buttonTextMappings = {
    "View Design": { text: "Active", color: "text-green-500" },
    "Stock Out": { text: "Stock Out", color: "text-orange-500" },
    "In Development": { text: "In Development", color: "text-blue-500" },
    Removed: { text: "Removed", color: "text-red-500" },
    Paused: { text: "Paused", color: "text-yellow-500" },
  };

  return (
    <div>
      <div className="min-h-[100vh] p-1.5 w-full inline-block align-middle px-16 mt-6">
        <div className="overflow-x-auto md:overflow-hidden border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  <span className="inline-flex items-center">Id</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  <span className="inline-flex items-center">Email</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  <span className="inline-flex items-center">Type</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Price
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  <span className="inline-flex items-center">Paid</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Watermark
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allCards.map((allCard, index) => (
                <tr key={allCard.id}>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    #{allCard.id}
                  </td>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    {allCard.email || ""}
                  </td>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    {allCard.title}
                  </td>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    {allCard.cardType}
                  </td>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    {allCard.price}
                  </td>

                  <td
                    className={`px-6 py-4 text-xs font-normal tracking-wide ${
                      buttonTextMappings[allCard.buttonText]?.color ||
                      "text-primary"
                    }`}
                  >
                    {buttonTextMappings[allCard.buttonText]?.text ||
                      allCard.buttonText}
                  </td>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    <span className="">
                      {allCard.paid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <th scope="col" className="px-6 py-4 text-primary text-left text-xs font-normal tracking-wide">
                    <span className="">
                      {allCard.watermarkDefault ? "Yes" : "No"}
                    </span>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardList;
