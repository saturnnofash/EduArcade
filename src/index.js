//built in functions from react
import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter,
} from "react-router-dom";

//App function from App.js
import App from "./App";
import Home from "./pages/Home";
import "./index.css";

//built in function from installing reactstrap and including bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);