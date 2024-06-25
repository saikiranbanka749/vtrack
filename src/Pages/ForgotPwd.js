import React, { useEffect, useState } from "react";
import "../CSS/ForgotPwd.css";
import emailjs from '@emailjs/browser';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPwd = () => {
    const [randomData, setRandomData] = useState("");
    const [emailData, setEmailData] = useState("");
    const [confirmInput, setConfirmInput] = useState({
        pwd: "",
        confirmPwd: ""
    });
    const [isVaild, setIsValid] = useState(true);
    const [userData, setUserData] = useState({});
    const nav = useNavigate();
    const [input, setInput] = useState("");
    const [isOptValid, setIsOptValid] = useState(false);

    useEffect(() => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';

        for (let i = 0; i < 3; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        for (let i = 0; i < 2; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        setRandomData(result);
    }, []);

    const changeHandler = (e) => {
        setConfirmInput({ ...confirmInput, [e.target.name]: e.target.value });
    };

    const confirmSubmitHandler = (e) => {
        e.preventDefault();
        const { pwd, confirmPwd } = confirmInput;
        const id = userData.id;

        const data = { id, pwd };
        if (pwd === confirmPwd) {
            axios.put("http://localhost:3003/employeePortal/confirmPwd-employeePortal", data).then((res) => {
                alert("Password changed successfully");
                nav("/");
                setConfirmInput({
                    confirmPwd: "",
                    pwd: ""
                });
            }).catch(err => console.log(err));
        } else {
            alert("Incorrect pin");
        }

        console.log("data:::", data);
    };

    const otpHandler = (e) => {
        e.preventDefault();
        if (input === randomData) {
            setIsOptValid(true);
        }
        else{
            alert("In correct OTP");
        }
    };

    const submitHandler = () => {
        const serviceId = 'service_6l2ddvt';
        const templateId = 'template_uvb14vn';
        const userId = 'ODfkcgDBY15pDlkE0';
        const templateParams = {
            to_Subject: 'Employee Credentials',
            to_email: emailData,
            message: randomData
        };

        axios.get(`http://localhost:3003/employeePortal/get-employeePortal`, { params: { email: emailData } })
            .then((res) => {
                setUserData(res.data.data[0]);
                console.log(res.data.data[0]);
                setIsValid(false);
                alert("Please check the OTP in your email id");
                setEmailData("");
                return emailjs.send(serviceId, templateId, templateParams, userId);
            })
            .then(() => {
                console.log('Email sent successfully!');
            })
            .catch((err) => {
                alert("Something went wrong");
                console.error('Error:', err);
            });
    };

    return (
        <div className="card-p">
            <div className="card1">
                <div>
                    <img src="/assets/vtrack-logo.png" alt="Vtrack logo" />
                </div>
                {isOptValid ? (
                    <>
                        <strong style={{ fontFamily: "cursive", position: "absolute", top: "330px", marginLeft: "90px" }}>Create new Password</strong>
                        <div>
                            <table align="center" style={{ position: "absolute", top: "370px", marginLeft: "60px" }}>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="password"
                                                value={confirmInput.pwd}
                                                name="pwd"
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                                onChange={changeHandler}
                                                placeholder="New password"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type="password"
                                                name="confirmPwd"
                                                value={confirmInput.confirmPwd}
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                                onChange={changeHandler}
                                                placeholder="Confirm password"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={confirmSubmitHandler}
                                                style={{
                                                    width: "227px",
                                                    padding: "5px",
                                                    backgroundColor: "rgb(46, 133, 233)",
                                                    color: "white",
                                                    borderStyle: "none",
                                                    fontFamily: "'Times New Roman', Times, serif",
                                                    fontWeight: "bolder"
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    isVaild ? (
                        <>
                            <strong style={{ fontFamily: "cursive", position: "absolute", top: "330px", marginLeft: "60px" }}>Enter your registered email id</strong>
                            <table align="center" style={{ position: "absolute", top: "370px", marginLeft: "60px" }}>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                required
                                                onChange={(e) => setEmailData(e.target.value)}
                                                value={emailData}
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                                type="text"
                                                placeholder="Employee id"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={submitHandler}
                                                style={{
                                                    width: "227px",
                                                    padding: "5px",
                                                    backgroundColor: "rgb(46, 133, 233)",
                                                    color: "white",
                                                    borderStyle: "none",
                                                    fontFamily: "'Times New Roman', Times, serif",
                                                    fontWeight: "bolder"
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <strong style={{ fontFamily: "cursive", position: "absolute", top: "330px", marginLeft: "120px" }}>Enter OTP</strong>
                            <table align="center" style={{ position: "absolute", top: "370px", marginLeft: "60px" }}>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="password"
                                                name="otp"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={otpHandler}
                                                style={{
                                                    width: "227px",
                                                    padding: "5px",
                                                    backgroundColor: "rgb(46, 133, 233)",
                                                    color: "white",
                                                    borderStyle: "none",
                                                    fontFamily: "'Times New Roman', Times, serif",
                                                    fontWeight: "bolder"
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default ForgotPwd;
