import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import AddPatient from './pages/AddPatient';
import ProtectedRoute from './components/ProtectedRoute';
import PatientList from './pages/PatientList';
import PatientDetails from './pages/PatientDetails';
import ProfilePage from './pages/ProfilePage';


function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/> : 
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/add-patient" element={<AddPatient/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/patient-list" element={<PatientList/>}/>
          <Route path="/patient/:subject_id" element={<PatientDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      }
        
      </BrowserRouter>
      
    </>
  );
}

export default App;
