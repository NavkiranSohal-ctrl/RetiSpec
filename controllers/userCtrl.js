const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const PatientModel= require('../models/PatientModel')

//register callback
const registerController = async(req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if (existingUser){
            return res.status(400).send({message: "User Already Exist", success:false});
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message: "Register Successfully", success: true});
    }catch(error){
        console.log(error)
        res.status(500).send({success: false, message: `Register Controller ${error.message}`})
    }
}

// login callback
const loginController = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .send({ message: "user not found", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .send({ message: "Invlid EMail or Password", success: false });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).send({ message: "Login Success", success: true, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
  };


  const authController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };


  const addPatientController = async (req, res) => {
    try {
        console.log("Request received:", req.body); 

        const newPatient = new PatientModel({ ...req.body }); 
        await newPatient.save();

        console.log("Patient saved successfully"); 

        res.status(201).json({
            success: true,
            message: 'Patient details added successfully',
        });
    } catch (error) {
        console.error("Error in addPatientController:", error); 
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while adding patient',
        });
    }
};


  


module.exports = {loginController, registerController, authController, addPatientController};

