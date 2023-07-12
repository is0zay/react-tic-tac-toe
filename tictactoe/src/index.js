import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // importing library to talk to web browsers
import "./styles.css"; //importing css to style

import App from "./App"; //importing component

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
