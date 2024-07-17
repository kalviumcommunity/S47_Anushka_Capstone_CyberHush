import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './FeedBack.module.css'; // Import your CSS module

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [recommend, setRecommend] = useState(null);
  const [improvements, setImprovements] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleRecommendationChange = (value) => {
    setRecommend(value === 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', {
      rating,
      comments,
      recommend,
      improvements,
      selectedOption,
    });
    setSubmitted(true);
  };

  const handleNewFeedback = () => {
    setRating(0);
    setComments('');
    setRecommend(null);
    setImprovements('');
    setSelectedOption('');
    setSubmitted(false);
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}>CyberHush</div>
        <div className={styles.navLinks}>
          <Link to="/home" className={styles.link}>Home</Link>
          <Link to="/report" className={styles.link}>Report</Link>
          <Link to="/education" className={styles.link}>Education</Link>
          <Link to="/faq" className={styles.link}>FAQ</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
        </div>
      </header>
      <main className={styles.mainbox}>
      <div className={styles.feedbackForm}>
        {submitted ? (
          <div className={styles.successMessage}>
            <p>Thank you for your feedback!</p>
            <p>We hope you have a wonderful time at Cyberhusk.</p>
            <button className={styles.newFeedback} onClick={handleNewFeedback}>Submit Another Feedback</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Feedback Form</h2>
            <div className={styles.formGroup}>
              <label>Rate us:</label>
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    className={styles.star}
                    color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                    onClick={() => handleStarClick(ratingValue)}
                  />
                );
              })}
            </div>

            <div className={styles.formGroup}>
              <label>Comments:</label>
              <textarea
                className={styles.comments}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter your comments here..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Do you recommend us?</label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="true"
                  checked={recommend === true}
                  onChange={() => handleRecommendationChange('true')}
                  required
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="false"
                  checked={recommend === false}
                  onChange={() => handleRecommendationChange('false')}
                  required
                />
                No
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>Any improvements?</label>
              <input
                type="text"
                className={styles.input}
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder="Enter any improvements here..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>How satisfied are you with our service?</label>
              <select
                className={styles.select}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="1">Very dissatisfied</option>
                <option value="2">Dissatisfied</option>
                <option value="3">Neutral</option>
                <option value="4">Satisfied</option>
                <option value="5">Very satisfied</option>
              </select>
            </div>
            <button type="submit" lassName={styles.FormsubmitButton} >Submit</button>
          </form>
        )}
      </div>
    </main>
    </>
  );
};

export default FeedbackForm;
