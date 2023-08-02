      {
        id: 11,
        startingImage: "/Bismillah/Bismillah.png",
        left: 355,
        top: 126,
        color: "white",
        fontSize: "20px",
        backgroundColor: "rgb(255, 255, 255)",
      },

                          {textStyle.startingImage && ( // Check if the textStyle has an image property
                      <Image
                        src={textStyle.startingImage}
                        alt="Image"
                        // fill
                        width={200}
                        height={100}
                        style={{
                          position: "relative",
                          left: 100, // Set the image position based on the 'left' and 'top' values from textStyle
                          top: 100,
                          // objectFit: textStyle.objectFit || "contain",
                          backgroundColor: "transparent",
                        }}
                        onClick={() =>
                          handleTextStyleImage(textStyle.startingImage)
                        }
                        // onLoad={() => console.log("Image loaded successfully!")}
                      />
                    )}