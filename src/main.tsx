import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";

import { ThemeProvider } from "next-themes";
import "./app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
