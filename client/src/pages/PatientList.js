import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"; 
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await axios.get("/api/v1/user/getAllPatients");  
                setPatients(res.data.patients); 
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []);

    const columns = [
        {
            title: "Subject ID",
            dataIndex: "subject_id",
            key: "subject_id",
        },
        {
            title: "Date of Birth",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
        },
        {
            title: "Sex",
            dataIndex: "sex",
            key: "sex",
        },
        {
            title: "Image Quality",
            dataIndex: "image_quality_score",
            key: "image_quality_score",
        },
        {
            title: "Anatomy Score",
            dataIndex: "anatomy_score",
            key: "anatomy_score",
        },
        {
            title: "Site",
            dataIndex: "site",
            key: "site",
        },
        {
            title: "AI Ready?",
            dataIndex: "AI_ready",
            key: "AI_ready",
            render: (text) =>
                text === "Yes" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                ),
        },
    ];

    return (
        <Layout>
            <h1 className="text-center">All Patients</h1>
            <Table
                dataSource={patients}
                columns={columns}
                rowKey="subject_id"
                onRow={(record) => ({
                    onClick: () => navigate(`/patient/${record.subject_id}`),
                })}
                rowClassName="clickable-row"
                style={{ cursor: "pointer" }}
            />
        </Layout>
    );
};

export default PatientList;
