import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "./redux/reduxStore";
import { ThemeContextProvider } from "./context/ThemeContext";
import { SnackbarProvider } from "notistack";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <ThemeContextProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeContextProvider>
    </Provider>
  </BrowserRouter>
);
