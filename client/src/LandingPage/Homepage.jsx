import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Home() {
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}>CyberHush</div>
        <div className={styles.navLinks}>
          <Link to="/faq" className={styles.link}>FAQ</Link>
          <Link to="/login" className={styles.link}>Login</Link>
          <Link to="/signup" className={styles.link}>Signup</Link>
        </div>
      </header>
      <main className={styles.homepageContent}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Empowering Digital Safety</h1>
          <p className={styles.heroText}>
            Welcome to CyberHush, where safety meets simplicity in the digital world. Whether you're exploring the web or managing your online presence, we're here to guide you with reliable tools and expert advice.
          </p>
        </div>
      </section>
        <Link to="/signup">
          <button className={styles.buttonstart}>Get Started➡️</button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 CyberHush. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;