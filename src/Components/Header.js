import React from 'react';
import "../CSS/Header.css";
import { useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { useDispatch} from 'react-redux';
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
 
    
    const Clicked = () => {
        dispatch({ type: "SELECTED-DATA", payload: " " });
        navigate('/Home')
    }
    const Signout=()=>{
        localStorage.clear();
        if(window.confirm("Are you sure?")){
            navigate('/')
        }
       
    }
    return (
        <div className='Header-p'>
            <div className='Header-logo'>
                <img height="50px" width="50px" src="/assets/v-logo.png" alt='logo-image'/>
            </div>
            <div className='Header-text'>Employee Portal</div>
            <div className='Header-btn'>
            <button className='btn-1' onClick={Clicked} style={{marginRight:"24px"}}><IoIosHome /> </button> 
            <button className='btn-2' onClick={Signout}><FaSignOutAlt /> SignOut</button> </div>
            
        </div>
    )
}

export default Header;
