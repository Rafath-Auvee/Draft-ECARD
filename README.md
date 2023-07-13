Problem Statement: In NextJS 13 with app router, I want to pass data from "/experimental" to dynamic route "/experimental/${id}. It gives me 'router.query' as it is undefined.

I tried using 'next/navigation' in the nextjs 13 with app router. I can't pass the data to one component to another.

Here is my Json data

draft.js

export const draft = [
  {
    id: 1,
    title: "Burkina Faso serve Togo Vincent student",
    imageUrl: "/cards/1.jpg",
    imageType: "single image",
    price: 8000,
    buttonText: "View Design",
    cardType: "Single Page",
    popularity: 1,
    cardCategory: "singlePageCard",
  },
];

export default draft;


Here is my ExperimentCard where I pass and mapping the Draft.js data object 


import Cards from "../../components/Cards/Cards";
import { draft } from "../../Data/Draft_Data";

const ExperimentalCard = () => {
  return (
    <div className="ml-[1rem] md:ml-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 min-h-[120vh]">
        {draft.map((item, index) => (
          <Cards key={index} items={item} />
        ))}
      </div>
    </div>
  );
};

export default ExperimentalCard;


And the Card components will like this. And From Cards Components I want to pass data to dynamic route "/experimental/${id}.


Cards.jsx

'use client'
 
import { useRouter } from 'next/navigation'
import React from "react";

const Cards = ({ items }) => {

  const router = useRouter()
  
  const handleCardClick = (id) => {
    router.push(`/experimental/${id}`);
  };

  return (
    <div>
      
        <div className="mx-5  lg:mx-10">
          <div
            className="w-full h-[30rem] md:h-[25rem]  lg:h-[20rem] items-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url('${items.imageUrl}')` }}
            onClick={() => handleCardClick(item.id)}
          >
            <div className="bg-[#23272a93] relative z-0 w-32 mb-4 ml-4 h-11 text-center items-center flex rounded-sm justify-center ">
              <p className="text-base-100 uppercase">{items.cardType}</p>
            </div>
          </div>
          <div className="flex flex-row mt-4 justify-between">
            <h2 className="font-normal text-[1.5rem] md:text-[1.4rem] lg:text-xl basis-2/3">
              {items.title}
            </h2>
            <p className="font-bold text-2xl lg:text-xl basis-1/3 text-right md:text-left lg:text-right">
            ৳{items.price}
            </p>
          </div>
          {/* <p>Popularity: {items.popularity}</p> */}
        </div>
   
    </div>
  );
};

export default Cards;
When I click the component it will navigate to the dynamic link "/experimental/${id}". It gives me an error

[id]/page.jsx

'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter();
  const { id } = router.query; 

  return (
    <div>
      <h1>Experimental Card Details</h1>
      <p>Card ID: {id}</p>
      <p>Card title: {title}</p>
      <p>Card imageUrl: {imageUrl}</p>
      <p>Card imageType: {imageType}</p>
      <p>Card price: {price}</p>
      <p>Card buttonText: {buttonText}</p>
      <p>Card cardType: {cardType}</p>
      <p>Card popularity: {popularity}</p>
      <p>Card cardCategory: {cardCategory}</p>
    </div>
  );
}

export default Page


Unhandled Runtime Error TypeError: Cannot destructure property 'id' of 'router.query' as it is undefined.

src\app\experimental\[id]\page.jsx (7:10) @ id

   5 | const Page = () => {
   6 | const router = useRouter();
>  7 | const { id } = router.query; 
     |        ^
   8 | 
   9 | return (
  10 |   <div>