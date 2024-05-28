import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Report.module.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

function Report() {
  const [reports, setReports] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await axios.get("http://localhost:5000/report");
        setReports(response.data.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletereport/${id}`);
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  };

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
      <div className={styles.selectedUser}>
          <label className="label">Status:</label>
          <select value={selectedStatus} onChange={(e) => handleSelectStatus(e.target.value)} className={styles.select}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      <div className={styles.reportCardContainer}>
        {reports
          .filter((report) => !selectedStatus || report.status === selectedStatus)
          .map((report) => (
            <div key={report._id} className={styles.reportCard}>
              <h2 className={styles.reportTitle}>Crime Type: {report.reportType}</h2>
              <p className={styles.reportDescription}>Description: {report.description}</p>
              <p className={styles.reportDate}>Date: {formatDate(report.date)}</p>
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
                  <button className={styles.updateButton} onClick={() => navigate(`/update/${report._id}`)}>
                    Update
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(report._id)}>
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
