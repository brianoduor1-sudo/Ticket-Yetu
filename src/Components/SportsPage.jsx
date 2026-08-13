import EventCard from "./EventCard";

const sportsEvents = [
  {
    id: "kpl-001",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQ3KIITc4Z04TX_calNmA0EeHQPbBkpcHfHo5iEWXXg&s=10",
    name: "Gor Mahia vs AFC Leopards",
    date: "2026-09-20",
    time: "15:00",
    location: "Nyayo Stadium, Nairobi",
    category: "FKF Premier League",
    price: 500,
    availableTickets: 1200,
  },
  {
    id: "rugby-003",
    image: "https://scrummage.co.ke/2023/09/12/kenya-7s-squad-named/",
    name: "Kenya Rugby Sevens Invitational",
    date: "2026-09-27",
    time: "10:00",
    location: "RFUEA Grounds, Nairobi",
    category: "Rugby Sevens",
    price: 800,
    availableTickets: 2500,
  },
  {
    id: "basket-004",
    image:
      "https://www.google.com/imgres?q=%22Nairobi%20City%20Thunder%20vs%20Ulinzi%20Warriors%22&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D1587196855982302&imgrefurl=https%3A%2F%2Fwww.facebook.com%2F254citythunder%2Fphotos%2Fnairobi-city-thunder-vs-ulinzi-warriorspreseason-friendly-games-are-about-rhythm%2F1587196855982302%2F&docid=iaCJHFM_IY1zDM&tbnid=9O-qrOyPOM2LAM&vet=12ahUKEwj2y8vH9ZyWAxVD1AIHHTYiIy4QnPAOegQIQhAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwj2y8vH9ZyWAxVD1AIHHTYiIy4QnPAOegQIQhAA",
    name: "Nairobi City Thunder vs Ulinzi Warriors",
    date: "2026-09-29",
    time: "18:00",
    location: "Kasarani Indoor Arena",
    category: "Basketball",
    price: 400,
    availableTickets: 700,
  },
];

export default function SportsPage() {
  return (
    <div
      style={{
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, #1e1b4b 0%, #0b1020 40%, #020617 100%)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", fontSize: "3rem" }}>
        🏆 Sports Events
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          maxWidth: "1280px",
          margin: "32px auto 0",
        }}
      >
        {sportsEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
