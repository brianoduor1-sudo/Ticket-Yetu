import React from "react";
import ReactDOM from "react-dom/client";

// CSS imports — order matters here. Files with @import statements
// (global.css has @import for Tailwind + Google Fonts) must load
// before any other bulk CSS, or the browser throws a "@import must
// precede all other statements" error — Vite concatenates all
// imported CSS into one file in this exact order.
import "./styles/global.css";   
import "./styles/main.css";
import "./styles/component.css";
import "leaflet/dist/leaflet.css"; // Leaflet map styles  

import App from "./App.jsx";
import { NotificationsProvider } from "./Components/context/NotificationsContext.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </React.StrictMode>,
);
