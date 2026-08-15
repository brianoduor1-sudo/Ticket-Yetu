import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css"; // Leaflet map styles important for proper map rendering
import App from "./App.jsx";
import { NotificationsProvider } from "./Components/context/NotificationsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </React.StrictMode>,
);