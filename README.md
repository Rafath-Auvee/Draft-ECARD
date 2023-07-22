When I click the "Save" button
<button className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 ">
                        Save
                      </button>
 in ImageEditor Component. 
-------------------------------------------
Value from previewData (ImageEditorFunctions )

  const handleSaveClick = () => {
    let previewData = null;
    if (imageData.imageType === "single image") {
      previewData = {
        url: imageData.url,
        imageType: imageData.imageType,
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
        imageType: imageData.imageType,
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
  };


 data will pass from ImageEditorFunctions to ImageEditor 

and value will display here in the ImageEditor in a real time every time I click "Save"