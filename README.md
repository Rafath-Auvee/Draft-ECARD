Only start the text from the X and Y co ordination and ends until text height and weight reaches. Make a invisible reactangle boundary. In that boundary text alignment will change. So that their position won't change.

keep the react draggable for dragging. but not for x and y co ordinates . X and y depend on canvas co ordinates

The value I was getting for X and Y for selected Text was in the ImageEditor because React Draggable but I don't want that.

 I want X and Y value for Selected Text according to Canvas Height and Weight not react draggable position. 

I will use react draggable for dragging in the canvas. But the x and y depend on canvas co ordinates not the react draggable co ordinates

text will remain in the canvas. They won't outside canvas. If they go outside canvas then their default co ordinates will 100,100


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
  const { editorPreviewData, setEditorPreviewData } = usePreviewDataContext();
  const { title, url, imageType, textStyles } = editorPreviewData || {};

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
          context.textAlign = textAlign;

          context.lineHeight = lineHeight || 1.5;
          context.letterSpacing = letterSpacing || 0;

          const lines = text.split("\n");

          const totalTextHeight = lines.length * fontSize * context.lineHeight;
          let y = top;

          

          lines.forEach((line, index) => {
            const lineY = y + index * (fontSize * context.lineHeight);
            context.fillText(line, left, lineY);
          });
        });
      };
    }
  }, [editorPreviewData, hoverX, hoverY]);

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
            onMouseMove={handleCanvasMouseMove}
          ></canvas>

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
   

      </div>

      <Footer />
    </>
  );
};

export default Preview;


text position change from it's initial x and y position because of textAlign. I don't want that. I want to start text position from it's initial left value and end where text width ends. and perform text align within it's position

Implement this in useEffect. 



  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const renderImage = () => {
      const image = document.createElement("img");
      image.src = previewData.url;

      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        renderTextStyles();
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
        context.textAlign = textAlign;

        context.lineHeight = lineHeight || 1.5;
        context.letterSpacing = letterSpacing || 0;

        const lines = text.split("\n");

        const totalTextHeight = lines.length * fontSize * context.lineHeight;
        let y = top;

        lines.forEach((line, index) => {
          const lineY = y + index * (fontSize * context.lineHeight);
          context.fillText(line, left, lineY);
        });
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
        renderImage();
      }
    }
  }, [previewData]);