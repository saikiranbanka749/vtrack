import React, { useEffect, useState } from 'react';
import { empDetailsSubmit } from './EmployeeDetailsInputs';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import "../CSS/SubmitForm.css";

const SubmitForm = () => {
    const [inputData, setInputData] = useState({});
    const [empDetailsEdit, setEmpDetailsEdit] = useState(empDetailsSubmit);
    const [errors, setErrors] = useState({});
    const [randomData, setRandomData] = useState("");

    const [employeeID, setEmployeeID] = useState('');

    const validateEmployeeID = (value) => {
        const pattern = /^VEN\d+$/;
        return pattern.test(value);
    };

    const handleEmployeeIDChange = (event) => {
        const { value } = event.target;
        if (validateEmployeeID(value)) {
            setErrors(prevErrors => ({ ...prevErrors, employeeID: '' }));
            setEmployeeID(value);
        } else {
            setErrors(prevErrors => ({ ...prevErrors, employeeID: 'Employee ID must start with "VEN" followed by a number.' }));
            setEmployeeID(value);
        }
    };

    const onChangeHandler = (e) => {
        const { name, value, checked, type, files } = e.target;
        const inputField = empDetailsEdit.find(ele => ele.name === name);
        let error = '';

        if (type === "checkbox") {
            const existingValues = inputField.value || [];
            if (checked) {
                existingValues.push(value);
            } else {
                const index = existingValues.indexOf(value);
                if (index !== -1) {
                    existingValues.splice(index, 1);
                }
            }
            inputField.value = existingValues;
            setInputData(prevInputData => ({ ...prevInputData, [name]: existingValues }));
        } else if (type === "file") {
            if (files && files.length > 0) {
                const file = files[0];
                setInputData(prevInputData => ({ ...prevInputData, [name]: file }));
            }
        } else {
            inputField.value = value;
            if (type !== "radio" && value.trim() === "") {
                error = inputField.errMsg;
            } else {
                setInputData(prevInputData => ({ ...prevInputData, [name]: value }));
            }
        }

        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };


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
        console.log("randomData:::", result);
    }, [])

    const submitHandler = () => {
        const pwd = randomData;
        const currDate = new Date();
        const updated_date =` ${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;
        const status = "Active";

        let isValid = true;
        const newErrors = {};

        const name = inputData.e_name;
        const email = inputData.email;
        const serviceId = 'service_1z6g35a';
        const templateId = 'template_wwbn91k';
        const userId = '5dCYy2nTf2hjOK451';
        const templateParams = {
            to_Subject: 'Employee Credentials',
            to_email: email,
            to_name: name,
            from_name: 'Vensai',
            message: pwd
        };

        empDetailsEdit.forEach(input => {
            if (input.value === "" || (Array.isArray(input.value) && input.value.length === 0)) {
                newErrors[input.name] = input.errMsg;
                isValid = false;
            }
            else {
                isValid = true;
            }
        });

        if (!validateEmployeeID(employeeID)) {
            newErrors.employeeID = 'Employee ID must start with "VEN" followed by a number.';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            console.log("clicked.........");
            console.log(inputData.e_location);
            const formData = new FormData();
            formData.append("id", employeeID);
            formData.append("e_name", inputData.e_name);
            formData.append("email", inputData.email);
            formData.append("e_role", inputData.e_role);
            formData.append("designation", inputData.designation);
            formData.append("manager", inputData.manager);
            formData.append("e_location", inputData.e_location);
            formData.append("contact", inputData.contact);
            formData.append("gender", inputData.gender);
            formData.append("project_name", inputData.project_name);
            formData.append("joining_date", inputData.joining_date);
            formData.append("blood_group", inputData.blood_group);
            formData.append("photo", inputData.photo);
            formData.append("status", status);
            formData.append("updated_date", updated_date);
            formData.append("dob", inputData.dob);
            formData.append("anniversary_date", inputData.anniversary_date);
            formData.append("father_name", inputData.father_name);
            formData.append("mother_name", inputData.mother_name);
            formData.append("present_address", inputData.present_address);
            formData.append("permenant_address", inputData.permenant_address);
            formData.append("family_contact", inputData.family_contact);
            formData.append("pwd", pwd);
            axios.post(`http:///192.168.2.114:3003/employeePortal/post-employeePortal`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    setEmpDetailsEdit(empDetailsSubmit.map(ele => {
                        return { ...ele, value: ""}
                    }));
                    setInputData({});
                    setEmployeeID('');
                    alert("Data added successfully...");
                    console.log("Response:", res.data);
                    emailjs.send(serviceId, templateId, templateParams, userId)
                        .then((res) => {
                            console.log('Email sent successfully!');
                        })
                        .catch((error) => {
                            console.error('Error sending email:', error);
                        });
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='content-p'>
            <div className='register-table'>

                <div className="form-container">
                    <div className="form-left">
                        <table className='emp-form-table'>
                            <tbody>
                                <tr>
                                    <td className='td-label'>Employee Id <span style={{ color: "red" }}>*</span></td>
                                    <td className='td-input'>
                                        <input
                                            name="id"
                                            value={employeeID}
                                            onChange={handleEmployeeIDChange}
                                            type="text"
                                            className='inputField'
                                            placeholder="VEN123"
                                        />
                                        {errors.employeeID && <span className="error">{errors.employeeID}</span>}
                                    </td>
                                </tr>
                                {empDetailsEdit?.slice(0, Math.ceil(empDetailsEdit.length / 2)).map((ele, i) => (
                                    <tr key={i}>
                                        <td className='td-label'>
                                            {ele.label !== "Relieving date" && (
                                                <>
                                                    {ele?.label} {ele?.label === "Family Inforamation" ? <span> :</span> : <span style={{ color: "red" }}>*</span>}
                                                </>
                                            )}
                                        </td>
                                        <td className='td-input'>
                                            {ele.type === "file" ? null : ele.type === "radio" ?
                                                <>
                                                    {ele.type === "radio" && ele.name !== "status" && (
                                                        <>
                                                            {ele?.Options.map((option, index) => (
                                                                <div key={index}>
                                                                    <input name={ele.name} onChange={onChangeHandler} type={ele.type} value={option} />
                                                                    <label>{option}</label>
                                                                </div>
                                                            ))}
                                                            <span className="error">{errors[ele.name]}</span>
                                                        </>
                                                    )}
                                                </>
                                                :
                                                ele?.type === "select" ? null :
                                                    ele?.label !== "Family Inforamation" &&
                                                    <React.Fragment>
                                                        {ele.name !== "relieving_date" && ele.name !== "updated_date" && (
                                                            <>
                                                                <input name={ele.name} onChange={onChangeHandler} value={ele.value} type={ele.type} className='inputField' />
                                                                <span className="error">{errors[ele.name]}</span>
                                                            </>
                                                        )}
                                                    </React.Fragment>
                                            }
                                            {ele?.type === "select" &&
                                                <React.Fragment>
                                                    <select className='inputField' onChange={onChangeHandler} name={ele.name}>
                                                        <option value="">Select</option>
                                                        {ele?.Options.map((option, index) => (
                                                            <option value={option} key={index}>{option}</option>
                                                        ))}
                                                    </select>
                                                    <span className="error">{errors[ele.name]}</span>
                                                </React.Fragment>
                                            }
                                            {ele?.type === "file" &&
                                                <React.Fragment>
                                                    <input type={ele?.type} name={ele.name} accept="image/*" onChange={onChangeHandler} />
                                                </React.Fragment>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-right">
                        <table className='emp-form-table-2'>
                            <tbody>
                                {empDetailsEdit?.slice(Math.ceil(empDetailsEdit.length / 2)).map((ele, i) => (
                                    <tr key={i}>
                                        <td className='td-label'>
                                            {ele.label !== "Status" && ele.label !== "Updated" && ele.label !== "Relieving date " && (
                                                <>
                                                    {ele?.label} {ele?.label === "Family Inforamation" ? <span> :</span> : <span style={{ color: "red" }}>*</span>}
                                                </>
                                            )}
                                        </td>
                                        <td className='td-input'>
                                            {ele.type === "file" ? null : ele.type === "radio" ?
                                                <>
                                                    {ele.type === "radio" && ele.name !== "status" && (
                                                        <>
                                                            {ele?.Options.map((option, index) => (
                                                                <div key={index}>
                                                                    <input name={ele.name} onChange={onChangeHandler} type={ele.type} value={option} />
                                                                    <label>{option}</label>
                                                                </div>
                                                            ))}
                                                            <span className="error">{errors[ele.name]}</span>
                                                        </>
                                                    )}
                                                </>
                                                :
                                                ele?.type === "select" ? null :
                                                    ele?.label !== "Family Inforamation" &&
                                                    <React.Fragment>
                                                        {ele.name !== "relieving_date" && ele.name !== "updated_date" && (
                                                            <>
                                                                <input name={ele.name} onChange={onChangeHandler} value={ele.value} type={ele.type} className='inputField' />
                                                                <span className="error">{errors[ele.name]}</span>
                                                            </>
                                                        )}
                                                    </React.Fragment>
                                            }
                                            {ele?.type === "select" &&
                                                <React.Fragment>
                                                    <select className='inputField' onChange={onChangeHandler} name={ele.name}>
                                                        <option value="">Select</option>
                                                        {ele?.Options.map((option, index) => (
                                                            <option value={option} key={index}>{option}</option>
                                                        ))}
                                                    </select>
                                                    <span className="error">{errors[ele.name]}</span>
                                                </React.Fragment>
                                            }
                                            {ele?.type === "file" &&
                                                <React.Fragment>
                                                    <input type={ele?.type} name={ele.name} accept="image/*" onChange={onChangeHandler} />
                                                </React.Fragment>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="button-container">
                        <button onClick={submitHandler} className='table-btn'>New register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitForm;