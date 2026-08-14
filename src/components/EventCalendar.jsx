import { useState } from "react";

// ============================================================
// WHAT THIS COMPONENT DOES, IN PLAIN WORDS:
//
// It shows a month calendar, like a normal wall calendar.
// Any day that has an event gets a small purple dot under the number.
// Clicking a day shows the list of events happening that day.
// There are "<" and ">" buttons to move to the previous/next month.
//
// This component doesn't fetch any events itself. It's handed a
// list of events as a prop, and it just figures out which day each
// one belongs on, based on its date.
// ============================================================

export default function EventCalendar({ events, onSelectEvent }) {
  // Remembers which month/year we're currently looking at.
  // Starts on today's real date when the page first loads.
  const [currentDate, setCurrentDate] = useState(new Date());

  // Remembers which day number is currently clicked/selected.
  // Starts as "nothing selected" (null).
  const [selectedDay, setSelectedDay] = useState(null);

  // Pulls the year and month number out of currentDate, so we can
  // use them below to figure out the calendar grid.
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 = January, 11 = December

  // Turns the date into a readable heading, like "August 2026".
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Figures out what weekday the 1st of this month falls on
  // (0 = Sunday, 1 = Monday, etc). We need this to know how many
  // empty blank squares to show before day 1 starts.
  const firstDayOfMonth = new Date(year, month, 1);
  const startingWeekday = firstDayOfMonth.getDay();

  // Figures out how many days are in this month (28, 30, or 31).
  // The trick: asking for "day 0" of NEXT month gives us the
  // last day of THIS month.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Builds one long list representing every square in the calendar
  // grid: some blank squares first (padding), then the real day
  // numbers (1, 2, 3... up to the last day of the month).
  const cells = [];
  for (let i = 0; i < startingWeekday; i++) {
    cells.push(null); // blank square, no day number here
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day); // a real day number
  }

  // Turns a day number (like 15) into a full date string like
  // "2026-08-15", so we can match it against event.date, which is
  // stored in that same format.
  function formatDateKey(day) {
    const mm = String(month + 1).padStart(2, "0"); // add leading 0 if needed
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  // Looks through the full events list and returns only the ones
  // happening on this specific day.
  function eventsOnDay(day) {
    const dateKey = formatDateKey(day);
    return events.filter((event) => event.date === dateKey);
  }

  // Moves the calendar back one month when "<" is clicked.
  function goToPreviousMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null); // clear selection since we're on a new month now
  }

  // Moves the calendar forward one month when ">" is clicked.
  function goToNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  }

  // Runs when someone clicks a day square. Ignores clicks on blank
  // (padding) squares, since those don't have a real day number.
  function handleDayClick(day) {
    if (!day) return;
    setSelectedDay(day);
  }

  // Just the short weekday labels shown across the top of the grid.
  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // The actual list of events to show below the grid, only
  // calculated if a day is currently selected.
  const selectedDayEvents = selectedDay ? eventsOnDay(selectedDay) : [];

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      {/* Header row: back arrow, month/year heading, forward arrow */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={goToPreviousMonth} className="px-3 py-1 text-violet-600 hover:bg-violet-100 rounded">
          &lsaquo;
        </button>
        <h2 className="text-lg font-bold text-gray-900">{monthName}</h2>
        <button onClick={goToNextMonth} className="px-3 py-1 text-violet-600 hover:bg-violet-100 rounded">
          &rsaquo;
        </button>
      </div>

      {/* Row of weekday labels: Sun, Mon, Tue... */}
      <div className="mb-2 grid grid-cols-7">
        {weekdayLabels.map((label) => (
          <div key={label} className="text-center text-xs font-semibold uppercase text-gray-400">
            {label}
          </div>
        ))}
      </div>

      {/* The actual calendar grid: 7 columns wide (one per weekday) */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          // For each square, check if it has any events, and
          // whether it's the currently selected day (for styling).
          const dayEvents = day ? eventsOnDay(day) : [];
          const isSelected = day === selectedDay;

          return (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              disabled={!day} // blank squares aren't clickable
              className={`relative aspect-square rounded-lg text-sm flex items-center justify-center transition ${
                !day
                  ? "bg-transparent" // blank square: invisible
                  : isSelected
                  ? "bg-violet-600 text-white" // this day IS selected: solid purple
                  : "bg-gray-50 hover:bg-violet-100 text-gray-900" // normal day
              }`}
            >
              {day}
              {/* Small purple dot shown under the day number, only
                  if this day has at least one event happening */}
              {dayEvents.length > 0 && (
                <span className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-violet-600"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Below the grid: only shows up once a day has been clicked.
          Lists every event happening on that specific day. */}
      {selectedDay && (
        <div className="mt-5 border-t pt-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-900">
            Events on {currentDate.toLocaleString("default", { month: "long" })} {selectedDay}, {year}
          </h3>

          {selectedDayEvents.length === 0 ? (
            <p className="text-sm text-gray-400">No events on this day.</p>
          ) : (
            <ul className="space-y-2">
              {selectedDayEvents.map((event) => (
                <li key={event.id}>
                  <button
                    onClick={() => onSelectEvent?.(event)}
                    className="w-full rounded-lg border border-gray-200 p-2 text-left text-sm hover:border-violet-600 hover:text-violet-600"
                  >
                    {event.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}