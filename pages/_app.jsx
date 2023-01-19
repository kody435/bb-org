import "../styles/globals.css";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
