import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleAuth = import.meta.env.VITE_GOOGLE_AUTH_ID as string;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleAuth}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
