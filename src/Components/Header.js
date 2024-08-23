import React from 'react';
import "../CSS/Header.css";
import { useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { FaSignOutAlt } from "react-icons/fa";
import { TfiPowerOff } from "react-icons/tfi";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const Clicked = () => {

        // sessionStorage.clear();
        // sessionStorage.clear();
        dispatch({ type: "SELECTED-DATA", payload: null });
        navigate('/Home');
    }
    const Signout = () => {
        localStorage.clear();
        if (window.confirm("Are you sure?")) {
            sessionStorage.clear();
            navigate('/')
        }

    }
    return (
        <div className='Header-p'>
            <div className='Header-logo'>
                <img height="70px" width="150px" src="/assets/vensai-logo.png" alt='logo-image' />
            </div>
            {/* <div className='Header-text'>Employee Portal</div> */}
            <div className='Header-btn'>
                <button className='btn-1' onClick={Clicked} style={{ marginRight: "24px" }}><IoIosHome /> </button>
                <div>
                    <button className='btn-2' onClick={Signout}><TfiPowerOff /></button>
                </div>
            </div>

        </div>
    )
}

export default Header;
