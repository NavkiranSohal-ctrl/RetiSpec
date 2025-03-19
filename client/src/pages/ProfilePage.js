import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { Card, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null);

    
    const getUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('/api/v1/user/getUserData', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success) {
                setUserData(res.data.data); 
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Layout>
    <h1 style={{ textAlign: "center" }}>Profile</h1>
    <Card 
        style={{ 
            width: 500,  
            margin: "auto", 
            textAlign: "center", 
            padding: "30px",  
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
            borderRadius: "10px" 
        }}
    >
        <Avatar size={80} icon={<UserOutlined />} style={{ marginBottom: "15px" }} />
        {userData ? (
            <>
                <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{userData.name}</h2>
                <p style={{ fontSize: "18px", color: "gray" }}>Email: {userData.email}</p>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </Card>
</Layout>

    );
};

export default ProfilePage;
