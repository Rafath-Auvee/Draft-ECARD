"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddCard = () => {
  const generateUniqueID = () => {
    return uuidv4(); // Use uuid to generate a unique ID
  };

  const [formData, setFormData] = useState({
    id: generateUniqueID(),
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

  const handleAddTextStyle = () => {
    setFormData((prevFormData) => {
      const uniqueId = generateUniqueID();
      const newTextStyle = {
        [uniqueId]: "",
      };

      return {
        ...prevFormData,
        textStyles: [...prevFormData.textStyles, newTextStyle],
      };
    });
  };

  const fieldOptions = [
    "text",
    "left",
    "top",
    "color",
    "fontSize",
    "backgroundColor",
    "textAlign",
    "fontFamily",
    "lineHeight",
    "startingImage",
    "width",
    "height",
  ];

  // const handleTextStyleFieldChange = (index, value) => {
  //   setFormData((prevFormData) => {
  //     const updatedTextStyles = [...prevFormData.textStyles];
  //     const textStyle = updatedTextStyles[index];
  //     const oldField = Object.keys(textStyle)[0];
  //     const fieldValue = textStyle[oldField];

  //     delete textStyle[oldField];
  //     textStyle[value] = fieldValue;

  //     return { ...prevFormData, textStyles: updatedTextStyles };
  //   });
  // };

  const handleTextStyleFieldChange = (index, value) => {
    setFormData((prevFormData) => {
      const updatedTextStyles = [...prevFormData.textStyles];
      const textStyle = updatedTextStyles[index];
      const oldField = Object.keys(textStyle)[0];
      const fieldValue = textStyle[oldField];

      delete textStyle[oldField];
      textStyle[value] = fieldValue;

      return { ...prevFormData, textStyles: updatedTextStyles };
    });
  };

  const handleTextStyleChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedTextStyles = [...prevFormData.textStyles];
      updatedTextStyles[index][field] = value;
      return { ...prevFormData, textStyles: updatedTextStyles };
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
    // Generate a new unique ID
    const newId = uuidv4();

    // Update the formData with the new ID
    const updatedFormData = { ...formData, id: newId };
    console.log(updatedFormData);

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        // Card created successfully
        console.log("Card created!");
      } else {
        console.error("Error creating card:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }

    setFormData({
      id: "",
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
            <label className="block font-bold mt-6 mb-4">TextStyles:</label>

            <div>
              {formData.textStyles.map((textStyle, index) => (
                <div key={index} className="border-2 border-black px-4 py-5">
                  <div className="flex flex-row justify-between">
                    <select
                      value={Object.keys(textStyle)[0]}
                      onChange={(e) =>
                        handleTextStyleFieldChange(index, e.target.value)
                      }
                      className="border rounded px-2 py-1 w-32 mr-2"
                    >
                      <option value="">Select Field Name</option>
                      <option value="text">text</option>
                      <option value="left">left</option>
                      <option value="top">top</option>
                      <option value="color">color</option>
                      <option value="fontSize">fontSize</option>
                      <option value="backgroundColor">backgroundColor</option>
                      <option value="textAlign">textAlign</option>
                      <option value="fontFamily">fontFamily</option>
                      <option value="lineHeight">lineHeight</option>
                      <option value="startingImage">startingImage</option>
                      <option value="width">width</option>
                      <option value="height">height</option>
                      <option value="custom">Custom</option>{" "}
                      {/* Add custom option */}
                    </select>
                    {Object.keys(textStyle)[0] === "custom" ? ( // If custom option is selected, show an input field
                      <input
                        type="text"
                        value={Object.values(textStyle)[0]}
                        onChange={(e) =>
                          handleTextStyleChange(
                            index,
                            Object.keys(textStyle)[0],
                            e.target.value
                          )
                        }
                        placeholder="Enter Custom Field Name"
                        className="border rounded px-2 py-1 w-1/2"
                      />
                    ) : null}
                    <input
                      type="text"
                      value={Object.values(textStyle)[0]}
                      onChange={(e) =>
                        handleTextStyleChange(
                          index,
                          Object.keys(textStyle)[0],
                          e.target.value
                        )
                      }
                      placeholder="Enter Value Name"
                      className="border rounded px-2 py-1 w-1/2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTextStyle(index)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Remove TextStyle
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddTextStyle}
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
