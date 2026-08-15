import "./instructions.css";

function Instructions() {
  return (
    <section className="instructions">
      <h1 className="instructions-title">How to Become a Promoter</h1>
      <p className="instructions-subtitle">
        Follow these simple steps to list your event on TicketYetu.
      </p>

      <div className="instructions-timeline">
        
        <div className="instructions-step">
          <div className="instructions-step-marker">
            <span className="instructions-number">1</span>
            <span className="instructions-line" />
          </div>
          <div className="instructions-step-content">
            <h2 className="instructions-step-title">
              Verify your organisation credentials
            </h2>
            <div className="instructions-card">
              <ul className="instructions-bullets">
                <li>
                  The promoter must have a{" "}
                  <strong>valid organisation email address</strong> (e.g.
                  events@yourorg.com).
                </li>
                <li>
                  A <strong>valid PayPal account</strong> linked to the
                  organisation email is required for payouts.
                </li>
              </ul>
            </div>
          </div>
        </div>

        
        <div className="instructions-step">
          <div className="instructions-step-marker">
            <span className="instructions-number">2</span>
            <span className="instructions-line" />
          </div>
          <div className="instructions-step-content">
            <h2 className="instructions-step-title">
              Send your event information to{" "}
              <a
                className="instructions-link"
                href="mailto:ticketyetu.@events.com"
              >
                ticketyetu.@events.com
              </a>
            </h2>
            <div className="instructions-card">
              <p className="instructions-card-label">
                REQUIRED ASSETS &amp; INFORMATION
              </p>
              <div className="instructions-grid">
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Event Photo</p>
                  <p className="instructions-tile-desc">330 × 320 px</p>
                </div>
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Sponsors Photo</p>
                  <p className="instructions-tile-desc">
                    One image 300 × 300 px · or individual logos 80 × 80 px
                    each
                  </p>
                </div>
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Slideshow Image</p>
                  <p className="instructions-tile-desc">800 × 305 px</p>
                </div>
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Event Name</p>
                  <p className="instructions-tile-desc">
                    Full official name of the event
                  </p>
                </div>
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Event Description</p>
                  <p className="instructions-tile-desc">
                    What attendees can expect
                  </p>
                </div>
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Event Price</p>
                  <p className="instructions-tile-desc">
                    If multiple ticket tiers exist, list each price and the
                    date each tier goes on sale
                  </p>
                </div>
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Event Date &amp; Time</p>
                  <p className="instructions-tile-desc">
                    Start and end date, doors-open time
                  </p>
                </div>
                <div className="instructions-tile">
                  <p className="instructions-tile-title">Event Venue</p>
                  <p className="instructions-tile-desc">
                    Full venue name and address
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="instructions-step">
          <div className="instructions-step-marker">
            <span className="instructions-number">3</span>
            <span className="instructions-line" />
          </div>
          <div className="instructions-step-content">
            <h2 className="instructions-step-title">
              Your event goes live within 3 hours
            </h2>
            <div className="instructions-card">
              <p className="instructions-paragraph">
                Once we receive your submission our team reviews and
                publishes your event listing within <strong>3 hours</strong>.
                You will receive a confirmation email as soon as it is live.
              </p>
            </div>
          </div>
        </div>

        
        <div className="instructions-step instructions-step-last">
          <div className="instructions-step-marker">
            <span className="instructions-number">4</span>
          </div>
          <div className="instructions-step-content">
            <h2 className="instructions-step-title">
              Pricing discussion with our team
            </h2>
            <div className="instructions-card">
              <p className="instructions-paragraph">
                Once everything is authenticated, our team will reach out to
                your organisation via <strong>email</strong> to discuss how
                TicketYetu will price the tickets on the main platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Instructions;
