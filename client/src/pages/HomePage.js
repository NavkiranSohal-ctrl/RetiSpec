import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import Layout from '../components/Layout';
import { Bar } from "react-chartjs-2";
import { Card } from "antd";
import "chart.js/auto";
import axios from 'axios';

const HomePage = () => {
    const dispatch = useDispatch();
    const [siteData, setSiteData] = useState(null);
    const [patients, setPatients] = useState([]); 

    
    const getUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token being sent in HomePage:", token);

            const res = await axios.post('/api/v1/user/getUserData', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("User API Response in HomePage:", res.data);

            if (res.data.success) {
                dispatch(setUser(res.data.data));
                setPatients(res.data.data.patients); 
            }
        } catch (error) {
            console.log("Error in HomePage API Call:", error);
        }
    };

   
    const checkAIReadiness = async (patientsData) => {
        try {
            const res = await axios.post('/api/v1/user/check-ai-readiness', { patients: patientsData });
            console.log("AI Readiness Check Response:", res.data);

            
            const updatedPatients = res.data.patients;
            setPatients(updatedPatients);
        } catch (error) {
            console.error("Error in AI readiness API:", error);
        }
    };

   
    const generateSiteData = () => {
        const siteAggregation = {};

        patients.forEach((patient) => {
            const { site, AI_ready } = patient;

            if (!siteAggregation[site]) {
                siteAggregation[site] = { total: 0, ai_ready: 0 };
            }

            siteAggregation[site].total += 1;

            if (AI_ready === "Yes") {
                siteAggregation[site].ai_ready += 1;
            }
        });

        setSiteData(siteAggregation);
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (patients.length > 0) {
            
            checkAIReadiness(patients);
        }
    }, [patients]);

    useEffect(() => {
        if (patients.length > 0) {
            
            generateSiteData();
        }
    }, [patients]);

    if (!siteData) {
        return (
            <Layout>
                <h1>Statistics </h1>
                <p>Loading...</p>
            </Layout>
        );
    }

  
    const sites = Object.keys(siteData);
    const totalPatients = sites.map(site => siteData[site].total);
    const aiReadyPatients = sites.map(site => siteData[site].ai_ready);

    const chartData = {
        labels: sites,
        datasets: [
            {
                label: "Total Patients",
                data: totalPatients,
                backgroundColor: "rgba(233, 221, 214, 0.6)",
            },
            {
                label: "AI Ready Patients",
                data: aiReadyPatients,
                backgroundColor: "rgb(215, 112, 34)",
            }
        ]
    };

    return (
        <Layout>
            <h1 style={{ textAlign: "center" }}>Statistics </h1>
            <Card title="AI Ready Patients per Site" style={{ width: "80%", margin: "auto", textAlign: "center" }}>
                <Bar data={chartData} />
            </Card>
        </Layout>
    );
};

export default HomePage;
