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
      <h1 className={styles.title}>Report</h1>
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <label htmlFor="reportType" className={styles.label}>Crime Type:</label>
        <input
          type="text"
          id="reportType"
          name="reportType"
          value={formData.reportType}
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor="description" className={styles.label}>Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
        />
        <label htmlFor="date" className={styles.label}>Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor="location" className={styles.label}>Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor="image" className={styles.label}>Evidence (You cannot change the evidence after submitting):</label>
        <input type="file" id="image" name="image" onChange={handleImageChange} className={styles.input} />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default ReportForm;
