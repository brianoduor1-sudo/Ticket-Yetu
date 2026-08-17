import "./Help.css";

function Help() {
  return (
    <section className="help">
      <div className="help-card">
        <h1 className="help-title">SUPPORT</h1>

        <div className="help-body">
          <h2 className="help-subtitle">Contact</h2>

          <div className="help-contact">
            <p className="help-line">
              <span className="help-icon" aria-hidden="true">
                🌐
              </span>
              <span>
                Kabarnet Lane, Next to St. Nicholas Senior School
                <br />
                Nairobi
                <br />
                P.O Box 1179-00606
                <br />
                Kenya
              </span>
            </p>

            <p className="help-line">
              <span className="help-icon" aria-hidden="true">
                ✉️
              </span>
              <a href="mailto:events@ticketyetu.com">events@ticketyetu.com</a>
            </p>

            <p className="help-line">
              <span className="help-icon" aria-hidden="true">
                📱
              </span>
              <span>+254709 816 000</span>
            </p>

            <p className="help-line help-line-website">
              <a href="https://www.ticketyetu.com" target="_blank" rel="noreferrer">
                https://www.ticketyetu.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Help;
