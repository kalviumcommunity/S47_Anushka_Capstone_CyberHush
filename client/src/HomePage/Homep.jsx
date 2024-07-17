import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomeP.module.css";

function HomeP() {
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}>CyberHush</div>
        <div className={styles.navLinks}>
          <Link to="/report" className={styles.link}>Report</Link>
          <Link to="/education" className={styles.link}>Education</Link>
          <Link to="/faq" className={styles.link}>FAQ</Link>
          <Link to="/feedback" className={styles.link}>Feedback</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
        </div>
      </header>
      <main className={styles.homepageContent}>
        <section className={styles.heroSection}>
          <h1>Welcome to CyberHush</h1>
          <p>
            Your trusted platform for cybercrime awareness and reporting. Empower yourself with knowledge, seek assistance, and report incidents without fear.
          </p>
        </section>
        <section className={styles.featuresSection}>
          <h2>Explore Our Features</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>Report Cybercrimes</h3>
              <p>
                Have you experienced or witnessed a cybercrime? Report it here and help us make the digital world safer.
              </p>
              <Link to="/report" className={styles.featureLink}>Report Now</Link>
            </div>
            <div className={styles.feature}>
              <h3>Learn About Cybercrimes</h3>
              <p>
                Educate yourself about various types of cybercrimes such as online harassment, phishing, and more.
              </p>
              <Link to="/education" className={styles.featureLink}>Start Learning</Link>
            </div>
          </div>
        </section>
        <section className={styles.testimonialsSection}>
          <h2>What Our Users Say</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <p>
                "CyberHush provided me with the knowledge and support I needed to handle a cyberbullying incident. Highly recommend!"
              </p>
              <p className={styles.user}>- A satisfied user</p>
            </div>
            <div className={styles.testimonial}>
              <p>
                "The reporting process was quick and easy. I felt safe sharing my experience."
              </p>
              <p className={styles.user}>- Another happy user</p>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 CyberHush. All rights reserved.</p>
      </footer>
    </>
  );
}

export default HomeP;
