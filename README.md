# 🎟️ TicketYetu

*Discover. Book. Attend.*

## 📌 Project Overview

TicketYetu is a **frontend-only** event discovery and ticketing platform built for students. This module deliberately runs entirely in the browser  no backend server, no external API calls  using realistic mock event data and `localStorage` for all persistence (bookings  and notifications).

Users can browse events by category, search, view an event calendar, see venue locations on an interactive map, book tickets through a simulated checkout (including a simulated M-Pesa/card payment step), and view their booked tickets.

Built with React, Vite, Tailwind CSS, Leaflet, and OpenStreetMap.

## 🎯 Problem Statement

Finding and keeping track of student events can be difficult because information is often shared through WhatsApp groups, posters, social media, and word of mouth. This makes it easy for students to miss events or lose important ticket information.

TicketYetu provides a central platform where students can discover events, filter them by category, view venue locations, and book and manage tickets  all demonstrated as a fully working, self-contained frontend experience.

## 👥 Target Users

### Event Organisers
Universities, student clubs, churches, local businesses, and other organisers who want to promote and manage their events.

### Attendees
Students and other users who want to discover upcoming events, book tickets, and keep track of what they've booked.

## ✨ Features (Current State)

### 🔍 Event Search
A smart search on `/events` matches broad category words (e.g. "sport", "music", "football") directly to the relevant category, and falls back to matching event name/genre for everything else.

### 🏷️ Category Filtering
Category pills are generated dynamically from whatever event data is actually loaded (grouped by segment : Sports/Music and genre), so filters never point to categories with no matching events.

### 📅 Event Calendar
A custom-built monthly calendar at `/eventcalendar`, using JavaScript date logic (no external calendar library). Highlights days with events, includes a "Today" quick-jump, and clicking a date lists that day's events.

### 📍 Location Picker
Lets organisers enter a venue address and drop a pin on an interactive Leaflet/OpenStreetMap map to capture latitude and longitude.

### 🗺️ Event Maps
Every event details page shows the venue on a live map, with a "Get Directions" button that opens Google Maps using the saved coordinates.

### 🎫 Ticket Booking (fully working, simulated backend)
A real booking flow, entirely client-side:
1. Pick a quantity, enter name/email
2. Proceed to a simulated payment step (M-Pesa or card  both intentionally simulate success/decline outcomes so the UI and error states can be tested without a real payment gateway)
3. On success, a booking is created with a generated ticket code, and inventory (`quantityBooked` vs `quantityTotal`) is updated
4. Booking triggers an in-app notification
5. View all booked tickets on `/my-tickets`

Ticket inventory is tracked per event and genuinely enforced you can't book more tickets than are available.

### 🔔 Notifications
An in-app notification system (bell icon with unread-count badge) triggers on booking confirmation, event updates, and event cancellations. Notifications persist in `localStorage`.

### 📧 Newsletter Signup
The footer's email subscribe form actually validates and persists the email to `localStorage` (previously had no logic at all).

### 👤 Authentication
* **Sign Up / Registration** and **Login** : accounts saved to and checked against `localStorage`.
* Navbar reflects login state live : shows "Welcome, [name]" and a Logout button once signed in.
* This is a frontend-only auth system suitable for a demo; not connected to a real backend/database.

### 📝 Blog / Info / Instructions
Static content pages providing platform information and usage guidance.

### 📱 Responsive Design
Designed to work across desktop, tablet, and mobile screen sizes.

## 🖥️ Main Views

| Route | Description |
|---|---|
| `/` | Homepage with hero section and quick links to Sports/Entertainment |
| `/events` | Search + dynamic category browsing |
| `/events/sports` | Sports events (mock data) |
| `/events/entertainment` | Entertainment/music events (mock data) |
| `/events/:id` | Full event details, live map, and booking flow |
| `/eventcalendar` | Monthly calendar view of events |
| `/blog` | Blog / news content |
| `/help`, `/info`, `/instructions` | Platform information and usage guidance |
| `/registration` | Organiser account registration |
| `/login`, `/sign` | Account login and sign-up (localStorage-based) |
| `/my-tickets` | Logged-in user's booked tickets |
| `/bookingconfirmation`, `/ticketstub`, `/paymentpanel` | Booking flow steps |
| `/promoters` | Organiser/promoter profile cards |
| `/buy-tickets`, `/sell-ticket`, `/faq`, `/vendors` | Static informational pages |

## 🛠️ Technologies Used

### Frontend
* React 19
* Vite
* JavaScript
* Tailwind CSS v4

### Maps
* Leaflet
* React-Leaflet
* OpenStreetMap

### Event & App Data
* **Mock event data** (`Components/services/mockEvents.js`), shaped identically to a real Ticketmaster API response so the UI components don't need to change if/when a live API is reconnected later
* `localStorage` for all persisted state: events (once booked against), bookings, notifications, newsletter subscribers, user accounts

### Project Management
* Jira
* GitHub
* Figma
* Google Sheets

## 🧱 Project Structure

```text
src/
├── components/                (lowercase — event browsing/discovery UI)
│   ├── HeroSection.jsx
│   ├── CategoriesSection.jsx
│   ├── EventCalendar.jsx
│   ├── LocationPicker.jsx
│   ├── EventMap.jsx
│   └── EventLocationPin.jsx
│
├── Components/                (capital : organiser pages, booking flow, services)
│   ├── Organizerpage/         (Navigation, Login, Sign, Footer, Registration, etc.)
│   ├── Notifications/         (NotificationBell, AlertBanner)
│   ├── booking/                (BookingForm, PaymentPanel, BookingConfirmation, TicketStub)
│   ├── tickets/
│   │   └── MyTickets.jsx
│   ├── context/
│   │   └── NotificationsContext.jsx
│   ├── hooks/                  (useBooking, useEvents, useNotifications)
│   ├── pages/
│   │   └── DataManagementPage.jsx   (built, not yet routed  see Known Issues)
│   └── services/
│       ├── ticketmaster.js     (mock-data-backed "API"  see note below)
│       ├── mockEvents.js
│       ├── eventService.js
│       ├── bookingService.js
│       ├── paymentService.js   (simulated M-Pesa/card, not a real gateway)
│       ├── notificationService.js
│       ├── subscriberService.js
│       ├── dataIntegrityService.js
│       └── dataManagementService.js (broken  see Known Issues)
│
├── data/
│   └── storage.js              (all localStorage read/write logic)
│
├── utilities/
│   ├── filterEvents.js
│   └── useEventFilters.js
│
└── styles/
    ├── global.css               (Tailwind + font imports  must load first)
    ├── main.css
    └── component.css
```

> **`ticketmaster.js` naming note:** despite the filename, this module no longer calls the real Ticketmaster API  it filters local `mockEvents.js` data behind the same function names (`fetchSportsEvents`, `fetchEventById`, etc.) so every component built against the live API continues to work unchanged. This was a deliberate decision for this module: fully frontend, no API key required, fully working offline.


## 🔎 Search and Filtering

Category pills reflect whatever events actually exist in the mock dataset. Search checks for a category-word match first (so "football" returns all Sports events), then falls back to matching the query against event names and genres directly.

## 💾 Data Persistence

Everything is `localStorage`-based, no backend involved:
* `ticketyetu_events` : event records (created lazily the first time someone books against a mock event, to store live inventory numbers)
* `ticketyetu_bookings` :confirmed/cancelled bookings
* `ticketyetu_notifications` :in-app notifications
* `ticketyetu_subscribers` : newsletter signups
* User accounts and login sessions stored separately under their own keys

There is a `dataIntegrityService` that can detect and repair drift between an event's stored `quantityBooked` and what its actual confirmed bookings add up to useful since this kind of manual counter is a known race-condition risk once this moves off `localStorage` onto a real backend.

## 🚀 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/brianoduor1-sudo/Ticket-Yetu.git
cd Ticket-Yetu
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open the application
Open the local URL shown in your terminal (typically `http://localhost:5173`).

**No environment variables or API keys are required** : this module runs entirely on local mock data.



## ⚠️ Known Limitations / Issues

* **This is a frontend-only module.** All "backend" behavior (inventory, bookings, notifications, accounts) is simulated with `localStorage`. Data is device- and browser-specific, and is lost if storage is cleared.
* Event data is a fixed set of mock events, not a live feed  same events every time the app is loaded.
* Payment (M-Pesa/card) is fully simulated  no real payment gateway is called or ever will be from this module.
* `DataManagementPage.jsx` (export/import/reset tooling) is built but **currently broken and not routed anywhere** :it imports `STORAGE_KEYS` and a `SCHEMA_VERSION` from files/exports that don't exist in the current `storage.js` (no `migrations.js` file exists, and `storage.js` doesn't export `STORAGE_KEYS`, `setOrganisers`, `setMeta`, or `getOrganisers`). Needs either those additions to `storage.js` or a rewrite of `dataManagementService.js` before it can be wired into a route.

* Some pages (`Buy Tickets`, `Sell Your Ticket`, `FAQ`, `Vendors`) remain static placeholder content.

## 🗺️ Roadmap

### Completed
* [x] Homepage Hero Section, search, and dynamic category filtering
* [x] Full booking flow: quantity → checkout → simulated payment → confirmation
* [x] Ticket inventory tracking with real enforcement (can't overbook)
* [x] In-app notifications on booking events
* [x] Sign up / Login / Logout / Registration (localStorage-based)
* [x] My Tickets view showing real booked tickets

### In Progress
* [ ] Fix and wire up `DataManagementPage` (export/import/reset)
* [ ] Repo cleanup (`components`/`Components`, `Data`/`data`, dead `Api/` folder)
* [ ] Reconnect to a live event API (originally Ticketmaster) once outside this frontend-only module's scope
* [ ] Newsletter signup 
* [ ] Event Calendar with real mock-event integration

### Planned (beyond this module)
* [ ] Real backend (Firebase or similar) replacing `localStorage`
* [ ] Location Picker and Event Maps with Get Directions
* [ ] Real M-Pesa (Daraja API) and card payment integration
* [ ] Email/SMS notifications
* [ ] QR code tickets
* [ ] Automated tests

## 📚 Learning Outcomes

Through this project, the team has worked on:
* React component development and hooks-based state management
* Responsive UI development with Tailwind CSS
* Designing a realistic client-side "backend" simulation (inventory, bookings, notifications) using `localStorage`
* Building a genuine, enforced booking/checkout flow with error states
* Working with JavaScript date logic for a custom calendar
* Integrating Leaflet and OpenStreetMap
* Managing shared GitHub branches and resolving merge conflicts
* Using Jira for project management, Figma for UI/UX design

## 👥 Team

TicketYetu is a six-person team project.

* **Ralph Njuguna** 
* **Patricia Ndung'u**
* **Brian Oduor**
* **Nicole Jada**
* **Peter Ng'ang'a**
* **Joy Dannah**

## 📦 GitHub Repository

https://github.com/brianoduor1-sudo/Ticket-Yetu

## 🙏 Acknowledgements

Map data is provided by OpenStreetMap contributors.
https://www.openstreetmap.org/copyright

## 📜 License

A project license has not yet been selected. The team will confirm the appropriate license before adding a LICENSE file.

## ✅ Final Note

TicketYetu (this module) is a fully self-contained frontend demo: no API key, no backend, no internet dependency once loaded, yet still demonstrates a complete, realistic booking flow end-to-end. This gave the team hands-on experience simulating backend behavior client-side  a useful skill on its own while keeping the module deployable and demoable anywhere, instantly.
