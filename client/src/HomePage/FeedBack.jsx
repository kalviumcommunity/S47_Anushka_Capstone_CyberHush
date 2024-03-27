import React, { useState } from 'react';
import './Feedback.css';
import { FaStar } from 'react-icons/fa';

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
    <div className="feedback-form">
      {submitted ? (
        <div className="success-message">
          <p>Thank you for your feedback!</p>
          <p>We hope you have a wonderful time at Cyberhusk.</p>
          <button onClick={handleNewFeedback}>Submit Another Feedback</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Feedback Form</h2>
          <div className="form-group">
            <label>Rate us:</label>
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <FaStar
                  key={i}
                  className="star"
                  color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                  onClick={() => handleStarClick(ratingValue)}
                />
              );
            })}
          </div>

          <div className="form-group">
            <label>Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your comments here..."
              required
            />
          </div>

          <div className="form-group">
            <label>Do you recommend us?</label>
            <label>
              <input
                type="radio"
                value="true"
                checked={recommend === true}
                onChange={() => handleRecommendationChange('true')}
                required
              />
              Yes
            </label>
            <label>
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

          <div className="form-group">
            <label>Any improvements?</label>
            <input
              type="text"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="Enter any improvements here..."
              required
            />
          </div>

          <div className="form-group">
            <label>How satisfied are you with our service?</label>
            <select
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

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
