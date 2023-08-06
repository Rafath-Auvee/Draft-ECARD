"use client";

import React, { useState, useEffect } from "react";
import { draft } from "../../../Data/Draft_Data";
import { data } from "../../../Data/Card_Data";
import { useParams } from "next/navigation";
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import CardDynamic from "/public/card-preview/card.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

const cardLimit = 4;
let cardCount = 0;


const CardDetails = ({ card, cardLimit }) => {

  const navigate = useRouter();

  // const filteredCards = card.filter(
  //   (items) => card.cardType === items.cardType
  // );

  return (
    <>
      {/* <h1>Experimental Card Details</h1> */}
      {card ? (
        <>
          <div>
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:place-items-center mt-10 justify-center">
              <div className="relative h-[500px] w-[300px] md:w-[400px] lg:w-[500px] mx-auto">
                <Image
                  src={card.imageUrl}
                  alt="Card Preview"
                  layout="fill"
                  objectFit="contain" // Use "contain" to keep the image within the container without cropping
                  className="rounded-md max-h-[500px] max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
                  // onLoad={handleImageLoad}
                />
              </div>

              <div className="h-[300px] w-full md:w-9/12 my-auto md:ml-10 lg:ml-20">
                <div className="flex flex-col justify-start mx-5 mt-10 md:mt-0">
                  <div className="HeartIcon">
                    <div className="w-12 h-12 p-[12px] rounded-[40px] border  border-stone-300 justify-start items-start gap-[10px] inline-flex">
                      <div className="p-[0px] justify-start items-start gap-[10px] flex">
                        <div className="w-6 h-6 relative"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-zinc-800 text-[32px] font-semibold leading-10 mt-5">
                    {card.title}
                  </div>
                  <p className="mt-5 ">{card.description}</p>
                  <div className=" text-zinc-800 text-[40px] font-bold capitalize leading-10 my-5">
                    ৳{card.price}
                  </div>
                  {/* <p>Actual Width: {imageDimensions.width}</p> */}
                  {/* <p>Actual Height: {imageDimensions.height}</p> */}
                  <div className="h-12 p-0 flex flex-col justify-start items-start inline-flex">
                    <div className="self-stretch h-12 p-0 flex flex-col justify-start items-start">
                      <button
                        className="self-stretch h-12 px-6 py-2 bg-zinc-800 rounded-md flex flex-col justify-center items-center gap-2 focus:outline-none"
                        onClick={() =>
                          navigate.push(`/image-editor/${card.id}`)
                        }
                      >
                        <div className="justify-center items-center gap-2 inline-flex">
                          <div className="text-center text-white text-lg font-medium leading-7">
                            Customize with My Content
                          </div>
                          <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 left-0 top-0 absolute"></div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col justify-between mt-10">
              <div className="flex flex-col items-center justify-center h-full mt-[6rem]">
                <h1 className="font-bold text-[56px] text-primary capitalize text-center mb-10 mt-10 md:mt-0">
                  Our Popular Cards
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 md:place-items-center  gap-4 md:mx-10 lg:mx-24 ">
                {filteredCards.slice(0, cardLimit).map((items, index) => (
                  <Cards key={index} items={items} />
                ))}
              </div>
            </div> */}

            <Footer />
          </div>
        </>
      ) : (
        <p>Card not found.</p>
      )}
    </>
  );
};

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState(null); // Add this state variable
  const params = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`/api/cards/${params.id}`); // Correct the API endpoint URL
        setCard(response.data); // Store the fetched card data in the state
        console.log(response.data);
      } catch (error) {
        console.log("Error", error);
      }
      setIsLoading(false);
    };

    fetchCard();
  }, [params.id]);

  return (
    <div>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <CardDetails card={card} cardLimit={cardLimit} /> 
      )}
    </div>
  );
};

export default Page;
