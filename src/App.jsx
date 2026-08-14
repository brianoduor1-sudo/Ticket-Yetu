import { Routes, Route } from "react-router-dom";
import Navigation from "./Organizerpage/Navigation";
import Info from "./Organizerpage/Info";
import "./Organizerpage/Navigation.css";
import Instructions from "./Organizerpage/Instructions";
import Registration from "./Organizerpage/registration";
import Footer from "./Organizerpage/Footer";
import Login from "./Organizerpage/Login";
import Blog from "./Organizerpage/Blog";
import Sign from "./Organizerpage/Sign";
import Help from "./Organizerpage/Help";

function Home() {
  return (
    <>
      <Info />
      <Instructions />
      <Registration />
    </>
  );
}

function OrganizerPage() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/promoters" element={<Home />} />
         <Route path="/Blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/Help" element= {<Help />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default OrganizerPage;