const mongoose = require ('mongoose')

const PatientSchema = new mongoose.Schema({
    Subject_id:{
        type: String,
        required: [true, 'subject_id is required'],
        unique: true
    },
    date_of_birth:{
        type: Date,
        required: [true, 'Date of birth is required']
    },
    Sex:{
        type: String,
        enum: ['Male','Female'],
        required: [true, 'Sex is required']
    },
    Fundus_Image_Left_Eye:{
        type: String
    },
    Fundus_Image_Right_Eye:{
        type: String
    },
    Image_Quality_Score:{
        type: String,
        enum: ['High','Acceptable','Low']
    },
    Anatomy_Score:{
        type: String,
        enum: ['Good','Acceptable','Poor']
    },
    Site:{
        type: String,
        required: [true, 'Site is required']
    },
    Over_Illuminated:{
        type:Boolean
    }
})

const PatientModel = mongoose.model('patient',PatientSchema)
module.exports = PatientModel