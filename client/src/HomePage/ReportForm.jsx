import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./ReportForm.module.css";

function ReportForm() {
  const [formData, setFormData] = useState({
    reportType: "",
    description: "",
    date: "",
    location: "",
    image: null,
    status: "Pending",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append("reportType", formData.reportType);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("date", formData.date);
    formDataWithImage.append("location", formData.location);
    formDataWithImage.append("image", formData.image);
    formDataWithImage.append("status", formData.status);

    try {
      console.log(formDataWithImage);
      const response = await axios.post("http://localhost:5000/addreport", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Report submitted successfully");
      setFormData({
        reportType: "",
        description: "",
        date: "",
        location: "",
        image: null,
        status: "Pending",
      });
      navigate("/report");
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className={styles.addReport}>
      <h1>Report</h1>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <label htmlFor="reportType">Report Type:</label>
        <input
          type="text"
          id="reportType"
          name="reportType"
          value={formData.reportType}
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportForm;
