import React from "react";
import styles from './Homepage.module.css'
import { Link } from "react-router-dom";

function Home(){
  return (
    <div className={styles.container1}>
    <header className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.navLinks}>
        <Link to="/">Home</Link> 
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
    </header>
    <div className={styles.main}>
      <h1>CyberHusk</h1>
      <p>Actions, whether good or bad, retain their own consequences. One cannot <br></br>cleanse the other.Each merits its own consequence, its own <br></br>reward or repercussion, in the fabric of existence.</p>
      <Link to="/signup">
        <button className={styles.button}>Get Started ➡️</button>
      </Link>
    </div>
  </div>
  )
}

export default Home