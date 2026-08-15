import { useState } from "react";

// Month calendar. Highlights days with events, click a day to list its events.
// Receives events as a prop; does not fetch data itself.

export default function EventCalendar({ events, onSelectEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date()); // month/year in view
  const [selectedDay, setSelectedDay] = useState(null); // clicked day number

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(year, month, 1);
  const startingWeekday = firstDayOfMonth.getDay(); // leading blanks needed

  const daysInMonth = new Date(year, month + 1, 0).getDate(); // day 0 of next month = last day of this one

  // Build grid cells: blanks for padding, then day numbers
  const cells = [];
  for (let i = 0; i < startingWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  // day -> "YYYY-MM-DD" to match event.date format
  function formatDateKey(day) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  function eventsOnDay(day) {
    const dateKey = formatDateKey(day);
    return events.filter((event) => event.date === dateKey);
  }

  function goToPreviousMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  }

  function goToNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  }

  function handleDayClick(day) {
    if (!day) return; // ignore blank cells
    setSelectedDay(day);
  }

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const selectedDayEvents = selectedDay ? eventsOnDay(selectedDay) : [];

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={goToPreviousMonth} className="px-3 py-1 text-violet-600 hover:bg-violet-100 rounded">
          &lsaquo;
        </button>
        <h2 className="text-lg font-bold text-gray-900">{monthName}</h2>
        <button onClick={goToNextMonth} className="px-3 py-1 text-violet-600 hover:bg-violet-100 rounded">
          &rsaquo;
        </button>
      </div>

      {/* Weekday header */}
      <div className="mb-2 grid grid-cols-7">
        {weekdayLabels.map((label) => (
          <div key={label} className="text-center text-xs font-semibold uppercase text-gray-400">
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          const dayEvents = day ? eventsOnDay(day) : [];
          const isSelected = day === selectedDay;

          return (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              disabled={!day}
              className={`relative aspect-square rounded-lg text-sm flex items-center justify-center transition ${
                !day
                  ? "bg-transparent"
                  : isSelected
                  ? "bg-violet-600 text-white"
                  : "bg-gray-50 hover:bg-violet-100 text-gray-900"
              }`}
            >
              {day}
              {/* event indicator dot */}
              {dayEvents.length > 0 && (
                <span className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-violet-600"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Event list for selected day */}
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