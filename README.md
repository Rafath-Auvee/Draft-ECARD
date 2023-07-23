"use client";

import { useRouter } from "next/navigation";

const MainComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const imageData = images.find((image) => image.id === parseInt(id));

  let previewData = null;
  if (imageData) {
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
  }

  return (
    <div>
      {previewData ? (
        <div>
          <h1>{previewData.title}</h1>
          <img src={previewData.imageUrl} alt={previewData.title} />
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default MainComponent;