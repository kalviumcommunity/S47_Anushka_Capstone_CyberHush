import React from "react";
import { Link } from "react-router-dom";
import "./HomeP.css";

function HomeP(){
  return (
    <>
    <header className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-links">
        <Link to="/report">Report</Link>
        <Link to="/education">Education</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/feedback">FeedBack</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </header>
    </>
  )
}

export default HomeP