import "./Footer.css";
function Footer() {
    return (
        <footer className="footer">

            
            <div className="footer-brand">
                <div className="footer-logo">
                    <span className="logo-icon">🎟</span>
                    <h2>TicketYetu</h2>
                </div>

                <p>
                    The premier platform for discovering and
                    booking the best live experiences.
                </p>

                <p className="copyright">
                    © 2024 TicketYetu. All<br />
                    rights reserved.
                </p>
            </div>


            
            <div className="footer-column">
                <h3>Services</h3>

                <a href="/events">Events</a>
                <a href="/promoters">Promoters</a>
                <a href="/vendors">Vendors</a>
            </div>


            
            <div className="footer-column">
                <h3>Using TicketYetu</h3>

                <a href="/buy-tickets">Buy Tickets</a>
                <a href="/sell-ticket">Sell Your Ticket</a>
                <a href="/faq">FAQ</a>
            </div>


            
            <div className="footer-subscribe">
                <h3>Subscribe</h3>

                <p>
                    Get the latest event updates and
                    special offers directly to your inbox.
                </p>

                <div className="email-box">
                    <input
                        type="email"
                        placeholder="Your email address"
                    />

                    <span>✉</span>
                </div>

                <button className="subscribe-btn">
                    Subscribe
                </button>
            </div>

        </footer>
    );
}

export default Footer;