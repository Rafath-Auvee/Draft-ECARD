{selectedTextIndex !== null && (
          <div className="flex justify-center mt-4">
            <div
              key={selectedTextIndex}
              className={`grid gap-4 grid-cols-3 px-5 py-2 bg-white text-[#23272A] rounded border-black border`}
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
                <div className="flex">
                  {/* {showModal ? (
                    <input
                      id={`textInput-${selectedTextIndex}`}
                      type="text"
                      value={textStyles[selectedTextIndex].text}
                      onChange={(e) => handleTextChange(selectedTextIndex, e)}
                      className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                    />
                  ) : (
                    <button onClick={() => setShowModal(true)}>
                      Edit Text
                    </button>
                  )} */}
                </div>
              </div>

              {/* left and top position  */}

              {/* <div>
                <label htmlFor={`leftInput-${selectedTextIndex}`}>
                  Left Position:
                </label>
                <div className="flex">
                  <input
                    id={`leftInput-${selectedTextIndex}`}
                    type="number"
                    value={textStyles[selectedTextIndex].left}
                    onChange={(e) => handleLeftChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
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
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`topInput-${selectedTextIndex}`}>
                  Top Position:
                </label>
                <div className="flex">
                  <input
                    id={`topInput-${selectedTextIndex}`}
                    type="number"
                    value={textStyles[selectedTextIndex].top}
                    onChange={(e) => handleTopChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
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
                  </div>
                </div>
              </div> */}

              <div>
                {/* <label htmlFor={`fontSizeInput-${selectedTextIndex}`}>
                  Font Size:
                </label> */}
                <div className="flex">
                  <input
                    id={`fontSizeInput-${selectedTextIndex}`}
                    type="number"
                    value={
                      selectedTextIndex !== null &&
                      imageData.imageType === "multiple image"
                        ? selectedImageTextStyles[selectedTextIndex]
                            ?.fontSize || ""
                        : textStyles[selectedTextIndex]?.fontSize || ""
                    }
                    onChange={(e) => handleFontSizeChange(selectedTextIndex, e)}
                    onInput={(e) => handleFontSizeChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-16"
                    min="5"
                  />

                  <div className="flex mt-2">
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
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center align-center items-center cursor-pointer">
                <button
                  className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
                  onClick={handleSaveClick}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
       