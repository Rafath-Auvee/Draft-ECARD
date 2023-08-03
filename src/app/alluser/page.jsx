"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar/Navbar";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay"

const AllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("/api/auth/users");
        setAllUser(response.data.users);
        setIsLoading(false);
      } catch (error) {
        setError("Error loading data");
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <LoadingOverlay/>;
  }

  const hasNameData = allUser.some((user) => user.name);

  return (
    <div>
      <Navbar />
      <div className="p-1.5 w-full inline-block align-middle px-16 mt-6">
        <div className="overflow-x-auto md:overflow-hidden border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Id
                </th>

                {hasNameData && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    <span className="inline-flex items-center">Name</span>
                  </th>
                )}
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
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allUser.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    #{user.id}
                  </td>
                  {hasNameData && (
                    <td className="px-6 py-4 text-primary text-xs font-normal leading-none tracking-wide">
                      {user.name || "N/A"}
                    </td>
                  )}
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-primary text-xs font-normal tracking-wide">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
