import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FAQ.module.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </header>
      <div className={styles.container}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <div className={styles.main}>
          <div className={styles.card}>
            <h4
              className={styles.question}
              onClick={() => handleQuestionClick(0)}
            >
              1. What is CyberHush and what is its purpose?
            </h4>
            {activeIndex === 0 && (
              <p className={styles.answer}>
                CyberHush is a platform dedicated to cybercrime awareness and
                reporting. Its primary purpose is to educate users about various
                cyber threats and provide a safe space for reporting incidents
                without fear of repercussions.
              </p>
            )}
          </div>
          <div className={styles.card}>
            <h4
              className={styles.question}
              onClick={() => handleQuestionClick(1)}
            >
              2. How can CyberHush help me stay safe online?
            </h4>
            {activeIndex === 1 && (
              <p className={styles.answer}>
                CyberHush offers comprehensive information on cyber threats such
                as online harassment, phishing, and more. By staying informed
                through CyberHush, users can recognize potential dangers and
                take proactive measures to protect themselves online.
              </p>
            )}
          </div>
          <div className={styles.card}>
            <h4
              className={styles.question}
              onClick={() => handleQuestionClick(2)}
            >
              3. How can I report a cybercrime incident on CyberHush?
            </h4>
            {activeIndex === 2 && (
              <p className={styles.answer}>
                Reporting a cybercrime incident on CyberHush is easy. Simply
                navigate to the reporting section of the platform and follow the
                provided instructions to submit details about the incident,
                including any relevant evidence or documentation.
              </p>
            )}
          </div>
          <div className={styles.card}>
            <h4
              className={styles.question}
              onClick={() => handleQuestionClick(3)}
            >
              4. Is CyberHush free to use?
            </h4>
            {activeIndex === 3 && (
              <p className={styles.answer}>
                Yes, CyberHush is completely free to use for all users. We
                believe that access to information and support related to
                cybercrime should be available to everyone without any barriers.
              </p>
            )}
          </div>
            <h4
              className={styles.question}
              onClick={() => handleQuestionClick(4)}
            >
              5. Who can use CyberHush?
            </h4>
            {activeIndex === 4 && (
              <p className={styles.answer}>
                CyberHush is open to anyone concerned about cybercrime,
                including individuals, organizations, and communities. Our
                platform aims to empower everyone to combat cyber threats
                collectively.
              </p>
            )}
        </div>
      </div>
    </>
  );
}

export default FAQ;
