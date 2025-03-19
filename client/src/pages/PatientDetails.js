import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Image } from "antd";
import Layout from "../components/Layout";
import axios from "axios";

const PatientDetails = () => {
    const { subject_id } = useParams(); 
    const [patient, setPatient] = useState(null); 

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const res = await axios.get(`/api/v1/user/patient/${subject_id}`);
                if (res.data.success) {
                    setPatient(res.data.patient); 
                }
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        fetchPatientData();
    }, [subject_id]);

    if (!patient) {
        return <h2>Patient Not Found</h2>;
    }

    return (
        <Layout>
            <h1 className="text-center">Patient Details</h1>
            <Card title={`Patient Details`} style={{ maxWidth: 600, margin: "0 auto" }}>
                <p><strong>Subject ID:</strong> {patient.subject_id}</p>
                <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
                <p><strong>Sex:</strong> {patient.sex}</p>
                <p><strong>Image Quality Score:</strong> {patient.image_quality_score}</p>
                <p><strong>Anatomy Score:</strong> {patient.anatomy_score}</p>
                <p><strong>Site:</strong> {patient.site}</p>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h3>Fundus Images</h3>
                    <div style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            <Image width={200} src={patient.fundus_image_left} alt="Left Eye" />
                            <p><strong>Over Illuminated - Left Eye?</strong> {patient.OverIlluminatedLeftEye === "Yes" ? "Yes" : "No"}</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <Image width={200} src={patient.fundus_image_right} alt="Right Eye" />
                            <p><strong>Over Illuminated - Right Eye?</strong> {patient.OverIlluminatedRightEye === "Yes" ? "Yes" : "No"}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default PatientDetails;
