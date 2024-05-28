import React from "react";
import { Link } from "react-router-dom";
import styles from './Homep.module.css';

function HomeP(){
  return (
    <>
    <header className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.navLinks}>
        <Link to="/report">Report</Link>
        <Link to="/education">Education</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/feedback">FeedBack</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </header>

    <div className={styles.main}>
      
    </div>
    </>
  )
}

export default HomeP