import React from "react";
import * as ReactDOM from 'react-dom/client';
import Root from "./components/root.jsx";

import "./styles/fonts.css";
import "./styles/basic.css";
import "./fonts/Inter-accent.otf";
import "./fonts/Alegreya-VariableFont_wght.ttf";

ReactDOM.createRoot(
    document.getElementById("app")
).render(
    <Root/>
)