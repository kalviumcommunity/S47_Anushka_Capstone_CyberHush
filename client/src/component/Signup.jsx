import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    Fullname: '',
    Username: '',
    Email: '',
    Password: '',
    age: '',
    gender: '',
    location: '',
    profilePic: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/registration', formData); // Adjust the URL as needed
      console.log('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        name="Fullname"
        value={formData.Fullname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Username"
        name="Username"
        value={formData.Username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="Password"
        value={formData.Password}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        placeholder="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        placeholder="Profile Picture URL"
        name="profilePic"
        value={formData.profilePic}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
