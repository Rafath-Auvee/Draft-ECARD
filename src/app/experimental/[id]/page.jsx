"use client";

import React from "react";
import { draft } from "../../../Data/Draft_Data";
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  console.log(params)


  const card = draft.find((item) => item.id === parseInt(params.id));

  console.log(card)
  return (
    <div>
      <h1>Experimental Card Details</h1>
      {card ? (
        <>
          <p>Card ID: {card.id}</p>
          <p>Card title: {card.title}</p>
        </>
      ) : (
        <p>Card not found.</p>
      )}
    </div>
  );
};

export default Page;
  // Find the card object based on the ID
  // const card = draft.find((item) => console.log(parseInt(params.id)));
    // console.log(draft)