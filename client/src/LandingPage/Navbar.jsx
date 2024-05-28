import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div>
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
    </div>
  );
}

export default Navbar;
