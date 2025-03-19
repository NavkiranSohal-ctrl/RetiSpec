const express = require ('express')
const morgan = require ('morgan')
const dotenv = require ('dotenv');
const connectDB = require('./config/db');


dotenv.config();


//MONGODB Connection
connectDB();

const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))



//routes
app.use('/api/v1/user', require("./routes/userRoutes"));


//listen port
const port =  process.env.PORT || 5000
connectDB().then(()=>{
    app.listen(port, () =>{
        console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`)
})

});

