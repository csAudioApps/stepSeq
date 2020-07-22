import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import './styles/styles.scss';

const root = document.createElement("div");
root.id = "root"
document.body.appendChild(root);
ReactDOM.render(<App />, root);