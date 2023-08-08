"use client";

import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { orders } from "@/Data/Order_Data";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import axios from "axios";
import { redirect } from "next/navigation";
const Page = () => {
  const [AllOrders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user) {
        setIsLoading(false);
        setError("Not Logged In");
        return;
      }

      try {
        const response = await axios.get(`/api/orders/${session.user.email}`);
        setOrders(response.data.myOrders); // Update the orders directly
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
        setError("Can't Fetch Data");
      }
    };

    if (session?.user?.email) {
      fetchData();
    }
  }, [session]);

  const [sortOrder, setSortOrder] = useState(null);
  const handleSort = (field) => {
    if (sortOrder === field) {
      setSortOrder(null);
    } else {
      setSortOrder(field);
    }
  };

  const getSortedOrders = () => {
    let filteredOrders = AllOrders.slice(); // Create a copy of AllOrders to avoid mutating the original array

    // Filter by status
    if (sortOrder === "paid") {
      filteredOrders = filteredOrders.filter(
        (order) => order.paid === "paid" || order.paid === true
      );
    } else if (sortOrder === "pending") {
      filteredOrders = filteredOrders.filter(
        (order) => order.paid === "pending" || order.paid === false
      );
    }

    // Sort by price
    if (sortOrder === "priceDesc") {
      filteredOrders = filteredOrders.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "priceAsc") {
      filteredOrders = filteredOrders.sort((a, b) => a.price - b.price);
    }

    // Sort by card name
    if (sortOrder === "cardsDesc") {
      filteredOrders = filteredOrders.sort((a, b) =>
        a.card && b.card ? b.card.localeCompare(a.card) : 0
      );
    } else if (sortOrder === "cardsAsc") {
      filteredOrders = filteredOrders.sort((a, b) =>
        a.card && b.card ? a.card.localeCompare(b.card) : 0
      );
    }

    return filteredOrders;
  };

  const sortedOrders = getSortedOrders();

  const DropDownFilter = () => {
    return (
      <ul
        tabIndex={0}
        className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        {/* <li>
          {sortOrder !== "cardsAsc" && (
            <p
              className={`justify-between w-full ${
                sortOrder === "cardsDesc" ? "text-accent-500" : ""
              }`}
              onClick={() => handleSort("cardsAsc")}
            >
              Cards: A-Z {sortOrder === "cardsAsc" ? "✓" : ""}
            </p>
          )}
          {sortOrder !== "cardsDesc" && (
            <p
              className={`justify-between w-full ${
                sortOrder === "cardsAsc" ? "text-accent-500" : ""
              }`}
              onClick={() => handleSort("cardsDesc")}
            >
              Cards: Z-A {sortOrder === "cardsDesc" ? "✓" : ""}
            </p>
          )}
        </li> */}
        <li>
          {/* Sort by Price */}
          <p
            className={`justify-between w-full ${
              sortOrder === "priceDesc" ? "text-accent-500" : ""
            }`}
            onClick={() => handleSort("priceDesc")}
          >
            Price: High to Low {sortOrder === "priceDesc" ? "✓" : ""}
          </p>
        </li>
        <li>
          <p
            className={`justify-between w-full ${
              sortOrder === "priceAsc" ? "text-accent-500" : ""
            }`}
            onClick={() => handleSort("priceAsc")}
          >
            Price: Low to High {sortOrder === "priceAsc" ? "✓" : ""}
          </p>
        </li>
        <li>
          {/* Show Paid Orders */}
          <p
            className={`justify-between w-full ${
              sortOrder === "paid" ? "text-accent-500" : ""
            }`}
            onClick={() => handleSort("paid")}
          >
            Show Paid {sortOrder === "paid" ? "✓" : ""}
          </p>
        </li>
        <li>
          {/* Show Pending Orders */}
          <p
            className={`justify-between w-full ${
              sortOrder === "pending" ? "text-accent-500" : ""
            }`}
            onClick={() => handleSort("pending")}
          >
            Show Pending {sortOrder === "pending" ? "✓" : ""}
          </p>
        </li>
      </ul>
    );
  };

  const getStatusComponent = (status) => {
    if (status === "paid" || status === true) {
      return (
        <div className="flex text-center justify-end">
          <div className="bg-green-200 text-green-600 uppercase px-3 py-1 rounded text-[12px] font-normal leading-none tracking-wide">
            Paid
          </div>
        </div>
      );
    } else if (status === "pending" || status === false) {
      return (
        <div className="flex text-center justify-end">
          <div className="bg-amber-200 text-amber-600 text-[12px] font-normal leading-none tracking-wide uppercase px-3 py-1 rounded">
            Pending
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!AllOrders) {
    return <div className="min-h-[100vh]">Empty Data</div>;
  }
  if (error) {
    return <div className="min-h-[100vh]">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-10 mx-2 md:mx-16 border-stone-300 border px-10 py-10">
        <div className="">
          <div className="flex justify-between py-3 pl-2">
            <div className="relative max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="block w-full p-3 pl-10 text-sm border-gray-500 border rounded-md placeholder:font-sans placeholder:text-primary placeholder-transparent placeholder-opacity-0 bg-transparent"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <button className="relative z-[0] inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                  <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                    {/*  */}
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="">
                        <div className="flex flex-row justify-center items-center">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                              />
                            </svg>
                          </div>

                          <div className="ml-3">
                            <div className="w-10 rounded-full">
                              <p>Filters </p>
                            </div>

                            {DropDownFilter()}
                          </div>
                        </div>
                      </label>
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-1.5 w-full inline-block align-middle ">
            <div className="overflow-x-auto md:overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                    >
                      ID
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
                      <span className="inline-flex items-center">Card</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                    >
                      <span className="inline-flex items-center">Price</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {AllOrders &&
                    getSortedOrders().map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                          #{order._id}
                        </td>
                        <td className="px-6 py-4 text-primary text-xs font-normal leading-none tracking-wide">
                          {order.userEmail}
                        </td>
                        <td className="px-6 py-4 text-primary text-xs font-normal leading-none tracking-wide">
                          {order.title}
                        </td>
                        <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                          ৳ {order.price}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div>{getStatusComponent(order.paid)}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button className="text-primary bg-stone-200 px-4 py-1 rounded">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between py-3 pl-2">
            <div className="relative max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="block w-full p-3 pl-10 text-sm border-gray-500 border rounded-md placeholder:font-sans placeholder:text-primary placeholder-transparent placeholder-opacity-0 bg-transparent"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center ">
              <div className="relative">
                <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                  <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                    {/*  */}
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="">
                        <div className="flex flex-row justify-center items-center ">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                              />
                            </svg>
                          </div>

                          <div className="ml-3">
                            <div className="w-10 rounded-full">
                              <p>Filters </p>
                            </div>

                            {DropDownFilter()}
                          </div>
                        </div>
                      </label>
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
