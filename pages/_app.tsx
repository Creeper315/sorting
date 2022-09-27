import "../styles/globals.css";
import "../styles/topNav.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return <Component {...pageProps} />;
}

export default MyApp;
