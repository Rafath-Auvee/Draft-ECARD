"use client";
import Draggable from "react-draggable";
import ImageEditorFunctions from "@/components/ImageEditor/ImageEditorFunctions";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

import images from "@/Data/Draft_Data";
import { fonts } from "@/Data/Fonts_Data";
import draft from "@/Data/Draft_Data";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";

import PreviewModal from "@/components/PreviewModal/PreviewModal";

import {
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiArrowDown,
  FiArrowUp,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { BsArrowsCollapse } from "react-icons/bs";
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiArrowToTop,
  BiArrowToBottom,
  BiHorizontalCenter,
} from "react-icons/bi";

import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

const ImageEditor = ({ params }) => {
  const {
    devtools,
    setDevtools,
    showModal,
    setShowModal,
    previewData,
    setPreviewData,
    undoHistory,
    setUndoHistory,
    redoHistory,
    setRedoHistory,
    router,
    canvasRef,
    imageData,
    handleTextAlignChange,
    handleTextDelete,
    handleUndo,
    handleRedo,
    handleSaveClick,
    multipleImageFontSizes,
    textStyles,
    setTextStyles,
    textStylesRef,
    selectedTextIndex,
    setSelectedTextIndex,
    editingTextIndex,
    setEditingTextIndex,
    selectedImage,
    setSelectedImage,
    selectedImageTextStyles,
    setSelectedImageTextStyles,
    handleImageClick,
    handleFontSizeChange,
    handleLeftChange,
    handleTopChange,
    incrementLeft,
    decrementLeft,
    incrementTop,
    decrementTop,
    incrementFontSize,
    decrementFontSize,
    handleTextChange,
    handleCanvasClick,
    handleTextDragStop,
    handleTextClick,
    handleMoveToXAxisLeft,
    handleCenterText,
    handleMoveToXAxisRight,
    handleMoveToYAxisTop,
    handleMoveToYAxisBottom,
    handleMoveToYAxisCenter,
    handleFontChange,
    lineHeight,
    handleLineHeightChange,
    letterSpacing,
    handleLetterSpacingChange,
    handleToggleDevtools,
    closePreviewModal,
    isPreviewModalOpen,
    setIsPreviewModalOpen,

    hoverX,
    setHoverX,
    hoverY,
    setHoverY,
    handleCanvasMouseMove,
    handleSaveAndPreviewClick,
    isLoaded,
    setIsLoaded,
  } = ImageEditorFunctions({ params, images });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    textStylesRef.current = textStyles;

    if (imageData.imageType === "multiple image") {
      const selectedImageData = imageData.images.find(
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
      image.src = imageData.url;

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
    setIsLoaded(true);
  }, [imageData, selectedImage, textStyles, hoverX, hoverY]);

  useEffect(() => {
    if (selectedTextIndex !== null) {
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      if (textElement) {
        const textWidth = textElement.getBoundingClientRect().width;
        const canvasWidth = canvasRef.current.width;
        setTextStyles((prevTextStyles) => {
          const updatedTextStyles = [...prevTextStyles];
          updatedTextStyles[selectedTextIndex].left = Math.min(
            canvasWidth - textWidth,
            updatedTextStyles[selectedTextIndex].left
          );
          return updatedTextStyles;
        });
      }
    }
  }, [selectedTextIndex]);

  const gridColumns = devtools ? "grid-cols-7" : "grid-cols-4";

  return (
    <>
      {!isLoaded && <LoadingOverlay name="Editor is Opening" />}
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
        <button
          className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
          onClick={handleToggleDevtools}
        >
          Devtools: {/* <span style={{ marginLeft: "10px" }}> */}
          {devtools ? "True" : "False"}
          {/* </span> */}
        </button>
        <h1 className="text-center text-3xl font-bold leading-5 mt-5">
          {imageData.title}
        </h1>

        {/* <h1>{hoverX}</h1>
        <h1>{hoverY}</h1> */}

        <div id="canvas" className="my-5" onClick={handleCanvasClick}>
          {selectedTextIndex !== null && (
            <div className="flex justify-center mt-4">
              <div
                key={selectedTextIndex}
                className={`grid gap-4 ${gridColumns} px-5 py-2 bg-white text-[#23272A] rounded border-black border`}
              >
                <div
                  className="flex flex-col justify-center align-center items-center cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  <button className="text-3xl">
                    <CiEdit />
                  </button>
                  <label
                    className="font-bold cursor-pointer"
                    htmlFor={`textInput-${selectedTextIndex}`}
                  >
                    Edit
                  </label>
                </div>

                <div className="flex flex-col justify-center  items-center text-left">
                  <label htmlFor={`fontSizeInput-${selectedTextIndex}`}>
                    Font Size:
                  </label>
                  <div className="flex">
                    <input
                      id={`fontSizeInput-${selectedTextIndex}`}
                      type="number"
                      value={
                        imageData.imageType === "multiple image"
                          ? selectedImageTextStyles[selectedTextIndex].fontSize
                          : textStyles[selectedTextIndex].fontSize
                      }
                      onChange={(e) =>
                        handleFontSizeChange(selectedTextIndex, e)
                      }
                      onInput={(e) =>
                        handleFontSizeChange(selectedTextIndex, e)
                      }
                      className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-16"
                      min="5"
                    />
                    {/* <div className="flex mt-2">
                      <button
                        onClick={() => incrementFontSize(selectedTextIndex)}
                        className="bg-gray-200 rounded px-2 py-1 mr-1"
                      >
                        +
                      </button>
                      <button
                        onClick={() => decrementFontSize(selectedTextIndex)}
                        className="bg-gray-200 rounded px-2 py-1"
                      >
                        -
                      </button>
                    </div> */}
                  </div>
                </div>

                {devtools && (
                  <>
                    <div className="flex flex-col justify-center align-center items-center cursor-pointer">
                      <label htmlFor={`leftInput-${selectedTextIndex}`}>
                        X-Axis:
                      </label>
                      <div className="flex">
                        <input
                          id={`leftInput-${selectedTextIndex}`}
                          type="number"
                          value={textStyles[selectedTextIndex].left}
                          onChange={(e) =>
                            handleLeftChange(selectedTextIndex, e)
                          }
                          className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-20"
                        />
                        {/* <div className="flex mt-2">
                          <button
                            onClick={() => incrementLeft(selectedTextIndex)}
                            className="bg-gray-200 rounded px-2 py-1 mr-1"
                          >
                            +
                          </button>
                          <button
                            onClick={() => decrementLeft(selectedTextIndex)}
                            className="bg-gray-200 rounded px-2 py-1"
                          >
                            -
                          </button>
                        </div> */}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center align-center items-center cursor-pointer">
                      <label htmlFor={`topInput-${selectedTextIndex}`}>
                        Y-Axis
                      </label>
                      <div className="flex">
                        <input
                          id={`topInput-${selectedTextIndex}`}
                          type="number"
                          value={textStyles[selectedTextIndex].top}
                          onChange={(e) =>
                            handleTopChange(selectedTextIndex, e)
                          }
                          className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-20"
                        />
                        {/* <div className="flex mt-2">
                          <button
                            onClick={() => incrementTop(selectedTextIndex)}
                            className="bg-gray-200 rounded px-2 py-1 mr-1"
                          >
                            +
                          </button>
                          <button
                            onClick={() => decrementTop(selectedTextIndex)}
                            className="bg-gray-200 rounded px-2 py-1"
                          >
                            -
                          </button>
                        </div> */}
                      </div>
                    </div>

                    <div className="flex flex-col text-center">
                      <label className="mb-2">Text Align </label>
                      <div>
                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 mr-2"
                          onClick={() => handleTextAlignChange("left")}
                        >
                          <FiAlignLeft /> {/* Use the Align Left Icon */}
                        </button>
                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 mr-2"
                          onClick={() => handleTextAlignChange("center")}
                        >
                          <FiAlignCenter /> {/* Use the Align Center Icon */}
                        </button>
                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
                          onClick={() => handleTextAlignChange("right")}
                        >
                          <FiAlignRight /> {/* Use the Align Right Icon */}
                        </button>
                      </div>
                    </div>

                    <div className="text-center flex flex-col justify-center items-center">
                      <label className="mb-2">Position (X-Axis)</label>
                      <div>
                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
                          onClick={() =>
                            handleMoveToXAxisLeft(selectedTextIndex, "left")
                          }
                        >
                          <BiArrowToLeft />
                        </button>

                        <button
                          onClick={handleCenterText}
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
                        >
                          <BiHorizontalCenter />
                        </button>

                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
                          onClick={handleMoveToXAxisRight}
                        >
                          <BiArrowToRight />
                        </button>
                      </div>
                    </div>

                    <div className="text-center flex flex-col justify-center items-center">
                      <label className="mb-2">Position (Y-Axis)</label>
                      <div>
                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 my-1"
                          onClick={handleMoveToYAxisTop}
                        >
                          <BiArrowToTop />
                        </button>
                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 my-1"
                          onClick={() =>
                            handleMoveToYAxisCenter(selectedTextIndex)
                          }
                        >
                          <BsArrowsCollapse />
                        </button>
                        <button
                          className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 my-1"
                          onClick={() =>
                            handleMoveToYAxisBottom(selectedTextIndex, "top")
                          }
                        >
                          <BiArrowToBottom />
                        </button>
                      </div>
                    </div>

                    <div className="font-dropdown text-center flex flex-col justify-center items-center">
                      <label htmlFor="font-select">Select Font:</label>
                      <div className="border border-black rounded-md px-2 py-2">
                        <select
                          id="font-select"
                          value={textStyles[selectedTextIndex].fontFamily}
                          onChange={(e) =>
                            handleFontChange(selectedTextIndex, e.target.value)
                          }
                        >
                          {fonts.map((font) => (
                            <option key={font.id} value={font.name}>
                              {font.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="text-center flex flex-col justify-center items-center">
                      <label className="mb-2">Line Height</label>
                      <div>
                        <input
                          type="number"
                          value={lineHeight}
                          onChange={(e) =>
                            handleLineHeightChange(parseFloat(e.target.value))
                          }
                          className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-16"
                          step="0.1"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="text-center flex flex-col justify-center items-center">
                      <label className="mb-2">Letter Spacing</label>
                      <div>
                        <input
                          type="number"
                          value={letterSpacing}
                          onChange={(e) =>
                            handleLetterSpacingChange(
                              parseFloat(e.target.value)
                            )
                          }
                          className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-16"
                          step="0.1"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center align-center items-center cursor-pointer">
                      <button
                        className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                    </div>

                    <div className="flex flex-col justify-center align-center items-center cursor-pointer">
                      <button
                        className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
                        onClick={handleRedo}
                      >
                        Redo
                      </button>
                    </div>
                  </>
                )}

                <div className="flex flex-col justify-center align-center items-center cursor-pointer">
                  <button
                    className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
                    onClick={handleUndo}
                  >
                    Undo
                  </button>
                </div>

                <div className="flex flex-col justify-center align-center items-center cursor-pointer">
                  <button
                    onClick={handleSaveAndPreviewClick}
                    className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
                  >
                    Save & Preview
                  </button>
                </div>
              </div>
            </div>
          )}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-3xl">
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-1xl font-semibold">
                        Update Your Text
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>

                    <div className="relative p-6 flex-auto">
                      <textarea
                        id={`textInput-${selectedTextIndex}`}
                        value={textStyles[selectedTextIndex].text}
                        onChange={(e) => handleTextChange(selectedTextIndex, e)}
                        className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-full resize-none"
                        style={{ whiteSpace: "pre-wrap" }}
                        rows={4} // Set the number of rows you want to display initially
                      />
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-[#23272A] text-white active:bg-[#23272A] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>

        <div className="relative">
          {isLoaded && (
            <>
              {textStyles.map((textStyle, index) => (
                <Draggable
                  key={index}
                  position={{ x: textStyle.left, y: textStyle.top }}
                  onStop={(e, data) => handleTextDragStop(index, data)}
                  bounds={{ left: 0, right: 900, top: 0, bottom: 1200 }}
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
                      cursor: "pointer",
                      textAlign: textStyle.textAlign,
                      lineHeight: textStyle.lineHeight || 1.5, // Set initial line height from JSON or default to 1.5
                      letterSpacing: textStyle.letterSpacing || 0,
                    }}
                    onClick={() => handleTextClick(index)}
                  >
                    {textStyle.text.split("\n").map((line, lineIndex) => (
                      <div
                        key={lineIndex}
                        style={{
                          color: textStyle.backgroundColor,
                          fontFamily: textStyle.fontFamily,
                          fontSize: `${textStyle.fontSize}px`,
                          textAlign: textStyle.textAlign, // Center align the text
                          // left: textStyle.left, // Set initial letter spacing from JSON or default to 0
                          // top: textStyle.top, // Set initial letter spacing from JSON or default to 0
                        }}
                      >
                        {line}
                      </div>
                    ))}
                    {textStyle.isSelected && ( // Only display the close icon if the text is selected
                      <button
                        className="absolute top-0 right-0 -mt-4 -mr-4 p-1 text-red-600 bg-white rounded-full border border-gray-300 focus:outline-none"
                        onClick={(e) => handleTextDelete(e, index)}
                      >
                        <IoCloseSharp size={20} />
                      </button>
                    )}
                  </div>
                </Draggable>
              ))}{" "}
            </>
          )}
          <canvas
            ref={canvasRef}
            className="border border-gray-500"
            width={900}
            height={1200}
            onMouseMove={handleCanvasMouseMove}
          ></canvas>
        </div>

        {imageData && imageData.imageType === "multiple image" && (
          <div className="flex justify-center mt-4">
            {imageData.images.map((image, index) => (
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

        {isPreviewModalOpen && (
          <PreviewModal previewData={previewData} onClose={closePreviewModal} />
        )}
      </div>

      <Footer />
    </>
  );
};

export default ImageEditor;
