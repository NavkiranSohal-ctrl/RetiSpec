const express = require ('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllPatientsController } = require('../controllers/adminCtrl')

const router = express.Router()

router.get('/getAllPatients', authMiddleware, getAllPatientsController)



module.exports = router