import React from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

function FAQ() {
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
      <div>
        <h1>Frequently Asked Questions</h1>
        <h4>1. What is CyberHush and what is its purpose?</h4>
        <p>
          CyberHush is a platform dedicated to cybercrime awareness and
          reporting. Its primary purpose is to educate users about various cyber
          threats and provide a safe space for reporting incidents without fear
          of repercussions.
        </p>
        <h4>2. How can CyberHush help me stay safe online?</h4>
        <p>
          CyberHush offers comprehensive information on cyber threats such as
          online harassment, phishing, and more. By staying informed through
          CyberHush, users can recognize potential dangers and take proactive
          measures to protect themselves online.
        </p>
        <h4>3. How can I report a cybercrime incident on CyberHush?</h4>
        <p>
          Reporting a cybercrime incident on CyberHush is easy. Simply navigate
          to the reporting section of the platform and follow the provided
          instructions to submit details about the incident, including any
          relevant evidence or documentation.
        </p>
        <h4>4. Is CyberHush free to use?</h4>
        <p>
          Yes, CyberHush is completely free to use for all users. We believe
          that access to information and support related to cybercrime should be
          available to everyone without any barriers.
        </p>
        <h4>5. Who can use CyberHush?</h4>
        <p>
          CyberHush is open to anyone concerned about cybercrime, including
          individuals, organizations, and communities. Our platform aims to
          empower everyone to combat cyber threats collectively.
        </p>
      </div>
    </>
  );
}

export default FAQ;
