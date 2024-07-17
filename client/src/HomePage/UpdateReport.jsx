import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './UpdateReport.module.css';

function UpdateReport() {
    const [report, setReport] = useState({
        reportType: '',
        description: '',
        date: '',
        location: '',
        status: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/updatereport/${id}`);
                setReport(response.data.data);
            } catch (error) {
                console.error("Error fetching report:", error);
            }
        };
        fetchReport();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReport(prevReport => ({
            ...prevReport,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/updatereport/${id}`, report);
            navigate("/report");
        } catch (error) {
            console.error("Error updating report:", error);
        }
    };

    return (
        <>
        <main className={styles.homepageContent}>
        <div className={styles.updateReportContainer}>
            <h1 className={styles.title}>Update Report</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Report Type:</label>
                    <input
                        type="text"
                        name="reportType"
                        value={report.reportType}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={report.description}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={report.date}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={report.location}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Status:</label>
                    <select
                        name="status"
                        value={report.status}
                        onChange={handleChange}
                        className={styles.input}
                    >
                        <option value="In-process">In-process</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button type="submit" className={styles.button}>Update</button>
            </form>
        </div>
        </main>
        </>
    );
}

export default UpdateReport;
