import { useState } from "react";
import { Search } from "lucide-react"; // pre-made search icon (magnifying glass)

/*
  QUICK TAILWIND GUIDE (the classes used in this file)
  Tailwind styles things with short utility classes instead of separate CSS files.
  Each word in className="..." does ONE job:
  - Spacing: p = padding, m = margin, x = left+right, y = top+bottom
    (px-6 = padding left & right, mt-4 = margin top)
  - Sizing: w = width, h = height, max-w = maximum width
  - Text: text-sm/base/lg/xl = font size, font-bold/semibold = weight
  - Color: text-{color}-{shade} = text color, bg-{color}-{shade} = background
    (higher shade number = darker, e.g. violet-100 is pale, violet-700 is deep)
  - Layout: flex = lay children out in a row, items-center = center them vertically
  - rounded-full = fully rounded pill/circle shape
  - sm: prefix = "apply this from a small screen size upward" (mobile-first)
  - hover: prefix = "apply this only when the mouse hovers over it"
*/

// Top banner section of the homepage: app name, headline, tagline,
// and a search bar so users can search for events right away.
export default function HeroSection({ onSearch }) {
  // useState gives us a variable (query) + a function to change it (setQuery).
  // React re-renders the input automatically whenever query changes.
  const [query, setQuery] = useState("");

  // Runs when the user submits the form (hits Enter or clicks Search)
  const handleSubmit = (e) => {
    e.preventDefault(); // stops the browser from doing a full page reload
    onSearch?.(query); // sends the text up to whichever component is listening
    // "?." means: only call onSearch if it was actually passed in as a prop
  };

  return (
    // relative + isolate: lets us layer things on top of each other inside this box
    // overflow-hidden: crops the background image so it can't spill outside
    <section className="relative isolate overflow-hidden">
      {/* Background image.
          absolute + inset-0 = stretch to fill the whole section
          -z-10 = push it BEHIND everything else
          bg-cover + bg-center = scale the photo to fill the box, centered */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-crowd.jpg')" }}
      />

      {/* Dark gradient over the image so white text stays readable.
          bg-gradient-to-t = gradient runs from bottom to top.
          from-black/70 = 70% opaque black at the bottom, fading to
          only 10% opaque near the top. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

      {/* mx-auto = center this box horizontally, max-w-5xl = cap its width,
          text-center + text-white = centered white text */}
      <div className="mx-auto max-w-5xl px-6 py-28 text-center text-white sm:py-36">
        {/* Small brand label above the headline */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-300">
          TicketYetu
        </p>

        {/* Main headline, from the project brief.
            text-4xl / sm:text-5xl = bigger font on larger screens */}
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Discover. Book. Attend.
        </h1>

        {/* Supporting one-liner under the headline */}
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-200 sm:text-lg">
          Every workshop, concert, and gathering worth showing up for — in one
          place.
        </p>

        {/* Search bar styled as a white rounded "pill".
            flex + items-center = lay icon/input/button out in a row
            rounded-full = fully rounded ends */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 shadow-lg"
        >
          <Search className="ml-3 h-5 w-5 shrink-0 text-gray-400" />

          {/* Controlled input: its value always equals the "query" state,
              and every keystroke updates that state via onChange */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, categories, or venues"
            className="w-full bg-transparent px-1 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />

          {/* hover:bg-violet-700 = darker purple when the mouse hovers over it */}
          <button
            type="submit"
            className="shrink-0 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
