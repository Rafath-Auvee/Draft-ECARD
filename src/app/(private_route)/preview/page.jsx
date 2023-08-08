"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

const Preview = () => {
  const canvasRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const previewDataFromLocalStorage =
    typeof window !== "undefined" && localStorage.getItem("previewData");

  const [previewData, setPreviewData] = useState(
    previewDataFromLocalStorage ? JSON.parse(previewDataFromLocalStorage) : null
  );

  const [isTextLoaded, setIsTextLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("sslCommerze");

  const [showModal, setShowModal] = useState(false);

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
    // console.log(`Clicked on ${item}`);

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
    const storedPreviewData =
      typeof window !== "undefined" && localStorage.getItem("previewData");
    if (storedPreviewData) {
      setPreviewData(JSON.parse(storedPreviewData));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (previewData) {
      const canvas = canvasRef.current;

      if (canvas) {
        const context = canvas.getContext("2d");

        const renderImage = () => {
          const image = document.createElement("img");
          image.src = previewData.watermark;

          image.onload = () => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            renderTextStyles(previewData.textStyles); // Call the function here to render text styles after rendering the image.
          };
        };

        const renderTextStyles = async (textStyles) => {
          const loadFont = async (fontFamily) => {
            try {
              await document.fonts.load(`1em ${fontFamily}`);
            } catch (error) {
              console.error(`Font not loaded: ${fontFamily}`);
            }
          };

          await Promise.all(
            textStyles.map((textStyle) => loadFont(textStyle.fontFamily))
          );

          textStyles.forEach((textStyle) => {
            // console.log(textStyle);
            const {
              id,
              text,
              startingImage,
              left,
              top,
              color,
              fontSize,
              backgroundColor,
              padding,
              fontFamily,
              textAlign,
              lineHeight,
              letterSpacing,
            } = textStyle;

            context.font = `${fontSize}px ${fontFamily}, sans-serif`;
            context.fillStyle = color;

            context.lineHeight = lineHeight || 1.5;
            context.letterSpacing = letterSpacing || 0;

            const lines = text ? text.split("\n") : [""];

            if (startingImage) {
              // Render starting image
              const image = document.createElement("img");
              image.src = startingImage;

              image.onload = () => {
                context.drawImage(image, left, top, 200, 30);
              };
            } else {
              // Render single line of text if there's only one line
              if (lines && lines.length === 1) {
                const line = lines[0];
                const lineY = top + fontSize * context.lineHeight;

                // Calculate text width and height for single line
                const textWidth = context.measureText(line).width;
                const textHeight = fontSize;
                context.textAlign = textAlign;

                let x;

                if (textAlign === "center") {
                  x = left + textWidth / 2;
                  // console.log("center - x : ", x);
                } else if (textAlign === "right") {
                  x = left + textWidth;
                  // console.log("right - x : ", x);
                } else {
                  x = left;
                  // console.log("left - x : ", x);
                }

                // console.log("Single Line Text - alignment:", line, textAlign);
                // console.log("Single Line Text Width:", textWidth);
                // console.log("Single Line Text Height:", textHeight);

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
                  const lineY =
                    y + index * (fontSize * context.lineHeight) + 30;
                  let x;

                  if (textAlign === "center") {
                    x = left + maxLineWidth / 2;
                    // console.log("Multi-line center - x:", x);
                  } else if (textAlign === "right") {
                    x = left + maxLineWidth;
                    // console.log("Multi-line right - x:", x);
                  } else {
                    x = left;
                    // console.log("Multi-line left - x:", x);
                  }

                  // console.log("Multi-line Text - alignment:", line, textAlign);
                  // console.log(
                  // "Multi-line Text Width:",
                  // context.measureText(line).width
                  // );
                  // console.log("Multi-line Text Height:", fontSize);
                  context.fillText(line, x, lineY);
                });

                // Calculate text width and height for multi-line text

                // console.log("Multi-Line Text Width:", maxLineWidth);
                // console.log("Multi-Line Text Height:", textHeight);
              }
            }
          });
          // setIsTextLoaded(true);
        };

        if (previewData) {
          if (previewData.imageType === "multiple image") {
            const selectedImageData = previewData.images.find(
              (image) => image.watermark === selectedImage
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
    } else {
      setPreviewData(null);
    }

    setIsLoading(false);
  }, [previewData]);

  const calculateVatAmount = () => {
    const vatRate = 20; // VAT rate in percentage
    const vatAmount = (previewData.price * vatRate) / 100;
    return vatAmount.toFixed(2); // Display VAT amount with 2 decimal places
  };

  const calculateTotal = () => {
    const vatRate = 20; // VAT rate in percentage
    const vatAmount = (previewData.price * vatRate) / 100;
    const total = previewData.price + vatAmount;
    return total.toFixed(2); // Display total with 2 decimal places
  };

  if (isLoading) {
    return <LoadingOverlay name="Preview is Opening" />;
  }

  if (!previewData) {
    return <div className="text-center flex justify-center">No Data Found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
        <h1 className="text-center text-3xl font-bold leading-5 my-5">
          {previewData?.title || ""}
        </h1>

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

        <div className="ButtonMasterLarge w-[900px] h-12 px-6 py-2.5 bg-[#D5B048] rounded-md shadow flex-col justify-center items-center gap-2.5 inline-flex mt-10">
          <div className="Container justify-center items-center gap-[7px] inline-flex">
            <button
              className="Label text-center text-zinc-800 text-lg font-medium leading-7"
              onClick={() => setShowModal(true)}
            >
              Download without Watermark
            </button>
            <div className="IconRight w-5 h-5 relative">
              <div className="Crown w-5 h-5 left-0 top-0 absolute"></div>
            </div>
          </div>
        </div>

        <div className="relative  mt-5">
          <div>
            <button
              type="button"
              className=" w-[900px] h-12 px-4 py-2 text-lg font-medium text-zinc-800 bg-white rounded-md shadow border border-gray-300 flex-col justify-center items-center gap-2.5 flex"
              id="dropdown-button"
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={toggleDropdown}
            >
              Download With Watermark
              {/* <svg
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
              </svg> */}
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
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-3xl">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h1 className="text-lg font-bold font-sans">
                    Billing Address
                  </h1>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <h5 className="text-1xl font-semibold">Full Name *</h5>
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-3  placeholder:text-black w-full resize-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    // rows={4} // Set the number of rows you want to display initially
                  />
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <h5 className="text-1xl font-semibold">Email *</h5>
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-3  placeholder:text-black w-full resize-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    // rows={4} // Set the number of rows you want to display initially
                  />
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <h5 className="text-1xl font-semibold">Phone *</h5>
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-3  placeholder:text-black w-full resize-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    // rows={4} // Set the number of rows you want to display initially
                  />
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <h5 className="text-1xl font-semibold">Address *</h5>
                  <textarea
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-full resize-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    rows={4} // Set the number of rows you want to display initially
                  />
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <div className="divider"></div>
                </div>

                <div className="flex items-start justify-between px-6 mb-4  border-solid border-slate-200 rounded-t">
                  <h1 className="text-lg font-bold font-sans">Make Payment</h1>
                </div>
                <div className="px-6 mb-6">
                  <p className="text-neutral-600 text-sm font-normal leading-snug tracking-tight">
                    Complete your purchase by providing your payment details.
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="sslCommerze"
                      checked={paymentMethod === "sslCommerze"}
                      onChange={() => setPaymentMethod("sslCommerze")}
                      className="cursor-pointer"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      SSL Commerze
                    </span>
                  </label>
                </div>

                <div className=" rounded-sm border border-gray-300 flex-col justify-start items-start gap-1 mx-6 pt-3 flex-auto">
                  <div className="flex flex-row justify-between py-3 px-4 text-1xl">
                    <p className="font-thin">Subtotal</p>
                    <p className="font-thin">৳{previewData.price}</p>
                  </div>
                  <div className="flex flex-row justify-between py-3 px-4 text-1xl">
                    <p className="font-thin">VAT (20%)</p>
                    <p className="font-thin">
                      ৳{previewData.vatAmount || calculateVatAmount()}
                    </p>
                  </div>
                  <div className="font-bold bg-[#EEEFF1] flex flex-row justify-between py-3 px-4 text-1xl">
                    <p>Total</p>
                    <p>৳{previewData.totalAmount || calculateTotal()}</p>
                  </div>
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <div className="divider"></div>
                </div>
                <div className="px-6 flex items-center justify-center">
                  <button
                    className="w-full bg-[#23272A] text-white active:bg-[#23272A] text-lg font-sans px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <p className="text-center text-white text-lg font-medium leading-7">
                      Pay ৳{calculateTotal()}
                    </p>
                  </button>
                </div>
                <div className="my-10 justify-center items-center gap-1 inline-flex text-zinc-400 text-1xl font-medium uppercase leading-tight ">
                  Payments are secure and encrypted
                </div>
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"> */}
                {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button> */}
                {/* <button
                    className="bg-[#23272A] text-white active:bg-[#23272A] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Update
                  </button> */}
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Footer />
    </>
  );
};

export default Preview;
