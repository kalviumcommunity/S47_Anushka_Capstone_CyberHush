import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Report.module.css";
import { useNavigate } from "react-router-dom";

function Report() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/report")
      .then((response) => {
        setReports(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletereport/${id}`);
      setReports(reports.filter((report) => report._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}>CyberHush</div>
        <div className={styles.navLinks}>
          <Link to="/education" className={styles.link}>Education</Link>
          <Link to="/faq" className={styles.link}>FAQ</Link>
          <Link to="/feedback" className={styles.link}>Feedback</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <Link to="/add" className={styles.link}>Report</Link>
        </div>
      </header>
      <main className={styles.homepageContent}>
        <div className={styles.reportCardContainer}>
          {reports.map((report) => (
            <div key={report._id} className={styles.reportCard}>
              <h2 className={styles.reportTitle}>
                Report Type: {report.reportType}
              </h2>
              <p className={styles.reportDescription}>
                Description: {report.description}
              </p>
              <p className={styles.reportDate}>
                Date: {formatDate(report.date)}
              </p>
              <p className={styles.reportLocation}>Location: {report.location}</p>
              {report.image && (
                <img
                  src={`http://localhost:5000/${report.image}`}
                  alt="Report"
                  className={styles.reportImage}
                />
              )}
              <div className={styles.reportInfo}>
                <p className={styles.reportStatus}>Status: {report.status}</p>
                <div className={styles.reportButtons}>
                  <button onClick={() => navigate(`/update/${report._id}`)}>
                    Update
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDelete(report._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Report;
