import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Report.module.css";

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



  return (
    <div className={styles.reportContainer}>
      <header className={styles.navbar}>
        <div className={styles.logo}>Logo</div>
        <nav className={styles.navLinks}>
          <Link to="/education" className={styles.navLink}>
            Education
          </Link>
          <Link to="/faq" className={styles.navLink}>
            FAQ
          </Link>
          <Link to="/feedback" className={styles.navLink}>
            Feedback
          </Link>
          <Link to="/contact" className={styles.navLink}>
            Contact
          </Link>
          <Link to="/add">
            <button className={styles.activeButton}>Report</button>
          </Link>
        </nav>
      </header>
      <div className={styles.reportCardContainer}>
        {reports.map((report) => (
          <div key={report._id} className={styles.reportCard}>
            <h2 className={styles.reportTitle}>
              Report Type: {report.reportType}
            </h2>
            <p className={styles.reportDescription}>
              Description: {report.description}
            </p>
            <p className={styles.reportDate}>Date: {report.date}</p>
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
              <div className={styles.reportButtons} >
                <Link to={`/edit/${report._id}`}>
                    <button className={styles.editButton}>Update</button>
                </Link>
                <button className={styles.deleteButton} >
                    Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;