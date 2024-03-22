import React from "react";
import './Homepage.css'
import { Link } from "react-router-dom";

function Home(){
  return (
    <>
    <header className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-links">
        <Link to="/">Home</Link> 
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
    </header>
    <div className="main">
      <h1>CyberHusk</h1>
      <p>A good act does not wash out the bad, nor a bad act the good. Each should have its own reward</p>
      <Link to="/signup">
        <button>Get Started ➡️</button>
      </Link>
    </div>
    </>
  )
}

export default Home