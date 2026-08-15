import { BrowserRouter, Routes, Route } from "react-router-dom";

import SportsPage from "./Components/SportsPage";
import EntertainmentPage from "./Components/EntertainmentPage";
import EventDetailsPage from "./Components/EventDetailsPage";

function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #0f172a 45%, #020617 100%)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "16px" }}>🎟️ Ticket Yetu</h1>

      <p
        style={{
          maxWidth: "700px",
          fontSize: "1.1rem",
          lineHeight: 1.7,
          color: "#cbd5e1",
        }}
      >
        Discover and book the best sports, music, comedy, and festival events
        happening across Kenya.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                background:
                  "radial-gradient(circle at top, #111827 0%, #020617 100%)",
                color: "white",
              }}
            >
              <h1 style={{ fontSize: "3rem", marginBottom: "12px" }}>404</h1>
              <p style={{ color: "#cbd5e1" }}>
                The page you are looking for does not exist.
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
import { Routes, Route } from "react-router-dom";
import Navigation from "./Organizerpage/Navigation";
import Info from "./Organizerpage/Info";
import "./Organizerpage/Navigation.css";
import Instructions from "./Organizerpage/Instructions";
import Registration from "./Organizerpage/registration";
import Footer from "./Organizerpage/Footer";
import Login from "./Organizerpage/Login";
import Blog from "./Organizerpage/Blog";
import Sign from "./Organizerpage/Sign";
import Help from "./Organizerpage/Help";

function Home() {
  return (
    <>
      <Info />
      <Instructions />
      <Registration />
    </>
  );
}

function OrganizerPage() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/promoters" element={<Home />} />
         <Route path="/Blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/Help" element= {<Help />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default OrganizerPage;
