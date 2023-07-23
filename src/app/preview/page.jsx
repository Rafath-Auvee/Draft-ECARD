"use client";

import { usePreviewDataContext } from "../../components/PreviewDataContext/PreviewDataContext";

const Preview = () => {
  
    const { editorPreviewData } = usePreviewDataContext();

  return (
    <div>
      <div className="text-center flex justify-center">{editorPreviewData.title}</div>
    </div>
  );
};

export default Preview;
