import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Dynamically determine basename based on current URL
// If we are at /v1 (main site subpath), use /v1
// If we are at / (v1 site root), use /
const basename = window.location.pathname.startsWith("/v1") ? "/v1" : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
