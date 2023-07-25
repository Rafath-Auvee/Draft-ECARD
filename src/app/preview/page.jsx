"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const Preview = () => {
  const canvasRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  const [previewData, setPreviewData] = useState(null);

  const { title, url, imageType, textStyles } = previewData;

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverX(x);
    setHoverY(y);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = async (item) => {
    setIsDownloading(true);
    console.log(`Clicked on ${item}`);

    const canvas = canvasRef.current;

    // Determine the image format based on the item clicked
    const imageFormat =
      item === "Download as JPEG" ? "image/jpeg" : "image/png";
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
    const imageTitle = previewData?.title || "Untitled";

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

  useEffect(() => {
    // Load previewData from localStorage after component mounts
    const storedPreviewData =
      typeof window !== "undefined" && localStorage.getItem("previewData");
    if (storedPreviewData) {
      setPreviewData(JSON.parse(storedPreviewData));
    }

    // Rest of the code inside useEffect...
  }, []); // Empty dependency array means this effect runs only once after component mounts

  useEffect(() => {
    if (previewData) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const renderImage = () => {
        const image = document.createElement("img");
        image.src = previewData.url;

        image.onload = () => {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          renderTextStyles(); // Call the function here to render text styles after rendering the image.
        };
      };

      const renderTextStyles = () => {
        textStyles.forEach((textStyle) => {
          const {
            left,
            top,
            fontSize,
            fontFamily,
            text,
            lineHeight,
            letterSpacing,
            color,
            textAlign,
          } = textStyle;

          context.font = `${fontSize}px ${fontFamily}`;
          context.fillStyle = color;

          context.lineHeight = lineHeight || 1.5;
          context.letterSpacing = letterSpacing || 0;

          const lines = text.split("\n");

          // Render single line of text if there's only one line
          if (lines.length === 1) {
            const line = lines[0];
            const lineY = top + fontSize * context.lineHeight;
            // Calculate text width and height for single line
            const textWidth = context.measureText(line).width;
            const textHeight = fontSize;
            context.textAlign = textAlign;

            let x;

            if (textAlign === "center") {
              x = left + textWidth / 2;
              console.log("center - x : ", x);
            } else if (textAlign === "right") {
              x = left + textWidth;
              console.log("right - x : ", x);
            } else {
              x = left;
              console.log("left - x : ", x);
            }

            console.log("Single Line Text - alignment:", line, textAlign);
            console.log("Single Line Text Width:", textWidth);
            console.log("Single Line Text Height:", textHeight);

            context.fillText(line, x, lineY);
          } else {
            // Render multi-line text
            const maxLineWidth = Math.max(
              ...lines.map((line) => context.measureText(line).width)
            );
            const textHeight = lines.length * fontSize * context.lineHeight;
            context.textAlign = textAlign;
            let y = top;

            lines.forEach((line, index) => {
              const lineY = y + index * (fontSize * context.lineHeight);
              let x;

              if (textAlign === "center") {
                x = left + maxLineWidth / 2;
                console.log("Multi-line center - x:", x);
              } else if (textAlign === "right") {
                x = left + maxLineWidth;
                console.log("Multi-line right - x:", x);
              } else {
                x = left;
                console.log("Multi-line left - x:", x);
              }

              console.log("Multi-line Text - alignment:", line, textAlign);
              console.log(
                "Multi-line Text Width:",
                context.measureText(line).width
              );
              console.log("Multi-line Text Height:", fontSize);
              context.fillText(line, x, lineY);
            });

            // Calculate text width and height for multi-line text

            console.log("Multi-Line Text Width:", maxLineWidth);
            console.log("Multi-Line Text Height:", textHeight);
          }
        });
      };

      if (previewData) {
        if (previewData.imageType === "multiple image") {
          const selectedImageData = previewData.images.find(
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
          renderImage(); // Call the function here to render the image.
        }
      }
    }
  }, [previewData]);

  if (!previewData) {
    return <div className="text-center flex justify-center">No Data Found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
        <h1 className="text-center text-3xl font-bold leading-5 my-5">
          {title}
        </h1>
        <div>
          {/* <h1>X: {hoverX}</h1>
          <h1>Y: {hoverY}</h1> */}
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border border-gray-500"
            width={900}
            height={1200}
            onMouseMove={handleCanvasMouseMove}
          ></canvas>
        </div>

        {previewData && previewData.imageType === "multiple image" && (
          <div className="flex justify-center mt-4">
            {/* Render multiple images */}
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
