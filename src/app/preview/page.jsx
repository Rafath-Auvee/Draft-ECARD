"use client";

import ImageEditorFunctions from "@/components/ImageEditor/ImageEditorFunctions";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import { usePreviewDataContext } from "@/components/PreviewDataContext/PreviewDataContext";

import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const Preview = () => {
  const canvasRef = useRef(null);
  const { editorPreviewData } = usePreviewDataContext();
  console.log(editorPreviewData);

  const {
    title,
    imageUrl,
    url,
    imageType,
    price,
    buttonText,
    cardType,
    popularity,
    description,
    cardCategory,
    textStyles,
  } = editorPreviewData;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    textStylesRef.current = textStyles;

    if (editorPreviewData.imageType === "multiple image") {
      const selectedImageData = editorPreviewData.images.find(
        (image) => image.url === selectedImage
      );

      if (selectedImageData) {
        const image = document.createElement("img");
        image.src = selectedImage;

        image.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          selectedImageData.textStyles.forEach((textStyle) => {
            context.fillStyle = textStyle.backgroundColor;
            context.fillRect(
              textStyle.left,
              textStyle.top,
              textStyle.width,
              textStyle.height
            );
          });
          setTextStyles(
            selectedImageData.textStyles.map((textStyle) => ({
              ...textStyle,
              fontSize: parseInt(textStyle.fontSize),
            }))
          );
          setSelectedImageTextStyles(selectedImageData.textStyles);
        };
      }
    } else {
      const image = document.createElement("img");
      image.src = editorPreviewData.url;

      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        textStyles.forEach((textStyle) => {
          context.fillStyle = textStyle.backgroundColor;
          context.fillRect(
            textStyle.left,
            textStyle.top,
            textStyle.width,
            textStyle.height
          );
        });
      };
    }
  }, [editorPreviewData, textStyles]);

  const textStylesRef = useRef(textStyles);

  if (!editorPreviewData) {
    return <div className="text-center flex justify-center">No Data Found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
        <h1 className="text-center text-3xl font-bold leading-5 my-5">
          {title}
        </h1>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border border-gray-500"
            width={900}
            height={1200}
          ></canvas>
          {textStyles.map((textStyle, index) => (
            <Draggable
              key={index}
              position={{ x: textStyle.left, y: textStyle.top }}
            //   onStop={(e, data) => handleTextDragStop(index, data)}
              bounds="parent"
              disabled={true}
            >
              <div
                id={`textElement_${index}`} // Set a unique ID for each text element
                className={`absolute ${
                  textStyle.isSelected
                    ? "border-gray-500  border-2 border-dashed"
                    : ""
                }`}
                style={{
                  whiteSpace: "pre-wrap",
                //   cursor: "pointer",
                  textAlign: textStyle.textAlign,
                  lineHeight: textStyle.lineHeight || 1.5, // Set initial line height from JSON or default to 1.5
                  letterSpacing: textStyle.letterSpacing || 0, // Set initial letter spacing from JSON or default to 0
                }}
                // onClick={() => handleTextClick(index)}
              >
                {textStyle.text.split("\n").map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    style={{
                      color: textStyle.backgroundColor,
                      fontFamily: textStyle.fontFamily,
                      fontSize: `${textStyle.fontSize}px`,
                      textAlign: textStyle.textAlign, // Center align the text
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </Draggable>
          ))}
        </div>

        {editorPreviewData && imageType === "multiple image" && (
          <div className="flex justify-center mt-4">
            {images.map((image, index) => (
              <div className="flex flex-col text-center mx-3" key={index}>
                <Image
                  width={0}
                  height={0}
                  key={image.id}
                  src={image.url}
                  alt={`Image ${image.id}`}
                  className={`w-16 h-16 mx-1 cursor-pointer ${
                    selectedImage === image.url
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handleImageClick(image.url)}
                />
                <p>Page {index + 1}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Preview;
