import { useState } from "react";
import "./EventCalendar.css";

// Displays events in a monthly calendar.
export default function EventCalendar({ events = [], onSelectEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Auto-select today's date on first load (only makes sense since
  // currentDate also starts as "now" — if the user navigates to a
  // different month, selectedDay resets to null via goToNext/PreviousMonth).
  const [selectedDay, setSelectedDay] = useState(
    () => new Date().getDate()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(year, month, 1);
  const startingWeekday = firstDayOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create calendar cells including empty days before the month starts.
  const cells = [];

  for (let i = 0; i < startingWeekday; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  // Converts a calendar day into YYYY-MM-DD.
  function formatDateKey(day) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");

    return `${year}-${mm}-${dd}`;
  }

  // Finds events happening on a specific day.
  function eventsOnDay(day) {
    if (!day) return [];

    const dateKey = formatDateKey(day);

    // Real event objects store the date nested under dates.start.localDate,
    // not a flat event.date field.
    return events.filter((event) => event.dates?.start?.localDate === dateKey);
  }

  function goToPreviousMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  }

  function goToNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  }

  function goToToday() {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDay(now.getDate());
  }

  function handleDayClick(day) {
    if (!day) return;

    setSelectedDay(day);
  }

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedDayEvents = selectedDay
    ? eventsOnDay(selectedDay)
    : [];

  return (
    <div className="event-calendar-container">
      <div className="calendar-card">

        {/* Calendar header */}
        <div className="calendar-header">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="calendar-nav-button"
            aria-label="Previous month"
          >
            ‹
          </button>

          <div className="calendar-header-center">
            <h2>{monthName}</h2>
            {/* Jump back to the current month/day from anywhere */}
            <button
              type="button"
              onClick={goToToday}
              className="calendar-today-button"
            >
              Today
            </button>
          </div>

          <button
            type="button"
            onClick={goToNextMonth}
            className="calendar-nav-button"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        {/* Weekday names */}
        <div className="calendar-weekdays">
          {weekdayLabels.map((label) => (
            <div key={label} className="weekday">
              {label}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="calendar-grid">
          {cells.map((day, index) => {
            const dayEvents = day ? eventsOnDay(day) : [];
            const isSelected = day === selectedDay;
            const eventCount = dayEvents.length;

            return (
              <button
                key={`${day}-${index}`}
                type="button"
                disabled={!day}
                onClick={() => handleDayClick(day)}
                className={`calendar-day ${
                  !day ? "empty-day" : ""
                } ${isSelected ? "selected-day" : ""}`}
              >
                {day}

                {/* Single event: small dot. Multiple events: count badge
                    instead, so a busy day is visually distinguishable
                    from a day with just one thing happening. */}
                {eventCount === 1 && (
                  <span
                    className={`event-dot ${
                      isSelected ? "selected-dot" : ""
                    }`}
                  />
                )}

                {eventCount > 1 && (
                  <span
                    className={`event-count-badge ${
                      isSelected ? "selected-badge" : ""
                    }`}
                  >
                    {eventCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected day's events */}
        {selectedDay && (
          <div className="selected-events">
            <h3>
              Events on{" "}
              {currentDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              {selectedDay}, {year}
            </h3>

            {selectedDayEvents.length === 0 ? (
              <p className="no-events">
                No events on this day.
              </p>
            ) : (
              <div className="event-list">
                {selectedDayEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
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