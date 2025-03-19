import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchAiReadiness = async (patients) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/check_ai_readiness`, { patients });
        return response.data.patients;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};


