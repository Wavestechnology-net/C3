// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./Routes.tsx";
// import { Provider } from "react-redux";
// import store from "./services/store.tsx";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { ToastContainer } from "react-toastify";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <ToastContainer />
//       <App />
//     </Provider>
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Routes.tsx";

import { Provider } from "react-redux";
import store from "./services/store.tsx";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <ToastContainer />
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);