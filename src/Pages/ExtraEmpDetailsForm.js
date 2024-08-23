import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import "../CSS/ExtraEmpDetailsForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";

const ExtraEmpDetailsForm = () => {
    const [inputData, setInputData] = useState({
        skill_set: "",
        previous_exp: "",
        resume: null,
        certifications: ""
    });
    const [emp_id, setEmp_id] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const dispatch=useDispatch();
    const nav = useNavigate();
    const fileInputRef = useRef(null);
    let getData = useSelector(state => state.skillSetData);
    console.log("getData:::==>", getData);

    useEffect(() => {
        if (getData && Object.keys(getData).length > 0) {
            setInputData({
                skill_set: getData.skill_set || "",
                previous_exp: getData.previous_exp || "",
                resume: getData.resume || null,
                certifications: getData.certifications || ""
            });
            setIsUpdate(true);
        }
    }, [getData]);

    useEffect(() => {
        setEmp_id(sessionStorage.getItem("emp_id"));
    }, []);

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
        const formData = new FormData();

        formData.append("emp_id", emp_id);
        formData.append("skill_set", inputData.skill_set);
        formData.append("previous_exp", inputData.previous_exp);
        formData.append("resume", inputData.resume);
        formData.append("certifications", inputData.certifications);

        axios.post("http://localhost:3003/employeeDetails/skill_Set_form", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            alert("Data submitted successfully");
            setInputData({
                skill_set: "",
                previous_exp: "",
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

    const updateHandler = async () => {
        const formData = new FormData();
        formData.append("emp_id", emp_id);
        formData.append("skill_set", inputData.skill_set);
        formData.append("previous_exp", inputData.previous_exp);
        formData.append("resume", inputData.resume);
        formData.append("certifications", inputData.certifications);

        axios.put("http://localhost:3003/employeeDetails/update_skill_set_form", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            alert("Data updated successfully");
            dispatch({type:"SKILL_SET_DATA",payload:{}})
            setInputData({
                skill_set: "",
                previous_exp: "",
                resume: null,
                certifications: ""
            });
            setIsUpdate(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }).catch(error => {
            console.error("There was an error updating the form:", error);
        });
    };

    const Signout = () => {
        localStorage.clear();
        if (window.confirm("Are you sure?")) {
            sessionStorage.clear();
            nav('/');
        }
    };

    return (
        <div>
            <Header />
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
                                            style={{ width: "250px" }}
                                            name="skill_set"
                                            onChange={changeHandler}
                                            value={inputData.skill_set}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Previous experience <span style={{ color: "red" }}>*</span></td>
                                    <td>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            style={{ width: "250px" }}
                                            name="previous_exp"
                                            onChange={changeHandler}
                                            value={inputData.previous_exp}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Resume <span style={{ color: "red" }}>*</span></td>
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
                                    <td>Certifications <span style={{ color: "red" }}>*</span></td>
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
                        <Button
                            style={{ position: "absolute", left: "75px", backgroundColor: isUpdate ? "orange" : null }}
                            onClick={isUpdate ? updateHandler : submitHandler}
                            variant="contained"
                        >
                            {isUpdate ? "Update" : "Submit"}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default ExtraEmpDetailsForm;
