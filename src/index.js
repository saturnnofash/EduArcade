//built in functions from react
import React from "react";
import ReactDOM from "react-dom";

//App function from App.js
import App from "./App";
import "./index.css";

//built in function from installing reactstrap and including bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);