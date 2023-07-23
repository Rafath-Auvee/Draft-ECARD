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
    };
  }

  return (
    <div>
      {previewData ? (
        <div>
          <h1>{previewData.title}</h1>
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
