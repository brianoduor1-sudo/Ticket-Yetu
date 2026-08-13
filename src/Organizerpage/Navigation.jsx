import { Link } from "react-router-dom";
function Navigation() {
    return (
        <nav className="navigation">

            <div className="logo-section">
                <img src="/logo.png" alt="TicketYetu logo" />
                <h1>TicketYetu</h1>
            </div>

            <div className="nav-links">
        <Link to="/events">Events</Link>
        <Link to="/promoters" >Organizers</Link>
        <Link to="/blog">Blog</Link>
            </div>

           <div className="nav-actions">
    <Link to="/help">Help</Link>
    <Link to="/login">↪ Login</Link>
    <button className="btn">Sign Up</button>
           </div>

        </nav>
    );
}

export default Navigation;