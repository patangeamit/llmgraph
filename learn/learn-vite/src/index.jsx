import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles.css";
const resizeObserverLoopErrRe =
  /^ResizeObserver loop (completed with undelivered notifications|limit exceeded)$/;

window.addEventListener("error", (e) => {
  if (resizeObserverLoopErrRe.test(e.message)) {
    e.stopImmediatePropagation();
  }
});
ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
