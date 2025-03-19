const PatientModel = require ('../models/PatientModel')

const getAllPatientsController = async(req,res) => {
    try{
        const Patients = await PatientModel.find({})
        res.status(200).send({
            success:true,
            message: 'Patients data',
            data: Patients
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'error while fetching users', error
        })
    }

}

module.exports = {getAllPatientsController }