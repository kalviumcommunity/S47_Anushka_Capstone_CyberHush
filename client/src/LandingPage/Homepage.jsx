import React from "react";
import styles from './Homepage.module.css'
import { Link } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";

function Home(){
  return (
    <div className={styles.container1}>
    <Navbar />
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