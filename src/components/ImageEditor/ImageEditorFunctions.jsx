"use client";

import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

import { useRouter } from "next/navigation";

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

const ImageEditorFunctions = ({ params, images }) => {
  const [devtools, setDevtools] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleToggleDevtools = () => {
    setDevtools((prevDevtools) => !prevDevtools);
  };

  const router = useRouter();
  const canvasRef = useRef(null);
  const imageData = images.find((image) => image.id === parseInt(params.id));

  const handleTextAlignChange = (alignment) => {
    if (selectedTextIndex !== null) {
      const updatedTextStyles = [...textStyles];
      updatedTextStyles[selectedTextIndex].textAlign = alignment;
      setTextStyles(updatedTextStyles);

      setUndoHistory([...undoHistory, textStylesRef.current]);
    }
  };

  const handleTextDelete = (e, index) => {
    e.stopPropagation();
    setTextStyles((prevTextStyles) =>
      prevTextStyles.map((style, i) => ({
        ...style,
        isSelected: false,
      }))
    );

    setTextStyles((prevTextStyles) =>
      prevTextStyles.filter((_, i) => i !== index)
    );

    setUndoHistory([...undoHistory, textStylesRef.current]);
  };

  const handleUndo = () => {
    if (undoHistory.length > 0) {
      const prevTextStyles = undoHistory.pop();
      setRedoHistory([...redoHistory, textStylesRef.current]);
      setTextStyles(prevTextStyles);
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      const nextTextStyles = redoHistory.pop();
      setUndoHistory([...undoHistory, textStylesRef.current]);
      setTextStyles(nextTextStyles);
    }
  };

  const multipleImageFontSizes =
    imageData.imageType === "multiple image"
      ? imageData.images.map((image) =>
          image.textStyles.map((textStyle) => textStyle.fontSize)
        )
      : [];

  const [textStyles, setTextStyles] = useState(
    imageData?.textStyles?.map((textStyle) => ({
      ...textStyle,
      fontSize: parseInt(textStyle.fontSize),
    })) || []
  );

  const textStylesRef = useRef(textStyles);

  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [editingTextIndex, setEditingTextIndex] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    imageData?.images ? imageData.images[0].url : null
  );

  const [selectedImageTextStyles, setSelectedImageTextStyles] = useState(
    imageData?.images ? imageData.images[0].textStyles : []
  );

  const handleImageClick = (url) => {
    setSelectedImage(url);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const selectedImageData = imageData.images.find(
      (image) => image.url === url
    );
    const image = document.createElement("img");
    image.src = url;
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
  };

  // Rest of the functions from the ImageEditor component...
  const handleFontSizeChange = (index, e) => {
    const fontSize = parseInt(e.target.value);

    if (!isNaN(fontSize)) {
      const updatedTextStyles = textStyles.map((textStyle, i) => {
        if (i === index) {
          return {
            ...textStyle,
            fontSize,
          };
        }
        return textStyle;
      });

      setTextStyles(updatedTextStyles);

      if (imageData.imageType === "multiple image") {
        const selectedImageData = imageData.images.find(
          (img) => img.url === selectedImage
        );
        selectedImageData.textStyles = updatedTextStyles;
        setSelectedImageTextStyles(updatedTextStyles);
      }
    }
  };

  const handleLeftChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: parseInt(e.target.value),
    };
    setTextStyles(updatedTextStyles);
  };

  const handleTopChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: parseInt(e.target.value),
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementLeft = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: updatedTextStyles[index].left + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementLeft = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: updatedTextStyles[index].left - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementTop = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: updatedTextStyles[index].top + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementTop = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: updatedTextStyles[index].top - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementFontSize = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      fontSize: updatedTextStyles[index].fontSize + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementFontSize = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      fontSize: updatedTextStyles[index].fontSize - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const handleTextChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      text: e.target.value,
    };
    setTextStyles(updatedTextStyles);

    if (imageData.imageType === "multiple image") {
      const selectedImageData = imageData.images.find(
        (img) => img.url === selectedImage
      );
      selectedImageData.textStyles = updatedTextStyles;
      setSelectedImageTextStyles(updatedTextStyles);
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = document.getElementById("canvas");
    if (!canvas.contains(e.target)) {
      setSelectedTextIndex(null);
    }
  };

  const handleTextDragStop = (index, data) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: data.x,
      top: data.y,
    };
    setTextStyles(updatedTextStyles);
    setUndoHistory([...undoHistory, textStylesRef.current]);

    if (imageData.imageType === "multiple image") {
      const selectedImageData = imageData.images.find(
        (img) => img.url === selectedImage
      );
      selectedImageData.textStyles = updatedTextStyles;
    }
  };

  const handleMoveToXAxisLeft = (index, axis) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      [axis]: 0,
    };
    setTextStyles(updatedTextStyles);
  };

  const handleCenterText = () => {
    const updatedTextStyles = [...textStyles];
    const canvasWidth = canvasRef.current.offsetWidth;

    if (selectedTextIndex !== null) {
      const selectedTextStyle = textStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textWidth = textElement.getBoundingClientRect().width;

      updatedTextStyles[selectedTextIndex].left = Math.max(
        (canvasWidth - textWidth) / 2,
        0
      );
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToXAxisRight = () => {
    const updatedTextStyles = [...textStyles];
    const canvasWidth = canvasRef.current.offsetWidth;

    if (selectedTextIndex !== null) {
      const selectedTextStyle = textStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textWidth = textElement.getBoundingClientRect().width;

      updatedTextStyles[selectedTextIndex].left = Math.max(
        canvasWidth - textWidth,
        0
      );
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToYAxisTop = () => {
    if (selectedTextIndex !== null) {
      const updatedTextStyles = [...textStyles];
      updatedTextStyles[selectedTextIndex] = {
        ...updatedTextStyles[selectedTextIndex],
        top: -1202,
      };
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToYAxisCenter = (selectedTextIndex) => {
    const updatedTextStyles = [...textStyles];
    const canvasHeight = -canvasRef.current.offsetHeight;

    if (selectedTextIndex !== null) {
      const selectedTextStyle = textStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textHeight = textElement.getBoundingClientRect().height;

      console.log(textHeight, "textHeight");
      console.log(canvasHeight, "canvasHeight");
      console.log(canvasHeight + textHeight, "canvasHeight + textHeight");
      console.log(
        (canvasHeight + textHeight) / 2 + textHeight,
        "(canvasHeight + textHeight)/2"
      );
      // updatedTextStyles[selectedTextIndex].top =
      //   (canvasHeight + textHeight) / 2 + textHeight;

      const newY = (canvasHeight + textHeight) / 2 - textHeight;

      console.log(newY, "newY");
      updatedTextStyles[selectedTextIndex] = {
        ...updatedTextStyles[selectedTextIndex],
        top: newY,
      };
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToYAxisBottom = (index, axis) => {
    if (selectedTextIndex !== null) {
      const updatedTextStyles = [...textStyles];
      const canvasHeight = canvasRef.current.offsetHeight;
      const selectedTextStyle = updatedTextStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textHeight = textElement.getBoundingClientRect().height;

      // Calculate the new y position to move to the bottom without crossing the border
      const newY = 0 - textHeight;

      console.log(newY);

      updatedTextStyles[selectedTextIndex] = {
        ...selectedTextStyle,
        [axis]: newY,
      };
      setTextStyles(updatedTextStyles);
    }
  };

  // Function to handle font change
  const handleFontChange = (index, selectedFont) => {
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = [...prevTextStyles];
      updatedTextStyles[index].fontFamily = selectedFont;
      return updatedTextStyles;
    });
  };

  const handleTextClick = (index) => {
    const selectedTextStyle = textStyles[index];
    const lines = selectedTextStyle.text.split("\n");
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = prevTextStyles.map((style, i) => ({
        ...style,
        isSelected: index === i,
      }));
      setSelectedTextIndex(index);
      setLineHeight(selectedTextStyle.lineHeight || 1.5); // Set initial line height from JSON or default to 1.5
      setLetterSpacing(selectedTextStyle.letterSpacing || 0); // Set initial letter spacing from JSON or default to 0
      return updatedTextStyles;
    });
  };

  // Function to handle line height change
  const handleLineHeightChange = (lineHeightValue) => {
    setLineHeight(lineHeightValue);
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = [...prevTextStyles];
      updatedTextStyles[selectedTextIndex].lineHeight = lineHeightValue;
      return updatedTextStyles;
    });
  };

  // Function to handle letter spacing change
  const handleLetterSpacingChange = (letterSpacingValue) => {
    setLetterSpacing(letterSpacingValue);
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = [...prevTextStyles];
      updatedTextStyles[selectedTextIndex].letterSpacing = letterSpacingValue;
      return updatedTextStyles;
    });
  };

  const handleSaveClick = () => {
    let previewData = null;
    if (imageData.imageType === "single image") {
      previewData = {
        id: imageData.id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        url: imageData.url,
        imageType: imageData.imageType,
        price: imageData.price,
        buttonText: imageData.buttonText,
        cardType: imageData.cardType,
        popularity: imageData.popularity,
        description: imageData.description,
        cardCategory: imageData.cardCategory,
        textStyles: textStyles.map((textStyle) => ({
          id: textStyle.id,
          text: textStyle.text,
          left: textStyle.left,
          top: textStyle.top,
          color: textStyle.color,
          fontSize: textStyle.fontSize,
          backgroundColor: textStyle.backgroundColor,
          padding: textStyle.padding,
          fontFamily: textStyle.fontFamily,
          textAlign: textStyle.textAlign,
          lineHeight: textStyle.lineHeight,
          letterSpacing: textStyle.letterSpacing,
        })),
      };
    } else if (imageData.imageType === "multiple image") {
      previewData = {
        id: imageData.id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        url: imageData.url,
        imageType: imageData.imageType,
        price: imageData.price,
        buttonText: imageData.buttonText,
        cardType: imageData.cardType,
        popularity: imageData.popularity,
        description: imageData.description,
        cardCategory: imageData.cardCategory,
        images: imageData.images.map((image) => ({
          id: image.id,
          url: image.url,
          textStyles: image.textStyles.map((textStyle) => ({
            id: textStyle.id,
            text: textStyle.text,
            left: textStyle.left,
            top: textStyle.top,
            color: textStyle.color,
            fontSize: textStyle.fontSize,
            backgroundColor: textStyle.backgroundColor,
            padding: textStyle.padding,
            fontFamily: textStyle.fontFamily,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight,
            letterSpacing: textStyle.letterSpacing,
          })),
        })),
      };
    }

    localStorage.setItem("previewData", JSON.stringify(previewData));
    // window.location.href = "/preview";
    setPreviewData(previewData);
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  return {
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
  };
};

export default ImageEditorFunctions;