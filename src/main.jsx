// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RunTracker from "./assets/Components/RunTracker/RunTracker";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RunTracker />
    </Provider>
  </React.StrictMode>,
);
