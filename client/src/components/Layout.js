import React from 'react';
import '../styles/LayoutStyles.css';
import { SidebarMenu } from '../Data/Sidebardata';
import { Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { message } from 'antd';



const Layout = ({children}) => {
    const {user} = useSelector(state => state.user);
    console.log("User state in Layout:", user); 
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        message.success('Logout Successfully')
        navigate("/login");
    };


  return (
    <>
    <div className='main'>
      <div className='layout'>
      <div className='sidebar'>
        <div className='logo'> 
        <img src={logo} alt="RetiSpec Logo" className="logo-img" />
            <hr/>
        </div>
        <div className='menu'>
        {SidebarMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
                //<>
                    <div key={index} className={`menu-item ${isActive && "active"}`}>
                        <i className={menu.icon}></i>
                        <Link to={menu.path}>{menu.name}</Link> 
                    </div>
                //</>
                
            );
        })}
        <div className={`menu-item`} onClick={handleLogout}>
                        <i className='fa-solid fa-right-from-bracket'></i>
                        <Link to="/login">Logout</Link> 
                    </div>
        </div>
      </div>
        <div className='content'>
        <div className='header'>
            <div className='header-content'>
            <i class="fa-solid fa-user"></i>
                <Link to="/profile">{user?.name}</Link>
            </div>
        </div>
        <div className='body'>{children}</div>

        </div>
      </div>
    </div>
    </>
  );
};

export default Layout;
