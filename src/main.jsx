import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Dynamically determine basename based on current URL
// If we are at /v1 (main site subpath), use /v1
// If we are at / (v1 site root), use /
// If we are on the MAIN domain, we assume we are being rewritten to /v1
// You might need to add your custom domain here later too
const isMainDomain = window.location.hostname.includes("drimes-portfolio.vercel.app");
const basename = isMainDomain ? "/v1" : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
