import { useState } from "react";
import "./EventCalendar.css";

export default function EventCalendar({ events = [], onSelectEvent }) {
  // Keep track of the month being displayed
  const [date, setDate] = useState(new Date());

  // Keep track of the selected day
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const year = date.getFullYear();
  const month = date.getMonth();

  // Add empty spaces before the first day of the month
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Find events that happen on a specific day
  const eventsOnDay = (day) => {
    if (!day) return [];

    const dateKey = [
      year,
      String(month + 1).padStart(2, "0"),
      String(day).padStart(2, "0"),
    ].join("-");

    return events.filter(
      (e) => e.dates?.start?.localDate === dateKey
    );
  };

  // Move to the previous or next month
  const changeMonth = (offset) => {
    setDate(new Date(year, month + offset, 1));
    setSelectedDay(null);
  };

  // Return the calendar to today's date
  const goToToday = () => {
    setDate(new Date());
    setSelectedDay(new Date().getDate());
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get events for the currently selected day
  const selectedEvents = eventsOnDay(selectedDay);

  return (
    <div className="event-calendar-container">
      <div className="calendar-card">

        {/* Calendar header and navigation */}
        <div className="calendar-header">
          <button
            onClick={() => changeMonth(-1)}
            className="calendar-nav-button"
          >
            ‹
          </button>

          <div className="calendar-header-center">
            <h2>
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={goToToday}
              className="calendar-today-button"
            >
              Today
            </button>
          </div>

          <button
            onClick={() => changeMonth(1)}
            className="calendar-nav-button"
          >
            ›
          </button>
        </div>

        {/* Days of the week */}
        <div className="calendar-weekdays">
          {weekdays.map((d) => (
            <div key={d} className="weekday">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="calendar-grid">
          {cells.map((day, i) => (
            <button
              key={i}
              disabled={!day}
              onClick={() => day && setSelectedDay(day)}
              className={`calendar-day ${
                !day ? "empty-day" : ""
              } ${day === selectedDay ? "selected-day" : ""}`}
            >
              {day}

              {/* Show a dot when there is an event on this day */}
              {day && eventsOnDay(day).length > 0 && (
                <span className="event-dot" />
              )}
            </button>
          ))}
        </div>

        {/* Show events for the selected day */}
        {selectedDay && (
          <div className="selected-events">
            <h3>
              Events on{" "}
              {date.toLocaleString("default", { month: "long" })}{" "}
              {selectedDay}, {year}
            </h3>

            {selectedEvents.length === 0 ? (
              <p className="no-events">
                No events on this day.
              </p>
            ) : (
              <div className="event-list">
                {selectedEvents.map((event) => (
                  <button
                    key={event.id}
                    className="calendar-event"
                    onClick={() => onSelectEvent?.(event)}
                  >
                    <span>{event.name}</span>
                    <span className="event-arrow">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}