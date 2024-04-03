import React, { useState } from "react";
import styles from "./About.module.css";
import Navbar from "./Navbar";

function About() {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <>
      <Navbar />
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>
        Welcome to CyberHush – your trusted companion in the digital world!
      </h1>
      <h2 className={styles.subtitle}>
        At CyberHush, we are committed to creating a safer online environment
        for everyone. With the rapid growth of cybercrime, it has become more
        crucial than ever to educate and empower individuals to protect
        themselves and take action against cyber threats.
      </h2>
      {showFullContent ? (
        <>
          <h2 className={styles.fullContent}>
            Our mission is simple: to raise awareness about cybercrimes and
            provide a platform for users to report incidents without fear or
            hesitation. We understand that navigating the complexities of
            online security can be daunting, which is why we've developed
            CyberHush – your go-to resource for cybercrime awareness and
            reporting. Through our app, you can explore information on various
            types of cybercrimes, from online harassment to phishing scams, and
            learn how to protect yourself and your loved ones. Our user-friendly
            interface makes it easy to report cybercrime incidents you've
            experienced or witnessed, empowering you to make a difference in
            combating online threats.
            Join us in the fight against cyber threats. Let's make the internet
            a safer place for all.
          </h2>
        </>
      ) : (
        <button className={styles.button} onClick={toggleContent}>
          Read More
        </button>
      )}
    </div>
    </>
  );
}

export default About;
