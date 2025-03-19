const express = require('express')
const { loginController, registerController, authController, addPatientController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

//ROUTES
//Login || Post
router.post('/login', loginController);

//Register || Post
router.post('/register', registerController);

//Auth || POST
router.post('/getUserData', authMiddleware, authController );

//Add Patient || POST
router.post('/add-patient',  authMiddleware, addPatientController); 

const axios = require('axios');
require('dotenv').config();


//Flask API || POST
const FLASK_API_BASE_URL = process.env.FLASK_API_BASE_URL;


router.post('/check-ai-readiness', async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_BASE_URL}/check_ai_readiness`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});


module.exports = router