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

  const [addingMoreIndex, setAddingMoreIndex] = useState(null);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newTextStyleKey, setNewTextStyleKey] = useState("");
  const [newTextStyleValue, setNewTextStyleValue] = useState("");
  const [showAddMore, setShowAddMore] = useState(false);
  const [showAddKeyValue, setShowAddKeyValue] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [customTextStyleKey, setCustomTextStyleKey] = useState("");

  const handleCustomKeyChange = (e) => {
    setCustomKey(e.target.value);
    setNewKey(e.target.value); // Update newKey as well
  };

  const handleAddMoreKeyAndValue = (index) => {
    setShowAddMore(true);
    setShowAddKeyValue(false);
    setAddingMoreIndex(index);
    setNewKey("");
    setNewValue("");
  };

  const handleAddKeyAndValue = (index) => {
    setShowAddMore(false);
    setShowAddKeyValue(true);
    if ((newKey && newValue) || newKey === "custom") {
      setFormData((prevFormData) => {
        const updatedTextStyles = [...prevFormData.textStyles];
        updatedTextStyles[index][newKey] = newValue;
        return {
          ...prevFormData,
          textStyles: updatedTextStyles,
        };
      });
      setAddingMoreIndex(null);
      setNewKey("");
      setNewValue("");
      setCustomKey(""); // Reset custom key input
    }
  };

  const handleAddNewTextStyle = () => {
    if (
      (newTextStyleKey && newTextStyleValue) ||
      newTextStyleKey === "custom"
    ) {
      if (newTextStyleKey === "custom") {
        handleAddTextStyle(customTextStyleKey, newTextStyleValue);
      } else {
        handleAddTextStyle(newTextStyleKey, newTextStyleValue);
      }
      setNewTextStyleKey("");
      setCustomTextStyleKey("");
      setNewTextStyleValue("");
    }
  };

  const handleAddTextStyle = (key, value) => {
    setFormData((prevFormData) => {
      const uniqueId = generateUniqueID();
      const newTextStyle = {
        id: uniqueId,
        [key]: value,
      };

      const updatedTextStyles = [...prevFormData.textStyles, newTextStyle];

      return {
        ...prevFormData,
        textStyles: updatedTextStyles,
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

    // Uncomment and add your fetch logic here

    // Reset the form data after submitting
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
    "custom",
  ];

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
            <div className="divider"></div>
            <label className="block font-bold mb-2" htmlFor="cardCategory">
              TextStyles
            </label>
            <div>
              {formData.textStyles.map((textStyle, index) => (
                <div key={index} className="border-2 border-black px-4 py-5 mb-10">
                  <div className="flex flex-col">
                    {Object.entries(textStyle).map(
                      ([key, value]) =>
                        key !== "id" && (
                          <p key={key} className="mb-1">
                            {`${key}: ${value}`}
                          </p>
                        )
                    )}

                    {index === addingMoreIndex ? (
                      <div>
                        <label
                          className="block font-bold mb-2"
                          htmlFor={`newKey${index}`}
                        >
                          New Key:
                        </label>
                        <select
                          id={`newKey${index}`}
                          value={newKey}
                          onChange={(e) => setNewKey(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="">Select Key</option>
                          {fieldOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                          <option value="custom">Custom</option>
                        </select>
                        {newKey === "custom" && (
                          <div>
                            <input
                              type="text"
                              value={customKey}
                              onChange={(e) => setCustomKey(e.target.value)}
                              placeholder="Enter custom key"
                              className="border rounded px-2 py-1 mt-2 w-full"
                            />
                          </div>
                        )}
                        <label
                          className="block font-bold mb-2"
                          htmlFor={`newValue${index}`}
                        >
                          New Value:
                        </label>
                        <input
                          type="text"
                          id={`newValue${index}`}
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddKeyAndValue(index)}
                          className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Add Key-Value
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleRemoveTextStyle(index)}
                          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Remove TextStyle
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddMoreKeyAndValue(index)}
                          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Add More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block font-bold mb-2" htmlFor="newTextStyleKey">
                New Text Style Key:
              </label>
              <select
                id="newTextStyleKey"
                value={newTextStyleKey}
                onChange={(e) => {
                  const selectedKey = e.target.value;
                  setNewTextStyleKey(selectedKey);
                  if (selectedKey === "custom") {
                    setCustomTextStyleKey("");
                  }
                }}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Select Key</option>
                {fieldOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {newTextStyleKey === "custom" && (
                <input
                  type="text"
                  value={customTextStyleKey}
                  onChange={(e) => setCustomTextStyleKey(e.target.value)}
                  placeholder="Enter custom key"
                  className="border rounded px-2 py-1 mt-2 w-full"
                />
              )}
            </div>

            <div className="mt-2">
              <label
                className="block font-bold mb-2"
                htmlFor="newTextStyleValue"
              >
                New Text Style Value:
              </label>
              <input
                type="text"
                id="newTextStyleValue"
                value={newTextStyleValue}
                onChange={(e) => setNewTextStyleValue(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddNewTextStyle}
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
