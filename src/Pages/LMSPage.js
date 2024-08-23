import React from "react";
import "../CSS/LMSPage.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link, Outlet } from "react-router-dom";

const LMSPage = () => {
    return (
        <>
            <Header />
            <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                <section className="Menu_bar_p">
                    <div>
                        <ul className="menu_bar">
                            <li><Link style={{fontSize:"15px"}} to="LMS-home">Home</Link></li>
                            <li><Link style={{fontSize:"15px"}} to="LMS-leaveFromEmp">Leave from Employee</Link></li>
                            <li><Link style={{fontSize:"15px"}} to="LMS-leaveReport">Leave report</Link></li>
                        </ul>
                    </div>
                </section>
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default LMSPage;
