import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Col, Form, Input, Row, Select, DatePicker, Checkbox, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const { Option } = Select;

const AddPatient = () => {
    const [leftEyeImage, setLeftEyeImage] = useState(null);
    const [rightEyeImage, setRightEyeImage] = useState(null);
    const [loadingLeftEye, setLoadingLeftEye] = useState(false);
    const [loadingRightEye, setLoadingRightEye] = useState(false);
    const [leftEyeOverIlluminated, setLeftEyeOverIlluminated] = useState(false);
    const [rightEyeOverIlluminated, setRightEyeOverIlluminated] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

    const handleImageUpload = (file, eye) => {
        if (!file) return;
    
        if (eye === "left") {
            setLoadingLeftEye(true);
        } else {
            setLoadingRightEye(true);
        }
    
        message.loading({ content: "Uploading image...", key: "upload" });
    
        setTimeout(() => {
            const imageUrl = URL.createObjectURL(file);
    
            if (eye === "left") {
                setLeftEyeImage(imageUrl);
    
                setTimeout(() => {
                    setLoadingLeftEye(false);
                    setLeftEyeOverIlluminated(true); 
                    setRightEyeOverIlluminated(false); 
                }, 3000);
            } else {
                setRightEyeImage(imageUrl);
    
                setTimeout(() => {
                    setLoadingRightEye(false);
                }, 5000);
            }
    
            message.success({ content: `${file.name} uploaded successfully`, key: "upload" });
        }, eye === "left" ? 3000 : 5000);
    };

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/add-patient', { ...values, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.success);
                navigate('/');
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something went wrong');
        }
    };

    return (
        <Layout>
            <h1 className='text-center'>Add Patient</h1>
            <Form layout="vertical" onFinish={handleFinish} className='m-3'>
                <h4 className=''>Patient Details</h4>
                <Row gutter={20}>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Subject ID" name="Subject_id" required rules={[{ required: true, message: "Subject ID is required" }]}>
                            <Input placeholder="Enter Subject ID" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Date of Birth" name="date_of_birth" required rules={[{ required: true, message: "Date of birth is required" }]}>
                            <DatePicker format="YYYY-MM-DD" placeholder="Select Date of Birth" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Sex" name="Sex" required rules={[{ required: true, message: "Sex is required" }]}>
                            <Select placeholder="Select Gender">
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Other fields */}
                    
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Image Quality Score" name="Image_Quality_Score">
                            <Select placeholder="Select Image Quality">
                                <Option value="High">High</Option>
                                <Option value="Acceptable">Acceptable</Option>
                                <Option value="Low">Low</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Anatomy Score" name="Anatomy_Score">
                            <Select placeholder="Select Anatomy Score">
                                <Option value="Good">Good</Option>
                                <Option value="Acceptable">Acceptable</Option>
                                <Option value="Poor">Poor</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Site" name="Site" required rules={[{ required: true, message: "Site is required" }]}>
                            <Input placeholder="Enter Site Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Patient
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default AddPatient;
