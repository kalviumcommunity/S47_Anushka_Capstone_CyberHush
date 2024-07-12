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
        <div className={styles['update-report-container']}>
            <h1 className={styles['update-report-title']}>Update Report</h1>
            <form onSubmit={handleSubmit}>
                <label className={styles['form-label']}>Report Type:</label>
                <input
                    type="text"
                    name="reportType"
                    value={report.reportType}
                    onChange={handleChange}
                    className={styles['form-input']}
                />
                <label className={styles['form-label']}>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={report.description}
                    onChange={handleChange}
                    className={styles['form-input']}
                />
                <label className={styles['form-label']}>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={report.date}
                    onChange={handleChange}
                    className={styles['form-input']}
                />
                <label className={styles['form-label']}>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={report.location}
                    onChange={handleChange}
                    className={styles['form-input']}
                />
                <label className={styles['form-label']}>Status:</label>
                <select
                    name="status"
                    value={report.status}
                    onChange={handleChange}
                    className={styles['form-input']}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <button type="submit" className={styles['submit-button']}>Update</button>
            </form>
        </div>
    );
}

export default UpdateReport;
