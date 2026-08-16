import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Event pages: fetch and display live event data from Ticketmaster API
import SportsPage from "./Components/SportsPage.jsx";
import EntertainmentPage from "./Components/EntertainmentPage.jsx";
import EventDetailsPage from "./Components/EventDetailsPage.jsx";
import EventCard from "./Components/EventCard.jsx";
import {
  fetchEventsByKeyword,
  fetchSportsEvents,
  fetchEntertainmentEvents,
} from "./Components/services/ticketmaster.js";

// Organizer-side pages (nav, auth, static content)
import Navigation from "./Components/Organizerpage/Navigation.jsx";
import Blog from "./Components/Organizerpage/Blog.jsx";
import Help from "./Components/Organizerpage/Help.jsx";
import Info from "./Components/Organizerpage/Info.jsx";
import Instructions from "./Components/Organizerpage/Instructions.jsx";
import Registration from "./Components/Organizerpage/Registration.jsx";
import Login from "./Components/Organizerpage/Login.jsx";
import Sign from "./Components/Organizerpage/Sign.jsx";
import Footer from "./Components/Organizerpage/Footer.jsx";

// Booking flow: shown after a user picks an event to purchase tickets
import { BookingConfirmation } from "./Components/booking/BookingConfirmation.jsx";
import { TicketStub } from "./Components/booking/TicketStub.jsx";
import { PaymentPanel } from "./Components/booking/PaymentPanel.jsx";
import { BookingForm } from "./Components/booking/BookingForm.jsx";
import { storage } from "./data/storage.js";
import { eventService } from "./Components/services/eventService.js";
import MyTickets from "./Components/tickets/MyTickets.jsx";

// Event browsing/discovery components — NOTE: lowercase "components" folder,
// separate from the capital "Components" folder imported above
import LocationPicker from "./components/LocationPicker.jsx";
import HeroSection from "./components/HeroSection.jsx";
import EventCalendar from "./components/EventCalendar.jsx";
import EventLocationPin from "./components/EventLocationPin.jsx";
import CategoriesSection from "./components/CategoriesSection.jsx";

// ==========================================
// LAYOUT
// ==========================================
function Layout({ children }) {
  const location = useLocation();
  const hideFooterOn = ["/info", "/instructions", "/registration"];
  const showFooter = !hideFooterOn.includes(location.pathname);

  return (
    <>
      <Navigation />
      {children}
      {showFooter && <Footer />}
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
          radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.25), transparent 30%),
          radial-gradient(circle at 80% 30%, rgba(219, 39, 119, 0.25), transparent 30%),
          radial-gradient(circle at 50% 80%, rgba(124, 58, 237, 0.2), transparent 35%),
          linear-gradient(135deg, #020617, #0f172a, #111827)
        `,
        color: "white",
      }}
    >
      <div style={{ position: "absolute", top: "18%", left: "12%", fontSize: "70px", opacity: 0.08 }}>⚽</div>
      <div style={{ position: "absolute", top: "25%", right: "12%", fontSize: "70px", opacity: 0.08 }}>🎵</div>
      <div style={{ position: "absolute", bottom: "15%", left: "20%", fontSize: "60px", opacity: 0.07 }}>🏆</div>
      <div style={{ position: "absolute", bottom: "18%", right: "20%", fontSize: "60px", opacity: 0.07 }}>🎤</div>

      <h1 style={{ fontSize: "4rem", marginBottom: "16px", position: "relative", zIndex: 2 }}>
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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [allEvents, setAllEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    Promise.all([fetchSportsEvents(), fetchEntertainmentEvents()])
      .then(([sports, entertainment]) => {
        setAllEvents([...sports, ...entertainment]);
      })
      .catch((err) => setEventsError(err.message))
      .finally(() => setLoadingEvents(false));
  }, []);

  const categoryGroups = useMemo(() => {
    const groups = {};

    allEvents.forEach((event) => {
      const segment = event.classifications?.[0]?.segment?.name;
      const genre = event.classifications?.[0]?.genre?.name;

      if (!segment) return;

      if (!groups[segment]) groups[segment] = new Set();
      if (genre && genre !== "Undefined") {
        groups[segment].add(genre);
      }
    });

    const result = {};
    Object.entries(groups).forEach(([segment, genreSet]) => {
      result[segment] = Array.from(genreSet).sort();
    });
    return result;
  }, [allEvents]);

  const categoryFilteredEvents = useMemo(() => {
    if (selectedCategory === "All") return allEvents;

    return allEvents.filter((event) => {
      const segment = event.classifications?.[0]?.segment?.name;
      const genre = event.classifications?.[0]?.genre?.name;
      return segment === selectedCategory || genre === selectedCategory;
    });
  }, [allEvents, selectedCategory]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearchError(null);
      return;
    }

    setSearching(true);
    const timer = setTimeout(() => {
      fetchEventsByKeyword(query)
        .then(setResults)
        .catch((err) => setSearchError(err.message))
        .finally(() => setSearching(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (value) => {
    setQuery(value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const showSearchResults = query.trim().length > 0;

  return (
    <div>
      <HeroSection onSearch={handleSearch} />
      <CategoriesSection groups={categoryGroups} onSelect={handleCategorySelect} />

      {showSearchResults && (
        <div style={{ padding: "20px 30px 40px", textAlign: "center" }}>
          {searching && <p style={{ color: "#cbd5e1" }}>Searching...</p>}

          {searchError && (
            <p style={{ color: "#f87171" }}>Search failed: {searchError}</p>
          )}

          {!searching && !searchError && results.length === 0 && (
            <p style={{ color: "#cbd5e1" }}>No events found for "{query}".</p>
          )}

          {!searching && results.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                maxWidth: "1100px",
                margin: "0 auto",
              }}
            >
              {results.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      )}

      {!showSearchResults && (
        <div style={{ padding: "20px 30px 60px" }}>
          {loadingEvents ? (
            <p style={{ color: "#cbd5e1", textAlign: "center" }}>
              Loading events...
            </p>
          ) : eventsError ? (
            <p style={{ color: "#f87171", textAlign: "center" }}>
              Failed to load events: {eventsError}
            </p>
          ) : categoryFilteredEvents.length === 0 ? (
            <p style={{ color: "#cbd5e1", textAlign: "center" }}>
              No events found in this category yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                maxWidth: "1100px",
                margin: "0 auto",
              }}
            >
              {categoryFilteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// ORGANIZERS PAGE
// ==========================================
function OrganizersPage() {
  const organizers = [
    { name: "Neon Nights Productions", desc: "Festivals & music events across East Africa." },
    { name: "PitchSide Sports", desc: "Football, rugby, and athletics event management." },
    { name: "Urban Culture Collective", desc: "Comedy shows, art, and community festivals." },
  ];

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "60px 30px",
        color: "white",
        background: "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "15px" }}>🎤 Meet Our Organizers</h1>
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
            <h2 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>{org.name}</h2>
            <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{org.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// BUY TICKETS PAGE
// ==========================================
function BuyTicketsPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "60px 30px",
        color: "white",
        background: "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "15px" }}>🎫 Buy Tickets</h1>
      <p style={{ color: "#cbd5e1", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
        Browse our upcoming sports and entertainment events, then secure your
        spot in just a few clicks.
      </p>
    </div>
  );
}

// ==========================================
// SELL TICKET PAGE
// ==========================================
function SellTicketPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "60px 30px",
        color: "white",
        background: "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "15px" }}>💵 Sell Your Ticket</h1>
      <p style={{ color: "#cbd5e1", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
        Can't make it to an event anymore? List your ticket here and pass it
        on to someone who can.
      </p>
    </div>
  );
}

// ==========================================
// FAQ PAGE
// ==========================================
function FaqPage() {
  const faqs = [
    {
      q: "How do I buy a ticket?",
      a: "Browse events under the Events tab, select an event, and follow the booking steps.",
    },
    {
      q: "Can I get a refund?",
      a: "Refund policies vary by event organizer. Check the event details page for specifics.",
    },
    {
      q: "How do I become an organizer?",
      a: "Sign up for an account and select the promoter/organizer option during registration.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "60px 30px",
        color: "white",
        background: "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "30px" }}>❓ Frequently Asked Questions</h1>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
        {faqs.map((item) => (
          <div
            key={item.q}
            style={{
              marginBottom: "24px",
              padding: "20px",
              borderRadius: "16px",
              background: "#0f172a",
              border: "1px solid #334155",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{item.q}</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// VENDORS PAGE
// ==========================================
function VendorsPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "60px 30px",
        color: "white",
        background: "radial-gradient(circle at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "15px" }}>🛍️ Vendors</h1>
      <p style={{ color: "#cbd5e1", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
        Vendor partnerships and marketplace listings are coming soon. Check
        back for updates.
      </p>
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
      <h1 style={{ fontSize: "3rem", marginBottom: "12px" }}>404</h1>
      <p style={{ color: "#cbd5e1" }}>The page you are looking for does not exist.</p>
    </div>
  );
}

// ==========================================
// APP (ROOT COMPONENT + ROUTER CONFIG)
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/test-booking" element={<Layout><TestBooking /></Layout>} />
        <Route path="/events" element={<Layout><EventsPage /></Layout>} />
        <Route path="/events/sports" element={<Layout><SportsPage /></Layout>} />
        <Route path="/events/entertainment" element={<Layout><EntertainmentPage /></Layout>} />
        <Route path="/events/:id" element={<Layout><EventDetailsPage /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />
        <Route path="/info" element={<Layout><Info /></Layout>} />
        <Route path="/instructions" element={<Layout><Instructions /></Layout>} />
        <Route path="/registration" element={<Layout><Registration /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/sign" element={<Layout><Sign /></Layout>} />
        <Route path="/bookingconfirmation" element={<Layout><BookingConfirmation /></Layout>} />
        <Route path="/ticketstub" element={<Layout><TicketStub /></Layout>} />
        <Route path="/my-tickets" element={<Layout><MyTickets /></Layout>} />
        <Route path="/promoters" element={<Layout><OrganizersPage /></Layout>} />
        <Route path="/buy-tickets" element={<Layout><BuyTicketsPage /></Layout>} />
        <Route path="/sell-ticket" element={<Layout><SellTicketPage /></Layout>} />
        <Route path="/faq" element={<Layout><FaqPage /></Layout>} />
        <Route path="/vendors" element={<Layout><VendorsPage /></Layout>} />
        <Route path="/paymentpanel" element={<Layout><PaymentPanel /></Layout>} />
        <Route path="/locationpicker" element={<Layout><LocationPicker /></Layout>} />
        <Route path="/herosection" element={<Layout><HeroSection /></Layout>} />
        <Route path="/eventcalendar" element={<Layout><EventCalendar events={[]} /></Layout>} />
        <Route path="/eventlocationpin" element={<Layout><EventLocationPin /></Layout>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}