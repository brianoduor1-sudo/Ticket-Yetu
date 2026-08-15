import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSection({ onSearch }) {
  // Keeps track of what the user types into the search box
  const [query, setQuery] = useState("");

  // Update the search results as the user types
  const handleChange = (e) => {
    const value = e.target.value;

    setQuery(value);
    onSearch?.(value);
  };

  // Also search when the user clicks the button or presses Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <section className="relative isolate overflow-hidden">

      {/* Hero background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-crowd.jpg')",
        }}
      />

      {/* Dark overlay to make the text easier to read */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/50 to-black/20" />

      <div className="mx-auto max-w-5xl px-6 py-28 text-center text-white sm:py-36">

        {/* Project name */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-300">
          TicketYetu
        </p>

        {/* Main heading */}
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
          Discover. Book. Attend.
        </h1>

        {/* Short description */}
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-200 sm:text-lg">
          Find events worth attending, all in one place.
        </p>

        {/* Event search */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-1.5 shadow-lg"
        >
          <Search className="ml-3 h-5 w-5 shrink-0 text-gray-400" />

          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search events, venues, or categories"
            className="w-full bg-transparent px-1 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />

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