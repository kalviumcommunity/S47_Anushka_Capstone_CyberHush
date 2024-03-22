import React from "react";
import "../LandingPage/Homepage.css";
import { Link } from "react-router-dom";

function HomeP(){
  return (
    <>
    <header className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/report">Report</Link>
        <Link to="/education">Education</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/feedback">FeedBack</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </header>
    <div className="main">
      <h1>CyberHusk</h1>
      <p>A good act does not wash out the bad, nor a bad act the good. Each should have its own reward.</p>

    </div>
    </>
  )
}

export default HomeP