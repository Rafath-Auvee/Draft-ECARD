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
  const [permanentTexts, setPermanentTexts] = useState([]);
  const { editorPreviewData } = usePreviewDataContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  console.log(editorPreviewData);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = async (item) => {
    setIsDownloading(true);
    console.log(`Clicked on ${item}`);
  
    const canvas = canvasRef.current;
  
    // Determine the image format based on the item clicked
    const imageFormat = item === "Download as JPEG" ? "image/jpeg" : "image/png";
    const filenameExtension = item === "Download as JPEG" ? "jpeg" : "png";
  
    // Get the current date and time in the specified format
    const currentDateTime = new Date().toLocaleString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    // Get the image title
    const imageTitle = editorPreviewData?.title || "Untitled";
  
    // Combine the components to create the filename
    const filename = `${currentDateTime}_${imageTitle}.${filenameExtension}`;
  
    // Convert canvas content to a data URL with the appropriate image format
    const dataURL = canvas.toDataURL(imageFormat);
  
    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    link.click();
  
    setIsDownloading(false);
  };
  

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
  } = editorPreviewData || {};

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (editorPreviewData) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the background image if needed
      if (editorPreviewData.imageUrl) {
        const backgroundImage = document.createElement("img");
        backgroundImage.src = editorPreviewData.imageUrl;
        backgroundImage.onload = () => {
          context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
      }

      // Draw the permanent texts on the canvas
      permanentTexts.forEach((textStyle) => {
        context.fillStyle = textStyle.backgroundColor;
        context.fillRect(
          textStyle.left,
          textStyle.top,
          textStyle.width,
          textStyle.height
        );

        context.font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;
        context.fillStyle = textStyle.color;
        context.textAlign = textStyle.textAlign;
        context.textBaseline = "middle";
        context.lineHeight = textStyle.lineHeight || 1.5;
        context.letterSpacing = textStyle.letterSpacing || 0;

        const lines = textStyle.text.split("\n");
        lines.forEach((line, index) => {
          const y = textStyle.top + index * context.lineHeight;
          context.fillText(line, textStyle.left, y);
        });
      });

      // Draw the current text styles from editor preview data
      if (editorPreviewData.textStyles) {
        editorPreviewData.textStyles.forEach((textStyle) => {
          context.fillStyle = textStyle.backgroundColor;
          context.fillRect(
            textStyle.left,
            textStyle.top,
            textStyle.width,
            textStyle.height
          );

          context.font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;
          context.fillStyle = textStyle.color;
          context.textAlign = textStyle.textAlign;
          context.textBaseline = "middle";

          const lines = textStyle.text.split("\n");
          lines.forEach((line, index) => {
            const y = textStyle.top + index * textStyle.lineHeight;
            context.fillText(line, textStyle.left, y);
          });
        });
      }
    }
  }, [editorPreviewData, permanentTexts]);

  const textStylesRef = useRef(textStyles);

  if (!editorPreviewData) {
    return <div className="text-center flex justify-center">No Data Found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
        <h1 className="text-center text-3xl font-bold leading-5 my-5">
          {editorPreviewData.title}
        </h1>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border border-gray-500"
            width={900}
            height={1200}
          ></canvas>
          {/* {textStyles.map((textStyle, index) => (
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
          ))} */}
        </div>

        {editorPreviewData &&
          editorPreviewData.imageType === "multiple image" && (
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
        <div className="relative inline-block text-left mt-10">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              id="dropdown-button"
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={toggleDropdown}
            >
              Download
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3.586L4.707 8.879a1 1 0 0 0 0 1.414l5.293 5.293a1 1 0 0 0 1.414-1.414L7.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <div className="py-1" role="none">
                <button
                  className="text-sm text-gray-700 block px-4 py-2 w-full text-left"
                  role="menuitem"
                  onClick={() => handleItemClick("Download as JPEG")}
                >
                  Download as JPEG
                </button>
                <button
                  className="text-sm text-gray-700 block px-4 py-2 w-full text-left"
                  role="menuitem"
                  onClick={() => handleItemClick("Download as PNG")}
                >
                  Download as PNG
                </button>
              </div>
            </div>
          )}
        </div>

        {isDownloading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded p-4">
              <p className="text-lg font-semibold">Downloading...</p>
              <div className="mt-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Preview;
