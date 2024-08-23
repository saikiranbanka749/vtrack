import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import "../CSS/ExtraEmpDetailsForm.css";
import axios from "axios";
import { TfiPowerOff } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const ExtraEmpDetailsForm = () => {
    const [inputData, setInputData] = useState({
        skillSet: "",
        previousExp: "",
        resume: null,
        certifications: ""
    });
    const nav=useNavigate();

    const fileInputRef = useRef(null);

    const [number, setNumber] = useState(() => {
        const savedNumber = localStorage.getItem('lastNumber');
        return savedNumber ? parseInt(savedNumber, 10) : 0;
    });

    const generateNextNumber = () => {
        setNumber(prevNumber => {
            const nextNumber = prevNumber + 1;
            localStorage.setItem('lastNumber', nextNumber);
            return nextNumber;
        });
    };

    const changeHandler = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            if (files && files.length > 0) {
                const file = files[0];
                setInputData(prevInputData => ({ ...prevInputData, [name]: file }));
            }
        } else {
            setInputData(prevInputData => ({ ...prevInputData, [name]: value }));
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        generateNextNumber(); 
        const generate_id = "VEN" + (number + 1); 
        const formData = new FormData();

        formData.append("id", generate_id);
        formData.append("skill_set", inputData.skillSet);
        formData.append("previous_exp", inputData.previousExp);
        formData.append("resume", inputData.resume);
        formData.append("certifications", inputData.certifications);

        axios.post("http://localhost:3003/empPortal/skillSetInfo-employeePortal", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'token': sessionStorage.getItem("token")
            }
        }).then(response => {
            alert("Data submitted successfully");
            setInputData({
                skillSet: "",
                previousExp: "",
                resume: null,
                certifications: ""
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }).catch(error => {
            console.error("There was an error submitting the form:", error);
        });
    };

    const Signout=()=>{
        localStorage.clear();
        if (window.confirm("Are you sure?")) {
            sessionStorage.clear();
            nav('/')
        }
    }

    return (
        <div>
             <div style={{position:"absolute",left:"1400px", top:"40px"}}>
                    <button style={{borderRadius:"4px", borderStyle:"none"}} className='btn-2' onClick={Signout}><TfiPowerOff /></button>
                </div>
            <div className="emp-Form-card">
           
                <Card sx={{ width: 550, height: 500 }}>
                    <CardContent>
                        <table align="center">
                            <tbody>
                                <tr>
                                    <td>Skill set <span style={{ color: "red" }}>*</span></td>
                                    <td>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            style={{ width: "250px"}}
                                            // sx={{ width: "250px", '& .MuiOutlinedInput-root': { '& fieldset': { borderWidth: '4px' } } }}
                                            name="skillSet"
                                            onChange={changeHandler}
                                            value={inputData.skillSet}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Previous experience<span style={{ color: "red" }}>*</span></td>
                                    <td>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            style={{ width: "250px" }}
                                            name="previousExp"
                                            onChange={changeHandler}
                                            value={inputData.previousExp}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Resume<span style={{ color: "red" }}>*</span></td>
                                    <td>
                                        <input
                                            type="file"
                                            name="resume"
                                            onChange={changeHandler}
                                            accept="application/pdf"
                                            ref={fileInputRef} 
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Certifications<span style={{ color: "red" }}>*</span></td>
                                    <td>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            style={{ width: "250px" }}
                                            name="certifications"
                                            onChange={changeHandler}
                                            value={inputData.certifications}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                    <CardActions>
                        <Button style={{ position: "absolute", left: "75px" }} onClick={submitHandler} variant="contained">Submit</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default ExtraEmpDetailsForm;
