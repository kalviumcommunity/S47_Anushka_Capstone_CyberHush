import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h1>Update Report</h1>
            <form onSubmit={handleSubmit}>
                <label>Report Type:</label>
                <input
                    type="text"
                    name="reportType"
                    value={report.reportType}
                    onChange={handleChange}
                />
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={report.description}
                    onChange={handleChange}
                />
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={report.date}
                    onChange={handleChange}
                />
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={report.location}
                    onChange={handleChange}
                />
                <label>Status:</label>
                <input
                    type="text"
                    name="status"
                    value={report.status}
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateReport;
