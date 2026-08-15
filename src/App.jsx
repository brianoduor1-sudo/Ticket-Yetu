import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Event pages
import SportsPage from "./Components/SportsPage.jsx";
import EntertainmentPage from "./Components/EntertainmentPage.jsx";
import EventDetailsPage from "./Components/EventDetailsPage.jsx";

// Main navigation / organizer pages
import Navigation from "./Components/Organizerpage/Navigation.jsx";
import Blog from "./Components/Organizerpage/Blog.jsx";
import Footer from "./Components/Organizerpage/Footer.jsx";
import Help from "./Components/Organizerpage/Help.jsx";
import Info from "./Components/Organizerpage/Info.jsx";
import Instructions from "./Components/Organizerpage/Instructions.jsx";
import Registration from "./Components/Organizerpage/registration.jsx";
import Login from "./Components/Organizerpage/Login.jsx";
import Sign from "./Components/Organizerpage/Sign.jsx";

// Booking components
import { BookingConfirmation } from "./Components/booking/BookingConfirmation.jsx";
import { TicketStub } from "./Components/booking/TicketStub.jsx";
import { PaymentPanel } from "./Components/booking/PaymentPanel.jsx";

// Other components
import LocationPicker from "./Components/LocationPicker.jsx";
import HeroSection from "./Components/HeroSection.jsx";
import EventsCalendar from "./Components/EventsCalendar.jsx";
import EventLocationPin from "./Components/EventLocationPin.jsx";
import Categories from "./Components/Categories.jsx";

// ==========================================
// LAYOUT
// ==========================================

function Layout({ children }) {
  return (
    <>
      <Navigation />

      {children}

      <Footer />
    </>
  );
}

// ==========================================
// HOME PAGE
// ==========================================

function HomePage() {
  const navigate = useNavigate();

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

        background: `
          radial-gradient(
            circle at 20% 20%,
            rgba(37, 99, 235, 0.25),
            transparent 30%
          ),
          radial-gradient(
            circle at 80% 30%,
            rgba(219, 39, 119, 0.25),
            transparent 30%
          ),
          radial-gradient(
            circle at 50% 80%,
            rgba(124, 58, 237, 0.2),
            transparent 35%
          ),
          linear-gradient(
            135deg,
            #020617,
            #0f172a,
            #111827
          )
        `,

        color: "white",
      }}
    >
      {/* Decorative background icons */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "12%",
          fontSize: "70px",
          opacity: 0.08,
        }}
      >
        ⚽
      </div>

      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "12%",
          fontSize: "70px",
          opacity: 0.08,
        }}
      >
        🎵
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "20%",
          fontSize: "60px",
          opacity: 0.07,
        }}
      >
        🏆
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "20%",
          fontSize: "60px",
          opacity: 0.07,
        }}
      >
        🎤
      </div>

      {/* Main content */}

      <h1
        style={{
          fontSize: "4rem",
          marginBottom: "16px",
          position: "relative",
          zIndex: 2,
        }}
      >
        🎟️ Ticket Yetu
      </h1>

      <p
        style={{
          maxWidth: "700px",
          fontSize: "1.1rem",
          lineHeight: 1.7,
          color: "#cbd5e1",
          marginBottom: "32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Discover and book the best sports, music, comedy, and festival events
        happening across Kenya.
      </p>

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Sports */}

        <button
          onClick={() => navigate("/events/sports")}
          style={{
            padding: "16px 28px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "14px",
            border: "none",
            cursor: "pointer",

            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",

            color: "white",

            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
          }}
        >
          ⚽ Sports Events
        </button>

        {/* Entertainment */}

        <button
          onClick={() => navigate("/events/entertainment")}
          style={{
            padding: "16px 28px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "14px",
            border: "none",
            cursor: "pointer",

            background: "linear-gradient(135deg, #db2777, #be185d)",

            color: "white",

            boxShadow: "0 10px 25px rgba(219, 39, 119, 0.35)",
          }}
        >
          🎵 Entertainment
        </button>
      </div>
    </div>
  );
}

// ==========================================
// EVENTS CATEGORY PAGE
// ==========================================

function EventsPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 30px",

        background:
          "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)",

        color: "white",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "15px",
        }}
      >
        🎟️ Events
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          fontSize: "1.1rem",
          marginBottom: "50px",
        }}
      >
        Browse sports, concerts, comedy, festivals, and other exciting events.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* SPORTS */}

        <div
          onClick={() => navigate("/events/sports")}
          style={{
            padding: "50px 30px",
            borderRadius: "20px",
            background: "#0f172a",
            border: "1px solid #334155",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            🏆
          </div>

          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "15px",
            }}
          >
            Sports
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.6,
            }}
          >
            Football, rugby, basketball, tennis, athletics, and more.
          </p>
        </div>

        {/* ENTERTAINMENT */}

        <div
          onClick={() => navigate("/events/entertainment")}
          style={{
            padding: "50px 30px",
            borderRadius: "20px",
            background: "#0f172a",
            border: "1px solid #334155",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            🎵
          </div>

          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "15px",
            }}
          >
            Entertainment
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.6,
            }}
          >
            Concerts, comedy, festivals, theatre, and other entertainment
            events.
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ORGANIZERS PAGE
// ==========================================

function OrganizersPage() {
  const organizers = [
    {
      name: "Neon Nights Productions",
      desc: "Festivals & music events across East Africa.",
    },
    {
      name: "PitchSide Sports",
      desc: "Football, rugby, and athletics event management.",
    },
    {
      name: "Urban Culture Collective",
      desc: "Comedy shows, art, and community festivals.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "60px 30px",
        color: "white",
        background:
          "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "15px" }}>
        🎤 Meet Our Organizers
      </h1>
      <p
        style={{
          color: "#cbd5e1",
          fontSize: "1.1rem",
          marginBottom: "50px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        The promoters and organizations bringing Kenya's best events to life.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {organizers.map((org) => (
          <div
            key={org.name}
            style={{
              padding: "30px",
              borderRadius: "20px",
              background: "#0f172a",
              border: "1px solid #334155",
            }}
          >
            <h2 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>
              {org.name}
            </h2>
            <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{org.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 404 PAGE
// ==========================================

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",

        background: "radial-gradient(circle at top, #111827 0%, #020617 100%)",

        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "12px",
        }}
      >
        404
      </h1>

      <p
        style={{
          color: "#cbd5e1",
        }}
      >
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

// ==========================================
// APP
// ==========================================

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* ================= EVENTS ================= */}

        <Route
          path="/events"
          element={
            <Layout>
              <EventsPage />
            </Layout>
          }
        />

        {/* ================= SPORTS ================= */}

        <Route
          path="/events/sports"
          element={
            <Layout>
              <SportsPage />
            </Layout>
          }
        />

        {/* ================= ENTERTAINMENT ================= */}

        <Route
          path="/events/entertainment"
          element={
            <Layout>
              <EntertainmentPage />
            </Layout>
          }
        />

        {/* ================= EVENT DETAILS ================= */}

        <Route
          path="/events/:id"
          element={
            <Layout>
              <EventDetailsPage />
            </Layout>
          }
        />

        {/* ================= BLOG ================= */}

        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />

        {/* ================= HELP ================= */}

        <Route
          path="/help"
          element={
            <Layout>
              <Help />
            </Layout>
          }
        />

        {/* ================= INFO ================= */}

        <Route
          path="/info"
          element={
            <Layout>
              <Info />
            </Layout>
          }
        />

        {/* ================= INSTRUCTIONS ================= */}

        <Route
          path="/instructions"
          element={
            <Layout>
              <Instructions />
            </Layout>
          }
        />

        {/* ================= REGISTRATION ================= */}

        <Route
          path="/registration"
          element={
            <Layout>
              <Registration />
            </Layout>
          }
        />

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        {/* ================= SIGN UP ================= */}

        <Route
          path="/signup"
          element={
            <Layout>
              <Sign />
            </Layout>
          }
        />

        {/* ================= BOOKING CONFIRMATION ================= */}

        <Route
          path="/bookingconfirmation"
          element={
            <Layout>
              <BookingConfirmation />
            </Layout>
          }
        />

        {/* ================= TICKET STUB ================= */}

        <Route
          path="/ticketstub"
          element={
            <Layout>
              <TicketStub />
            </Layout>
          }
        />

        {/* ================= ORGANIZERS ================= */}

        <Route
          path="/promoters"
          element={
            <Layout>
              <OrganizersPage />
            </Layout>
          }
        />

        {/* ================= PAYMENT ================= */}

        <Route
          path="/paymentpanel"
          element={
            <Layout>
              <PaymentPanel />
            </Layout>
          }
        />

        {/* ================= LOCATION PICKER ================= */}

        <Route
          path="/locationpicker"
          element={
            <Layout>
              <LocationPicker />
            </Layout>
          }
        />

        {/* ================= HERO SECTION ================= */}

        <Route
          path="/herosection"
          element={
            <Layout>
              <HeroSection />
            </Layout>
          }
        />

        {/* ================= EVENTS CALENDAR ================= */}

        <Route
          path="/eventcalendar"
          element={
            <Layout>
              <EventsCalendar />
            </Layout>
          }
        />

        {/* ================= EVENT LOCATION ================= */}

        <Route
          path="/eventlocationpin"
          element={
            <Layout>
              <EventLocationPin />
            </Layout>
          }
        />

        {/* ================= CATEGORIES ================= */}

        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />

        {/* ================= 404 ================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}