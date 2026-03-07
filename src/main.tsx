import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import { initApp } from "./initApp";
import { ErrorBoundary } from "./unitComponents/ErrorBoundary";

import "./index.css";

initApp();

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
