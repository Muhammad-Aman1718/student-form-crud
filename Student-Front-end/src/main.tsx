import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </Provider>
);
