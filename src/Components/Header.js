import React, { useEffect, useState } from 'react';
import "../CSS/Header.css";
import { useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { FaSignOutAlt } from "react-icons/fa";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TfiPowerOff } from "react-icons/tfi";
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [role, setRole] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [emp_id, setEmp_id] = useState("");


    const Clicked = () => {
        // dispatch({ type: "SELECTED-DATA", payload: null });
        // navigate('/Home');
        // window.history.back();
        window.history.back();
    }
    const Signout = () => {
        localStorage.clear();
        if (window.confirm("Are you sure?")) {
            sessionStorage.clear();
            navigate('/')
        }

    }
    // let roleData="";
    useEffect(() => {
        setRole(sessionStorage.getItem("role"));
        setEmp_id(sessionStorage.getItem("emp_id"));
        console.log(window.location.pathname);
        
    }, [])
    const profileViewBtnHandler = () => {
        
        setIsValid(!isValid);
    }

    const handleView = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/employeeDetails/get_emp_details?emp_id=${emp_id}`);
            //    console.log("response data",response.data);
            dispatch({ type: "DETAILS", payload: response.data })
            navigate("/ViewProfile");
        }
        catch (e) {
            console.log(e);
        }
    }

    const skillSetHandler = () => {
        navigate("/skillsetForm");
        dispatch({type:"SKILL_SET_DATA",payload:{}})
        // console.log("clicked")
        // window.history.back();
    }
    const handleEdit=async()=>{
      const response=await  axios.get(`http://localhost:3003/employeeDetails/get_skill_set_form?emp_id=${emp_id}`)
    //   console.log("::",response.data.data[0]);
      dispatch({type:"SKILL_SET_DATA",payload:response.data.data[0]})
    }
    // console.log("roleData:::",roleData)
    return (
        <div className='Header-p'>
            <div className='Header-logo'>
                <img height="70px" width="150px" src="/assets/vensai-logo.png" alt='logo-image' />
            </div>
            {/* <div className='Header-text'>Employee Portal</div> */}
            <div className='Header-btn'>
                <button className='btn-1' onClick={role === "hr" ? Clicked : skillSetHandler} style={{
                    marginRight: "24px",
                    width: role === "hr" ? null : window.location.pathname==="/LMS-page/LMS-home"?null: "43px"
                }}><IoIosHome /> </button>
                <div>
                    <button className='btn-2' onClick={role === "hr" ? Signout : window.location.pathname==="/LMS-page/LMS-home"? Signout: profileViewBtnHandler}>{role === "hr" ? <TfiPowerOff /> : window.location.pathname==="/LMS-page/LMS-home"?  <TfiPowerOff />: <ManageAccountsIcon />}</button>
                </div>
                <div style={{ position: "absolute", right: "30px", top: "93px" }}>
                    {
                        isValid && <div>
                            <Card sx={{ minWidth: 180 }}>
                                <CardActions>
                                    <Button size="small" onClick={handleView}><RemoveRedEyeIcon style={{ color: "black", paddingRight: "10px" }} />View profile</Button>
                                </CardActions>
                                <CardActions>
                                    <Button size="small" onClick={handleEdit}><AppRegistrationIcon style={{ color: "black", paddingRight: "10px" }} />Edit</Button>
                                </CardActions>
                                <CardActions>
                                    <Button size="small" onClick={Signout}><TfiPowerOff style={{ color: "black", paddingRight: "10px" }} />Signout</Button>
                                </CardActions>
                            </Card>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Header;
