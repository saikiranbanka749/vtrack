import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../CSS/HomePage.css";
import Footer from "../Components/Footer";
import { Tooltip } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const HomePage = () => {
const [role,setRole]=useState("");

    useEffect(()=>{
        setRole(sessionStorage.getItem("role"));
    })
    return (
        <div>
            <Header/>
            <div className="content_p">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Tooltip title="Employee management service" arrow>
                                    <Link to={role ==="hr"?"/home":"/skillsetForm"}>
                                    <img  height="140px" width="170px" src="/assets/employee-management.png" alt="Employee management service image" />
                                    </Link>
                                </Tooltip>
                            </td>
                            <td>
                                <Tooltip title="Leave Management service" arrow>
                                    <Link to="/LMS-page/LMS-home">
                                    <img height="130px" width="130px" src="/assets/calendar_img.png" alt="v-pat image" />
                                    </Link>
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
