"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Create the context
const PreviewDataContext = createContext();

// Custom hook to access the context
export const usePreviewDataContext = () => {
  const context = useContext(PreviewDataContext);
  if (!context) {
    throw new Error(
      "usePreviewDataContext must be used within a PreviewDataContextProvider."
    );
  }
  return context;
};

// Provider component that wraps your app and holds the state
export const PreviewDataContextProvider = ({ children }) => {
  const [editorPreviewData, setEditorPreviewData] = useState(null);

  useEffect(() => {
    // Load the data from local storage on component mount
    const savedPreviewData = localStorage.getItem("editorPreviewData");
    if (savedPreviewData) {
      setEditorPreviewData(JSON.parse(savedPreviewData));
    }
  }, []);

  useEffect(() => {
    // Save the data to local storage whenever it changes
    if (editorPreviewData) {
      localStorage.setItem(
        "editorPreviewData",
        JSON.stringify(editorPreviewData)
      );
    }
  }, [editorPreviewData]);

  return (
    <PreviewDataContext.Provider
      value={{ editorPreviewData, setEditorPreviewData }}
    >
      {children}
    </PreviewDataContext.Provider>
  );
};

// ... The rest of your ImageEditor.js code ...
