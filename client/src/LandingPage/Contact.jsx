import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";

function Contact() {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(`${import.meta.env.VITE_SECRET_KEY}`, `${import.meta.env.VITE_TEMPLATE_KEY}`,formRef.current,{
          publicKey: `${import.meta.env.VITE_PUBLIC_KEY}`,
        }
      )
      .then(
        (result) => {
          console.log("Message sent successfully!");
          setSubmitted(true);
        },
        (error) => {
          console.error("Error sending message:", error.text);
          setErrorMessage("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.navLinks}>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </header>
        <div className={styles.formContainer}>
          {submitted ? (
            <p>Form submitted successfully!</p>
          ) : (
            <div>
              <h1>Contact Us</h1>
              <p>We're here to help. Reach out to us using the form below.</p>
              <form ref={formRef} onSubmit={sendEmail}>
                <label htmlFor="from_name">Name</label>
                <input type="text" id="from_name" name="from_name" required />
                <label htmlFor="from_email">Email</label>
                <input type="email" id="from_email" name="from_email" required />
                <label htmlFor="from_mobile">Mobile Number</label>
                <input type="tel" id="from_mobile" name="from_mobile" pattern="[0-9]{10}" required />
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required />
                <input type="submit" value="Submit" />
                {errorMessage && <p>{errorMessage}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
  );
}

export default Contact;
