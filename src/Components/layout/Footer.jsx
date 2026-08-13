import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscriberService } from '../../services/subscriberService';

// Module 3 (Post-Booking & Scheduling). Newsletter signup actually
// persists via subscriberService — real delivery is Phase 2, same
// backend dependency as email notifications.
export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // { success, error?, alreadySubscribed? }

  function handleSubscribe(e) {
    e.preventDefault();
    const result = subscriberService.subscribe(email);
    setStatus(result);
    if (result.success) setEmail('');
  }

  return (
    <footer className="site-footer-full">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo"><span className="dot" />Ticket-Yetu</div>
          <p>Every event in the city, one search away — from campus fests to Sunday service.</p>
        </div>

        <form className="footer-newsletter" onSubmit={handleSubscribe}>
          <h4>Stay in the loop</h4>
          <p>New events near you, once a week. No spam.</p>
          <div className="search-bar" style={{ marginTop: 12 }}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </div>
          {status && (
            <p className={status.success ? 'footer-note-ok' : 'error-text'}>
              {status.success
                ? (status.alreadySubscribed ? "You're already on the list." : "You're in — thanks for subscribing.")
                : status.error}
            </p>
          )}
        </form>
      </div>

      <div className="footer-columns">
        <div className="footer-col">
          <h5>Discover</h5>
          <Link to="/events">Browse all events</Link>
          <Link to="/events?category=music">Music</Link>
          <Link to="/events?category=campus">Campus</Link>
          <Link to="/events?category=church">Church</Link>
          <Link to="/events?category=sports">Sports Events</Link>
        </div>

        <div className="footer-col">
          <h5>For organisers</h5>
          <Link to="/organiser/events/new">Create an event</Link>
          <Link to="/organiser">Organiser dashboard</Link>
          <Link to="/organiser/data">Data tools</Link>
        </div>

        <div className="footer-col">
          <h5>Support</h5>
          <Link to="/my-tickets">My tickets</Link>
          <a href="mailto:hello@TicketYetu">Contact us</a>
          <a href="#" onClick={(e) => e.preventDefault()} title="Coming soon">Terms</a>
          <a href="#" onClick={(e) => e.preventDefault()} title="Coming soon">Privacy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Ticket-Yetu — built for organisers and attendees alike.</span>
        <span className="footer-socials">Instagram · X · Facebook</span>
      </div>
    </footer>
  );
}

