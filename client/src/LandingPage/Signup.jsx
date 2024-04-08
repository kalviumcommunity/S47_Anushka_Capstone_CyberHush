import React, { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/registration", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch(error => {
        console.log("Error" ,error);
      })
  };

  return (
    <div className={styles.container2}>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="First Name"
          name="Firstname"
          value={formData.Firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="Lastname"
          value={formData.Lastname}
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
          type="text"
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
        <button type="submit">Register</button>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
