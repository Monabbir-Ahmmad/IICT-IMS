import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "./redux/reduxStore";
import { ThemeContextProvider } from "./context/ThemeContext";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={reduxStore}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
