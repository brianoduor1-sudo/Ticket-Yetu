import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import CategoriesSection from './components/CategoriesSection'
import EventCalendar from './components/EventCalendar'

// Temporary sample events, just so we can SEE the calendar working.
// Real events will come from Brian's data later.
const SAMPLE_EVENTS = [
  {
    id: 1,
    name: "Gor Mahia vs AFC Leopards",
    date: "2026-08-20",
  },
  {
    id: 2,
    name: "Sauti Sol Reunion Concert",
    date: "2026-08-20", // same day as above, on purpose, to test multiple events per day
  },
  {
    id: 3,
    name: "Rugby Sevens Showcase",
    date: "2026-08-22",
  },
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CategoriesSection onSelect={(category) => console.log("Selected:", category)} />

      <div style={{ padding: "40px 20px" }}>
        <EventCalendar
          events={SAMPLE_EVENTS}
          onSelectEvent={(event) => console.log("Clicked event:", event)}
        />
      </div>

      {/* Original Vite starter content, commented out, uncomment if needed later
      <section id="center">
        ...
      */}
    </>
  )
}

export default App