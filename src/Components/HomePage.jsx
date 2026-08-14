export default function HomePage() {
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
        happening across Worldwide.
      </p>
    </div>
  );
}
