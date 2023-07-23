import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Fraunces } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
import { PreviewDataContextProvider } from "../components/PreviewDataContext/PreviewDataContext.jsx";

export const metadata = {
  title: "Save The Date",
  description: "ECard Customization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable}`}>
        <PreviewDataContextProvider>{children}</PreviewDataContextProvider>
      </body>
    </html>
  );
}
