import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Routes.tsx";
import { Provider } from "react-redux";
import store from "./services/store.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import { listenToAuthChanges } from "./services/authService.ts";

// Initialize the auth state listener
listenToAuthChanges();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>
);
