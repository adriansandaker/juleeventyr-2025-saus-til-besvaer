import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import AuthenticationGuard from "./AuthenticationGuard";

import "./index.css";
import PlatetoppProvider from "./context/PlatetoppProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthenticationGuard>
        <PlatetoppProvider>
          <App />
        </PlatetoppProvider>
      </AuthenticationGuard>
    </QueryClientProvider>
  // </React.StrictMode>
);
