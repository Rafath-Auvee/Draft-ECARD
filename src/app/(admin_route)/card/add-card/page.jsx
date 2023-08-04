"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddCard = () => {
  const generateUniqueID = () => {
    return uuidv4(); // Use uuid to generate a unique ID
  };

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    referenceImage: "",
    finalImage: "",
    watermark: "",
    imageType: "",
    price: "",
    buttonText: "",
    cardType: "",
    popularity: "",
    description: "",
    cardCategory: "",
    textStyles: [],
  });
  // const handleTextStyleChange = (index, key, value) => {
  //   setFormData((prevFormData) => {
  //     const updatedTextStyles = [...prevFormData.textStyles];
  //     updatedTextStyles[index].key = key;
  //     updatedTextStyles[index].value = value;
  //     return { ...prevFormData, textStyles: updatedTextStyles };
  //   });
  // };

  const handleAddTextStyle = (key, value) => {
    setFormData((prevFormData) => {
      const uniqueId = generateUniqueID();
      const newTextStyle = {
        id: uniqueId,
        [key]: value,
      };

      return {
        ...prevFormData,
        textStyles: [...prevFormData.textStyles, newTextStyle],
      };
    });
  };

  const handleRemoveTextStyle = (index) => {
    setFormData((prevFormData) => {
      const updatedTextStyles = [...prevFormData.textStyles];
      updatedTextStyles.splice(index, 1);
      return { ...prevFormData, textStyles: updatedTextStyles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData };
    console.log(updatedFormData);

    // try {
    //   const response = await fetch("/api/cards", {
    //     method: "POST",
    //     body: JSON.stringify(updatedFormData),
    //   });

    //   if (response.ok) {
    //     // Card created successfully
    //     console.log("Card created!");
    //   } else {
    //     console.error("Error creating card:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error creating card:", error);
    // }

    // setFormData({
    //   title: "",
    //   imageUrl: "",
    //   referenceImage: "",
    //   finalImage: "",
    //   watermark: "",
    //   imageType: "",
    //   price: "",
    //   buttonText: "",
    //   cardType: "",
    //   popularity: "",
    //   description: "",
    //   cardCategory: "",
    //   textStyles: [],
    // });
    // Reset the form data after submitting
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="px-12">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block font-bold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-bold mb-2" htmlFor="imageUrl">
              ReferenceImage
            </label>
            <input
              type="text"
              id="referenceImage"
              value={formData.referenceImage}
              onChange={(e) =>
                setFormData({ ...formData, referenceImage: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="imageUrl">
              FinalImage
            </label>
            <input
              type="text"
              id="finalImage"
              value={formData.finalImage}
              onChange={(e) =>
                setFormData({ ...formData, finalImage: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="imageUrl">
              Watermark
            </label>
            <input
              type="text"
              id="watermark"
              value={formData.watermark}
              onChange={(e) =>
                setFormData({ ...formData, watermark: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="imageType">
              Image Type:
            </label>
            <select
              id="imageType"
              value={formData.imageType}
              onChange={(e) =>
                setFormData({ ...formData, imageType: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select Image Type</option>
              <option value="single image">Single Image</option>
              <option value="multiple image">Multiple Image</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="imageUrl">
              Price
            </label>
            <input
              type="text"
              id="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="buttonText">
              Button Text:
            </label>
            <select
              id="buttonText"
              value={formData.buttonText}
              onChange={(e) =>
                setFormData({ ...formData, buttonText: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select Button Text</option>
              <option value="View Design">View Design</option>
              <option value="Stock Out">Stock Out</option>
              <option value="In Development">In Development</option>
              <option value="Removed">Removed</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="cardType">
              Card Type:
            </label>
            <select
              id="cardType"
              value={formData.cardType}
              onChange={(e) =>
                setFormData({ ...formData, cardType: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select Card Type</option>
              <option value="Single Page">Single Page</option>
              <option value="Multiple Page">Multiple Page</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="imageUrl">
              Popularity
            </label>
            <input
              type="text"
              id="popularity"
              value={formData.popularity}
              onChange={(e) =>
                setFormData({ ...formData, popularity: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-bold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-bold mb-2" htmlFor="cardCategory">
              Card Category:
            </label>
            <select
              id="cardCategory"
              value={formData.cardCategory}
              onChange={(e) =>
                setFormData({ ...formData, cardCategory: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select Card Category</option>
              <option value="singlePageCard">Single Page Card</option>
              <option value="multiPageCard">Multi Page Card</option>
              <option value="singleAnimatedCard">Single Animated Card</option>
            </select>
          </div>

          <div>
            <div>
              {formData.textStyles.map((textStyle, index) => (
                <div key={index} className="border-2 border-black px-4 py-5">
                  <div className="flex flex-row justify-between">
                    {Object.entries(textStyle).map(([key, value]) => (
                      <p key={key}>{key !== "id" ? `${key}: ${value}` : ""}</p>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleRemoveTextStyle(index)}
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Remove TextStyle
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  const key = prompt("Enter Key:");
                  const value = prompt("Enter Value:");
                  if (key && value) {
                    handleAddTextStyle(key, value);
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add TextStyle
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
