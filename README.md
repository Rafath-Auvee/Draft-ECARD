{textStyles.map((textStyle, index) => (
            <Draggable
              key={index}
              position={{ x: textStyle.left, y: textStyle.top }}
              onStop={(e, data) => handleTextDragStop(index, data)}
              bounds="parent"
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
                  letterSpacing: textStyle.letterSpacing || 0, // Set initial letter spacing from JSON or default to 0
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
          ))}


keep the react draggable for dragging. but not for x and y co ordinates . X and y depend on canvas co ordinates

The value I was getting for X and Y for selected Text was in the ImageEditor because React Draggable but I don't want that.

 I want X and Y value for Selected Text according to Canvas Height and Weight not react draggable position. 

I will use react draggable for dragging in the canvas. But the x and y depend on canvas co ordinates not the react draggable co ordinates

text will remain in the canvas. They won't outside canvas. If they go outside canvas then their default co ordinates will 100,100