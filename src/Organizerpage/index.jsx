import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Info from "./Info";
import "./Navigation.css";
import Instructions from "./Instructions";
import Registration from "./registration";
import Footer from "./Footer";
import Login from "./Login";
import Blog from "./Blog";
import Sign from "./Sign";
import Help from "./Help";

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