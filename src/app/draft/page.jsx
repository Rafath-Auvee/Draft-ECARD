// "use client";
// import Draggable from "react-draggable";
// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import images from "../../../Data/Draft_Data";
// import { CiEdit } from "react-icons/ci";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Toaster } from "react-hot-toast";
// import Footer from "@/components/Footer/Footer";
// import Navbar from "@/components/Navbar/Navbar";
// import draft from "@/Data/Draft_Data";
// import {
// FiAlignLeft, FiAlignCenter, FiAlignRight, FiArrowDown, FiArrowUp, FiArrowRight, FiArrowLeft
// } from "react-icons/fi";

// import {
//   BsArrowsCollapse,
// } from "react-icons/bs";
// import {
//   BiArrowToLeft,
//   BiArrowToRight,
//   BiArrowToTop,
//   BiArrowToBottom,
//   BiHorizontalCenter
// } from "react-icons/bi";

// const ImageEditor = ({ params }) => {
//   const [devtools, setDevtools] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [previewData, setPreviewData] = useState(null);
//   const router = useRouter();
//   const canvasRef = useRef(null);
//   const imageData = images.find((image) => image.id === parseInt(params.id));

//   const handleTextAlignChange = (alignment) => {
//     if (selectedTextIndex !== null) {
//       const updatedTextStyles = [...textStyles];
//       updatedTextStyles[selectedTextIndex].textAlign = alignment;
//       setTextStyles(updatedTextStyles);
//     }
//   };

//   const handleSaveClick = () => {
//     let previewData = null; // Declare the previewData variable outside the conditional statements

//     if (imageData.imageType === "single image") {
//       previewData = {
//         url: imageData.url,
//         imageType: imageData.imageType,
//         textStyles: textStyles.map((textStyle) => ({
//           id: textStyle.id,
//           text: textStyle.text,
//           left: textStyle.left,
//           top: textStyle.top,
//           color: textStyle.color,
//           fontSize: textStyle.fontSize,
//           backgroundColor: textStyle.backgroundColor,
//           padding: textStyle.padding,
//         })),
//       };
//     } else if (imageData.imageType === "multiple image") {
//       previewData = {
//         imageType: imageData.imageType,
//         images: imageData.images.map((image) => ({
//           id: image.id,
//           url: image.url,
//           textStyles: image.textStyles.map((textStyle) => ({
//             id: textStyle.id,
//             text: textStyle.text,
//             left: textStyle.left,
//             top: textStyle.top,
//             color: textStyle.color,
//             fontSize: textStyle.fontSize,
//             backgroundColor: textStyle.backgroundColor,
//             padding: textStyle.padding,
//           })),
//         })),
//       };
//     }

//     localStorage.setItem("previewData", JSON.stringify(previewData));
//     // Save the preview data in localStorage

//     // Navigate to the "/preview" page
//     window.location.href = "/preview";
//   };

//   const multipleImageFontSizes =
//     imageData.imageType === "multiple image"
//       ? imageData.images.map((image) =>
//           image.textStyles.map((textStyle) => textStyle.fontSize)
//         )
//       : [];

//   // Add a conditional check for imageData before accessing its properties
//   const [textStyles, setTextStyles] = useState(
//     imageData?.textStyles?.map((textStyle) => ({
//       ...textStyle,
//       fontSize: parseInt(textStyle.fontSize),
//     })) || []
//   );
//   const [selectedTextIndex, setSelectedTextIndex] = useState(null);
//   const [editingTextIndex, setEditingTextIndex] = useState(null);

//   const [selectedImage, setSelectedImage] = useState(
//     imageData?.images ? imageData.images[0].url : null
//   );

//   const [selectedImageTextStyles, setSelectedImageTextStyles] = useState(
//     imageData?.images ? imageData.images[0].textStyles : []
//   );

//   const handleImageClick = (url) => {
//     setSelectedImage(url);

//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     const selectedImageData = imageData.images.find(
//       (image) => image.url === url
//     );

//     const image = document.createElement("img"); // Create an HTMLImageElement
//     image.src = url;

//     image.onload = () => {
//       // Clear the canvas
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw the image on the canvas
//       context.drawImage(image, 0, 0, canvas.width, canvas.height);

//       // Loop through the text styles of the selected image and draw the overlay markers on the canvas
//       selectedImageData.textStyles.forEach((textStyle) => {
//         context.fillStyle = textStyle.backgroundColor;
//         context.fillRect(
//           textStyle.left,
//           textStyle.top,
//           textStyle.width,
//           textStyle.height
//         );
//       });

//       // Update the textStyles state with the initial textStyles of the selected image
//       setTextStyles(
//         selectedImageData.textStyles.map((textStyle) => ({
//           ...textStyle,
//           fontSize: parseInt(textStyle.fontSize),
//         }))
//       );

//       // Update the selectedImageTextStyles state with the initial textStyles of the selected image
//       setSelectedImageTextStyles(selectedImageData.textStyles);
//     };
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     if (imageData.imageType === "multiple image") {
//       const selectedImageData = imageData.images.find(
//         (image) => image.url === selectedImage
//       );

//       if (selectedImageData) {
//         const image = document.createElement("img"); // Create a new instance of HTMLImageElement
//         image.src = selectedImage;

//         image.onload = () => {
//           // Clear the canvas
//           context.clearRect(0, 0, canvas.width, canvas.height);

//           // Draw the image on the canvas
//           context.drawImage(image, 0, 0, canvas.width, canvas.height);

//           // Loop through the text styles of the selected image and draw the overlay markers on the canvas
//           selectedImageData.textStyles.forEach((textStyle) => {
//             context.fillStyle = textStyle.backgroundColor;
//             context.fillRect(
//               textStyle.left,
//               textStyle.top,
//               textStyle.width,
//               textStyle.height
//             );
//           });

//           // Update the textStyles state with the initial textStyles of the selected image
//           setTextStyles(
//             selectedImageData.textStyles.map((textStyle) => ({
//               ...textStyle,
//               fontSize: parseInt(textStyle.fontSize),
//             }))
//           );

//           // Update the selectedImageTextStyles state with the initial textStyles of the selected image
//           setSelectedImageTextStyles(selectedImageData.textStyles);
//         };
//       }
//     } else {
//       const image = document.createElement("img"); // Create a new instance of HTMLImageElement
//       image.src = imageData.url;

//       image.onload = () => {
//         // Draw the image on the canvas
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Loop through the text styles and draw the overlay markers on the canvas
//         textStyles.forEach((textStyle) => {
//           context.fillStyle = textStyle.backgroundColor;
//           context.fillRect(
//             textStyle.left,
//             textStyle.top,
//             textStyle.width,
//             textStyle.height
//           );
//         });
//       };
//     }
//   }, [imageData, selectedImage, textStyles]);

//   const handleFontSizeChange = (index, e) => {
//     const fontSize = parseInt(e.target.value);

//     if (!isNaN(fontSize)) {
//       const updatedTextStyles = textStyles.map((textStyle, i) => {
//         if (i === index) {
//           return {
//             ...textStyle,
//             fontSize,
//           };
//         }
//         return textStyle;
//       });

//       setTextStyles(updatedTextStyles);

//       if (imageData.imageType === "multiple image") {
//         const selectedImageData = imageData.images.find(
//           (img) => img.url === selectedImage
//         );
//         selectedImageData.textStyles = updatedTextStyles;
//         setSelectedImageTextStyles(updatedTextStyles);
//       }
//     }
//   };

//   const handleLeftChange = (index, e) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       left: parseInt(e.target.value),
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const handleTopChange = (index, e) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       top: parseInt(e.target.value),
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const incrementLeft = (index) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       left: updatedTextStyles[index].left + 1,
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const decrementLeft = (index) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       left: updatedTextStyles[index].left - 1,
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const incrementTop = (index) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       top: updatedTextStyles[index].top + 1,
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const decrementTop = (index) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       top: updatedTextStyles[index].top - 1,
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const incrementFontSize = (index) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       fontSize: updatedTextStyles[index].fontSize + 1,
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const decrementFontSize = (index) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       fontSize: updatedTextStyles[index].fontSize - 1,
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   // Text Changing Function

//   const handleTextChange = (index, e) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       text: e.target.value,
//     };
//     setTextStyles(updatedTextStyles);

//     if (imageData.imageType === "multiple image") {
//       const selectedImageData = imageData.images.find(
//         (img) => img.url === selectedImage
//       );
//       selectedImageData.textStyles = updatedTextStyles;

//       // Update the selectedImageTextStyles state with the updated textStyles of the selected image
//       setSelectedImageTextStyles(updatedTextStyles);
//     }
//   };

//   const handleCanvasClick = (e) => {
//     const canvas = document.getElementById("canvas");
//     if (!canvas.contains(e.target)) {
//       setSelectedTextIndex(null);
//     }
//   };

//   // Function to handle text element drag stop
//   const handleTextDragStop = (index, data) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       left: data.x,
//       top: data.y,
//     };
//     setTextStyles(updatedTextStyles);

//     if (imageData.imageType === "multiple image") {
//       const selectedImageData = imageData.images.find(
//         (img) => img.url === selectedImage
//       );
//       selectedImageData.textStyles = updatedTextStyles;
//     }
//   };

//   // Function to handle text element click
//   const handleTextClick = (index) => {
//     const selectedTextStyle = textStyles[index];
//     const lines = selectedTextStyle.text.split("\n");
//     setTextStyles((prevTextStyles) => {
//       const updatedTextStyles = prevTextStyles.map((style, i) => ({
//         ...style,
//         isSelected: index === i,
//       }));
//       setSelectedTextIndex(index);
//       return updatedTextStyles;
//     });
//   };

//   const handleMoveToXAxisLeft = (index, axis) => {
//     const updatedTextStyles = [...textStyles];
//     updatedTextStyles[index] = {
//       ...updatedTextStyles[index],
//       [axis]: 0,
//     };
//     setTextStyles(updatedTextStyles);
//   };

//   const handleCenterText = () => {
//     const updatedTextStyles = [...textStyles];
//     const canvasWidth = canvasRef.current.offsetWidth;

//     if (selectedTextIndex !== null) {
//       const selectedTextStyle = textStyles[selectedTextIndex];
//       const textElement = document.getElementById(
//         `textElement_${selectedTextIndex}`
//       );
//       const textWidth = textElement.getBoundingClientRect().width;

//       updatedTextStyles[selectedTextIndex].left = Math.max(
//         (canvasWidth - textWidth) / 2,
//         0
//       );
//       setTextStyles(updatedTextStyles);
//     }
//   };

//   const handleCenterTextYAxis = () => {
//     const updatedTextStyles = [...textStyles];

//     if (selectedTextIndex !== null) {
//       const selectedTextStyle = textStyles[selectedTextIndex];
//       const textElement = document.getElementById(
//         `textElement_${selectedTextIndex}`
//       );
//       const canvasHeight = canvasRef.current.offsetHeight;
//       const textHeight = textElement.getBoundingClientRect().height;

//       updatedTextStyles[selectedTextIndex].top =
//         (canvasHeight - textHeight) / 2;
//       setTextStyles(updatedTextStyles);
//     }
//   };

//   // Function to move selected text to the right (horizontally)
//   const handleMoveToXAxisRight = () => {
//     const updatedTextStyles = [...textStyles];
//     const canvasWidth = canvasRef.current.offsetWidth;

//     if (selectedTextIndex !== null) {
//       const selectedTextStyle = textStyles[selectedTextIndex];
//       const textElement = document.getElementById(
//         `textElement_${selectedTextIndex}`
//       );
//       const textWidth = textElement.getBoundingClientRect().width;

//       updatedTextStyles[selectedTextIndex].left = Math.max(
//         canvasWidth - textWidth,
//         0
//       );
//       setTextStyles(updatedTextStyles);
//     }
//   };

//   // useEffect hook to update the text element after component mount and selectedTextIndex changes
//   useEffect(() => {
//     if (selectedTextIndex !== null) {
//       const textElement = document.getElementById(
//         `textElement_${selectedTextIndex}`
//       );
//       if (textElement) {
//         const textWidth = textElement.getBoundingClientRect().width;
//         const canvasWidth = canvasRef.current.width;
//         setTextStyles((prevTextStyles) => {
//           const updatedTextStyles = [...prevTextStyles];
//           updatedTextStyles[selectedTextIndex].left = Math.min(
//             canvasWidth - textWidth,
//             updatedTextStyles[selectedTextIndex].left
//           );
//           return updatedTextStyles;
//         });
//       }
//     }
//   }, [selectedTextIndex]);

//   // modal close & open
//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
//         <h1 className="text-center text-3xl font-bold leading-5 mt-5">
//           {/* Image Editor
//            */}
//            {imageData.title}
//         </h1>
//         {/* {selectedTextIndex !== null && (
//         <p>Selected Text: {textStyles[selectedTextIndex].text}</p>
//       )} */}

//         <div id="canvas" className="my-5" onClick={handleCanvasClick}>
//           {/* Your canvas content */}
//           {selectedTextIndex !== null && (
//             <div className="flex justify-center mt-4">
//               <div
//                 key={selectedTextIndex}
//                 className={`grid gap-4 grid-cols-3 px-5 py-2 bg-white text-[#23272A] rounded border-black border`}
//               >
//                 <div
//                   className="flex flex-col justify-center align-center items-center cursor-pointer"
//                   onClick={() => setShowModal(true)}
//                 >
//                   <button className="text-3xl">
//                     <CiEdit />
//                   </button>
//                   <label
//                     className="font-bold cursor-pointer"
//                     htmlFor={`textInput-${selectedTextIndex}`}
//                   >
//                     Edit
//                   </label>
//                   <div className="flex">
//                     {/* {showModal ? (
//                     <input
//                       id={`textInput-${selectedTextIndex}`}
//                       type="text"
//                       value={textStyles[selectedTextIndex].text}
//                       onChange={(e) => handleTextChange(selectedTextIndex, e)}
//                       className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
//                     />
//                   ) : (
//                     <button onClick={() => setShowModal(true)}>
//                       Edit Text
//                     </button>
//                   )} */}
//                   </div>
//                 </div>

//                 {/* left and top position  */}
//                 {devtools && (
//                   <>
//                     <div>
//                       <label htmlFor={`leftInput-${selectedTextIndex}`}>
//                         X-Axis:
//                       </label>
//                       <div className="flex">
//                         <input
//                           id={`leftInput-${selectedTextIndex}`}
//                           type="number"
//                           value={textStyles[selectedTextIndex].left}
//                           onChange={(e) =>
//                             handleLeftChange(selectedTextIndex, e)
//                           }
//                           className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-20"
//                         />
//                         <div className="flex mt-2">
//                           <button
//                             onClick={() => incrementLeft(selectedTextIndex)}
//                             className="bg-gray-200 rounded px-2 py-1 mr-1"
//                           >
//                             +
//                           </button>
//                           <button
//                             onClick={() => decrementLeft(selectedTextIndex)}
//                             className="bg-gray-200 rounded px-2 py-1"
//                           >
//                             -
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor={`topInput-${selectedTextIndex}`}>
//                         Y-Axis
//                       </label>
//                       <div className="flex">
//                         <input
//                           id={`topInput-${selectedTextIndex}`}
//                           type="number"
//                           value={textStyles[selectedTextIndex].top}
//                           onChange={(e) =>
//                             handleTopChange(selectedTextIndex, e)
//                           }
//                           className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-20"
//                         />
//                         <div className="flex mt-2">
//                           <button
//                             onClick={() => incrementTop(selectedTextIndex)}
//                             className="bg-gray-200 rounded px-2 py-1 mr-1"
//                           >
//                             +
//                           </button>
//                           <button
//                             onClick={() => decrementTop(selectedTextIndex)}
//                             className="bg-gray-200 rounded px-2 py-1"
//                           >
//                             -
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex flex-col text-center">
//                       <label className="mb-2">Text Align </label>
//                       <div>
//                         <button
//                           className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 mr-2"
//                           onClick={() => handleTextAlignChange("left")}
//                         >
//                           <FiAlignLeft /> {/* Use the Align Left Icon */}
//                         </button>
//                         <button
//                           className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 mr-2"
//                           onClick={() => handleTextAlignChange("center")}
//                         >
//                           <FiAlignCenter /> {/* Use the Align Center Icon */}
//                         </button>
//                         <button
//                           className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
//                           onClick={() => handleTextAlignChange("right")}
//                         >
//                           <FiAlignRight /> {/* Use the Align Right Icon */}
//                         </button>
//                       </div>
//                     </div>

//                     <div className="text-center flex flex-col justify-center items-center">
//   <label className="mb-2">Position (X-Axis)</label>
//   <div>
//     <button
//       className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
//       onClick={() =>
//         handleMoveToXAxisLeft(selectedTextIndex, "left")
//       }
//     >
//       <BiArrowToLeft /> 
//     </button>

//     <button
//       onClick={handleCenterText}
//       className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
//     >
//       <BiHorizontalCenter />
//     </button>

//     <button
//       className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2"
//       onClick={handleMoveToXAxisRight}
//     >
//       <BiArrowToRight />
//     </button>
//   </div>
// </div>

// <div className="text-center flex flex-col justify-center items-center">
//   <label className="mb-2">Position (Y-Axis)</label>
//   <div>
//     <button className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 my-1">
//       <BiArrowToTop />
//     </button>

//     <button
//       onClick={handleCenterTextYAxis}
//       className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 my-1"
//     >
//       <BsArrowsCollapse  />
//     </button>

//     <button className="bg-primary text-white mb-2 px-3 py-3 text-1xl mx-2 my-1">
//       <BiArrowToBottom />
//     </button>
//   </div>
// </div>

//                   </>
//                 )}

//                 <div className="flex flex-col justify-center  items-center text-left">
//                   <label htmlFor={`fontSizeInput-${selectedTextIndex}`}>
//                     Font Size:
//                   </label>
//                   <div className="flex">
//                     <input
//                       id={`fontSizeInput-${selectedTextIndex}`}
//                       type="number"
//                       value={
//                         imageData.imageType === "multiple image"
//                           ? selectedImageTextStyles[selectedTextIndex].fontSize
//                           : textStyles[selectedTextIndex].fontSize
//                       }
//                       onChange={(e) =>
//                         handleFontSizeChange(selectedTextIndex, e)
//                       }
//                       onInput={(e) =>
//                         handleFontSizeChange(selectedTextIndex, e)
//                       }
//                       className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-16"
//                       min="5" // Add this line to prevent negative values
//                     />

//                     <div className="flex mt-2">
//                       <button
//                         onClick={() => incrementFontSize(selectedTextIndex)}
//                         className="bg-gray-200 rounded px-2 py-1 mr-1"
//                       >
//                         +
//                       </button>
//                       <button
//                         onClick={() => decrementFontSize(selectedTextIndex)}
//                         className="bg-gray-200 rounded px-2 py-1"
//                       >
//                         -
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col justify-center align-center items-center cursor-pointer">
//                   <button
//                     className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
//                     onClick={handleSaveClick}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {showModal ? (
//             <>
//               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-3xl">
//                 <div className="relative w-full my-6 mx-auto max-w-3xl">
//                   {/*content*/}
//                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                     {/*header*/}
//                     <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                       <h3 className="text-1xl font-semibold">
//                         Update Your Text
//                       </h3>
//                       <button
//                         className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                         onClick={() => setShowModal(false)}
//                       >
//                         <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                           ×
//                         </span>
//                       </button>
//                     </div>
//                     {/*body*/}
//                     <div className="relative p-6 flex-auto">
//                       {/* <input
//                         id={`textInput-${selectedTextIndex}`}
//                         type="text"
//                         value={textStyles[selectedTextIndex].text}
//                         onChange={(e) => handleTextChange(selectedTextIndex, e)}
//                         className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-full"
//                         style={{ whiteSpace: "pre-wrap" }}
//                       /> */}
//                       <textarea
//                         id={`textInput-${selectedTextIndex}`}
//                         value={textStyles[selectedTextIndex].text}
//                         onChange={(e) => handleTextChange(selectedTextIndex, e)}
//                         className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-full resize-none"
//                         style={{ whiteSpace: "pre-wrap" }}
//                         rows={4} // Set the number of rows you want to display initially
//                       />
//                     </div>
//                     {/*footer*/}
//                     <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//                       <button
//                         className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                         type="button"
//                         onClick={() => setShowModal(false)}
//                       >
//                         Close
//                       </button>
//                       <button
//                         className="bg-[#23272A] text-white active:bg-[#23272A] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                         type="button"
//                         onClick={() => setShowModal(false)}
//                       >
//                         Update
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//             </>
//           ) : null}
//         </div>

//         {/* canvas and textStyles  */}

//         <div className="relative">
//           <canvas
//             ref={canvasRef}
//             className="border border-gray-500"
//             width={900}
//             height={1200}
//           ></canvas>
//           {textStyles.map((textStyle, index) => (
//             <Draggable
//               key={index}
//               position={{ x: textStyle.left, y: textStyle.top }}
//               onStop={(e, data) => handleTextDragStop(index, data)}
//               bounds="parent"
//             >
//               <div
//                 id={`textElement_${index}`} // Set a unique ID for each text element
//                 className={`absolute ${
//                   textStyle.isSelected
//                     ? "border-gray-500  border-2 border-dashed"
//                     : ""
//                 }`}
//                 style={{
//                   whiteSpace: "pre-wrap",
//                   cursor: "pointer",
//                   textAlign: textStyle.textAlign,
//                 }}
//                 onClick={() => handleTextClick(index)}
//               >
//                 {textStyle.text.split("\n").map((line, lineIndex) => (
//                   <div
//                     key={lineIndex}
//                     style={{
//                       color: textStyle.backgroundColor,
//                       fontFamily: textStyle.fontFamily,
//                       fontSize: `${textStyle.fontSize}px`,
//                       textAlign: textStyle.textAlign, // Center align the text
//                     }}
//                   >
//                     {line}
//                   </div>
//                 ))}
//               </div>
//             </Draggable>
//           ))}
//         </div>

//         {imageData && imageData.imageType === "multiple image" && (
//           <div className="flex justify-center mt-4">
//             {imageData.images.map((image, index) => (
//               <div className="flex flex-col text-center mx-3" key={index}>
//                 <Image
//                   width={0}
//                   height={0}
//                   key={image.id}
//                   src={image.url}
//                   alt={`Image ${image.id}`}
//                   className={`w-16 h-16 mx-1 cursor-pointer ${
//                     selectedImage === image.url
//                       ? "border-2 border-blue-500"
//                       : ""
//                   }`}
//                   onClick={() => handleImageClick(image.url)}
//                 />
//                 <p>Page {index + 1}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* <PreviewCard imageData={previewData} /> */}

//         {/* <PreviewCard imageData={previewData} /> */}
//         {/* {imageData.imageType === "multiple image" && (
//         <div className="mt-4">
//           <h3 className="text-xl font-bold">Font Sizes:</h3>
//           <ul>
//             {multipleImageFontSizes.map((fontSizes, imageIndex) => (
//               <li key={imageIndex}>
//                 <strong>Image {imageIndex + 1}:</strong>
//                 <ul>
//                   {fontSizes.map((fontSize, textStyleIndex) => (
//                     <li key={textStyleIndex}>{fontSize}</li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )} */}

//         {/* <div className="flex mt-4 align-center justify-center">
//           <button
//             className="bg-gray-200 rounded px-4 py-2 mr-2 "
//             onClick={handleSaveClick}
//           >
//             Save
//           </button>

//           <Link href="/image-picker">
//             <p className="bg-gray-200 rounded px-4 py-2 mr-2">Back</p>
//           </Link>
//           <Link href="/">
//             <p className="bg-gray-200 rounded px-4 py-2">Home</p>
//           </Link>
//         </div> */}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ImageEditor;

import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page

