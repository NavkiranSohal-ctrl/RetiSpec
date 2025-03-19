# RetiSpec (Retinal Images Review Tool)

## Overview
RetiSpec (Retinal Images Review Tool) is a MERN application with a Python backend for patient management, uploading of Fundus images, metadata processing, and statistics visualization. The web application is cloud-ready and deployable.

**README.python.md**:  Flask Backend for Over-Illumination and AI Readiness Check (app.py):   https://github.com/NavkiranSohal-ctrl/RetiSpec/blob/master/README.python.md

**Loom Recording Video Link**: https://www.loom.com/share/cd85f083b0124681b078b6f2ccdda0bd?sid=17aaa212-6a3e-413c-9c43-13eae87ddae0

## Folder Structure
```
CHAP-APP/
│── client/     # React frontend
│── server/     # Node.js backend with Express and MongoDB
│── README.md   # Project documentation
```



## Frontend (React with Redux Toolkit)
### Main Components
- **App.js**: Manages routing and displays a loading spinner when required.
- **ProtectedRoute.js**: Blocks unauthenticated users from viewing certain routes.
- **Spinner.js**: Displays a loading indicator.

### Pages
- **HomePage.js**: Dashboard page.
- **Register.js & Login.js**: Registration and login pages for users.
- **AddPatient.js**: Form to add patient details.
- **PatientList.js**: Displays a list of registered patients.
- **PatientDetails.js**: Displays detailed patient information.
- **ProfilePage.js**: Displays user profile information.

### State Management (Redux Toolkit)
#### Alert Slice (`alertSlice.js`)
Handles global UI state for loading indicators.
```javascript
const { showLoading, hideLoading } = alertSlice.actions;
```
#### User Slice (`userSlice.js`)
Stores authenticated user information.
```javascript
const { setUser } = userSlice.actions;
```
#### Store (`store.js`)
Initializes Redux store.
```javascript
const store = configureStore({
    reducer: {
        alerts: alertReducer,
        user: userReducer,
    },
});
```

## Backend (Node.js, Express, MongoDB)
### Database Connection (`db.js`)
Handles MongoDB connection.
```javascript
const mongoose = require('mongoose');
```

### Models
#### User Model (`userModel.js`)
Defines user schema.
```javascript
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
```
#### Patient Model (`patientModel.js`)
Defines patient schema.
```javascript
const PatientSchema = new mongoose.Schema({
    Subject_id: { type: String, required: true, unique: true },
    date_of_birth: { type: Date, required: true },
    Sex: { type: String, enum: ['Male', 'Female'], required: true },
    Site: { type: String, required: true }
});
```
### Controllers
#### User Controller (`userCtrl.js`)
- **registerController**: Handles user registration with password hashing.
- **loginController**: Validates login credentials and returns JWT.
- **authController**: Verifies user authentication.
- **addPatientController**: Adds a new patient record.

#### Admin Controller (`adminCtrl.js`)
- **getAllPatientsController**: Retrieves all patients from the database.

### Middleware
#### Authentication (`authMiddleware.js`)
Verifies JWT tokens.
```javascript
const token = authHeader.split(" ")[1];
JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (!err) req.body.userId = decode.id;
    next();
});
```

### Routes
#### User Routes (`userRoutes.js`)
- **POST /register**: User registration.
- **POST /login**: User login.
- **POST /getUserData**: Return details of logged in user.
- **POST /add-patient**: Add patient record.
- **POST /check-ai-readiness**: Communicate with Flask AI backend.

#### Patient Routes (`patientRoutes.js`)
- **GET /getAllPatients**: Return all the patient records.

### Server (`server.js`)
Initializes Express app, MongoDB connection, and routes.
```javascript
app.use('/api/v1/user', require("./routes/userRoutes"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
```



## Future Development

- **User Authentication (RBAC)**:
  - Add role-based access control (RBAC) to restrict image upload and data modification privileges to logged-in users.

- **Front-End UI Enhancement**:
  - Add **loading spinners** for better user experience when the images are being processed.
  - Add **error handling messages** using toast notifications for better feedback.
  - Add **patient details modification** on the API page itself.
- Expand **registration form** with more user input fields.

- **Image Preprocessing**:
  - Include image **resizing, cropping**, and **filtering** before over-illumination detection and AI processing for improved efficiency.

- **Logging and Tracking**:
  - Include **logging** of image upload, user activity, processing output, and issues for debugging purposes.
- Integrate Python code to calculate **Anatomy Score** and **Image Quality Score** for images.

- **Cloud Storage Upgrade**:
  - Move image storage and processing to **AWS S3 or Google Cloud Storage** for remote access and better scalability.





