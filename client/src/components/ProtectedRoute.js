import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';
import { Navigate} from 'react-router-dom';

export default function ProtectedRoute ({children}) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)

    //eslint-disable-next-line   
    const getUser = async () => {
        try {
            dispatch(showLoading());
    
            const token = localStorage.getItem("token");
            console.log("Token being sent:", token); 
    
            const res = await axios.post('/api/v1/user/getUserData', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            dispatch(hideLoading());
    
            console.log("User API Response:", res.data);  
    
            if (res.data.success) {
                console.log("Dispatching setUser with:", res.data.data);  
                dispatch(setUser(res.data.data));  
            } else {
                dispatch(setUser(null));
                localStorage.clear();
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            console.log("Error in getUser:", error);
        }
    };
    

    useEffect(() => {
        if (!user){
            getUser();
        }
    }, [user, getUser]); 
    if (localStorage.getItem("token")) {
        return children;
    }else{
        return <Navigate to ="/login"/>;
    }
}
