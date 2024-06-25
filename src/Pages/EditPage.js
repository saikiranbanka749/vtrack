import React, { useState, useEffect } from 'react';
import "../CSS/EditPage.css";
import { empDetailsSubmit } from './EmployeeDetailsInputs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialData = {
    e_name: '',
    email: '',
    e_role: '',
    designation: "",
    manager: "",
    e_location: "",
    contact: '',
    gender: [],
    project_name: '',
    joining_date: '',
    relieving_date: '',
    blood_group: '',
    photo: '',
    status: '',
    updated_date: '',
    dob: '',
    anniversary_date: '',
    father_name: '',
    mother_name: '',
    present_address: "",
    permenant_address: "",
    family_contact: ""
};

const EditPage = () => {
    const [inputData, setInputData] = useState(initialData);
    const [isBtnValid, setIsBtnValid] = useState(false);
    const getData = useSelector(state => state.profileDetails);
    const nav = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('editData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setInputData(parsedData);
        }
        setIsBtnValid(true);
    }, []);

    useEffect(() => {
        let editdata = Object.keys(getData);
        if (editdata?.length > 0) {
            localStorage.setItem('editData', JSON.stringify(getData));

            const updatedData = {
                ...getData,
                joining_date: getData.joining_date?.split('T')[0],
                relieving_date: getData.relieving_date?.split('T')[0],
                updated_date: getData.updated_date?.split('T')[0],
                dob: getData.dob?.split('T')[0],
                anniversary_date: getData.anniversary_date?.split('T')[0]
            };

            setInputData(updatedData);
            setIsBtnValid(true);
        }
    }, [getData]);

    const onChangeHandler = (e) => {
        const { name, value, checked, type, files } = e.target;
        let newValue = value;
        if (type === "checkbox") {
            if (!inputData[name]) {
                newValue = [value];
            } else {
                newValue = inputData[name].includes(value) ? inputData[name].filter(item => item !== value) : [...inputData[name], value];
            }
        } else if (type === "file") {
            if (files && files.length > 0) {
                newValue = files[0];
            }
        }

        setInputData(prevData => ({ ...prevData, [name]: newValue }));

        // Enable/disable the relieving_date based on status
        if (name === "status" && value !== "relieved") {
            setInputData(prevData => ({ ...prevData, relieving_date: '' }));
        }
    };

    useEffect(() => {
        console.log("::status:::", inputData.status);
    }, [inputData])


    const editHandler = () => {
        axios.get(`http://localhost:3003/employeePortal/get-employeePortal?e_id=${inputData.e_id}`)
            .then(res => {
                const fetchedData = res.data.data[0];
                const formattedData = {
                    ...fetchedData,
                    joining_date: fetchedData.joining_date?.split('T')[0],
                    relieving_date: fetchedData.relieving_date?.split('T')[0],
                    updated_date: fetchedData.updated_date?.split('T')[0],
                    dob: fetchedData.dob?.split('T')[0],
                    anniversary_date: fetchedData.anniversary_date?.split('T')[0]
                };

                if (Object.keys(formattedData).length > 0) {
                    setInputData(formattedData);
                    setIsBtnValid(true);
                } else {
                    alert('Id not found');
                    setIsBtnValid(false);
                }
            })
            .catch(error => {
                console.log("Error fetching employee details:", error);
            });
    };

    const updateHandler = () => {
        const currDate = new Date();
        const updated_date = `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`;
        const formData = new FormData();
        // const nullData="null";
        console.log(":::RelievingDate:::", inputData.relieving_date);
        formData.append("id", inputData.id);
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
        formData.append("relieving_date", inputData.status === "Relieved" ? inputData.relieving_date : null);
        formData.append("blood_group", inputData.blood_group);
        formData.append("photo", inputData.photo);
        formData.append("status", inputData.status);
        formData.append("updated_date", updated_date);
        formData.append("dob", inputData.dob);
        formData.append("anniversary_date", inputData.anniversary_date);
        formData.append("father_name", inputData.father_name);
        formData.append("mother_name", inputData.mother_name);
        formData.append("present_address", inputData.present_address);
        formData.append("permenant_address", inputData.permenant_address);
        formData.append("family_contact", inputData.family_contact);

        axios.put(`http://localhost:3003/employeePortal/update-employeePortal`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "authorization":sessionStorage.getItem("token")
            }
        })
            .then(res => {
                setIsBtnValid(false);
                setInputData(initialData);
                localStorage.removeItem('editData');
                alert("Data updated Successfully..");
                nav('/home');
            })
            .catch(error => {
                console.error("Error updating data:", error);
                alert("An error occurred while updating data");
            });
    };

    const half = Math.ceil(empDetailsSubmit.length / 2);
    const firstHalf = empDetailsSubmit.slice(0, half);
    const secondHalf = empDetailsSubmit.slice(half);

    return (
        <div className='content'>
            <div style={{ position: "absolute" }} className='content-p'>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <table className='emp-form-table'>
                        <tbody>
                            {firstHalf.map((ele, i) => (
                                <tr key={i}>
                                    <td className='td-label'>
                                        {ele.label !== "Updated" && inputData.status === "Relieved" ? ele.label : ele.label !== "Relieving date" && (
                                            <>
                                                {ele.label} {ele.label === "Family Inforamation" ? <span> :</span> : null}
                                            </>
                                        )}
                                    </td>
                                    <td className='td-input'>
                                        {ele.type === "file" ? null : ele.type === "radio" ? (
                                            <>
                                                {ele.Options.map((option, index) => (
                                                    <div key={index}>
                                                        <input
                                                            name={ele.name}
                                                            onChange={onChangeHandler}
                                                            type={ele.type}
                                                            value={option}
                                                            checked={inputData[ele.name] && inputData[ele.name].includes(option)}
                                                        />
                                                        <label>{option}</label>
                                                    </div>
                                                ))}
                                            </>
                                        ) : ele.type === "select" ? null : (
                                            ele.label !== "Family Inforamation" && ele.name !== "id" && ele.name !== "updated_date" && inputData.status === "Relieved" ?
                                                <>
                                                    <React.Fragment>
                                                        <input
                                                            name={ele.name}
                                                            onChange={onChangeHandler}
                                                            value={inputData[ele.name]}
                                                            type={ele.type}
                                                            className='inputField'
                                                        />
                                                    </React.Fragment>
                                                </>
                                                : ele.name !== "relieving_date" && (
                                                    <React.Fragment>
                                                        <input
                                                            name={ele.name}
                                                            onChange={onChangeHandler}
                                                            value={inputData[ele.name]}
                                                            type={ele.type}
                                                            className='inputField'
                                                        />
                                                    </React.Fragment>
                                                )
                                        )}
                                        {ele.type === "select" && (
                                            <React.Fragment>
                                                <select
                                                    className='inputField'
                                                    onChange={onChangeHandler}
                                                    name={ele.name}
                                                    value={inputData[ele.name] || ""}
                                                >
                                                    <option value="">Select</option>
                                                    {ele.Options.map((option, index) => (
                                                        <option value={option} key={index}>{option}</option>
                                                    ))}
                                                </select>
                                            </React.Fragment>
                                        )}
                                        {ele.type === "file" && (
                                            <React.Fragment>
                                                <input
                                                    type={ele.type}
                                                    name={ele.name}
                                                    accept="image/*"
                                                    onChange={onChangeHandler}
                                                />
                                            </React.Fragment>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className='emp-form-table2'>
                        <tbody>
                            {secondHalf.map((ele, i) => (
                                <tr key={i}>
                                    <td className='td-label-1'>
                                        {ele.label !== "Updated" && (
                                            <>
                                                {ele.label} {ele.label === "Family Inforamation" ? <span> :</span> : null}
                                            </>
                                        )}
                                    </td>
                                    <td className='td-input'>
                                        {ele.type === "file" ? null :
                                            ele.type === "radio" ? (
                                                <>
                                                    {ele.Options.map((option, index) => (
                                                        <div key={index}>
                                                            <input
                                                                name={ele.name}
                                                                onChange={onChangeHandler}
                                                                type={ele.type}
                                                                value={option}
                                                                checked={inputData[ele.name] && inputData[ele.name].includes(option)}
                                                            />
                                                            <label>{option}</label>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : ele.type === "select" ? (
                                                <React.Fragment>
                                                    <select
                                                        className='inputField'
                                                        onChange={onChangeHandler}
                                                        name={ele.name}
                                                        value={inputData[ele.name] || ""}
                                                    >
                                                        <option value="">Select</option>
                                                        {ele.Options.map((option, index) => (
                                                            <option value={option} key={index}>{option}</option>
                                                        ))}
                                                    </select>
                                                </React.Fragment>
                                            ) : ele.type === "textArea" ? (
                                                <React.Fragment>
                                                    <textarea
                                                        name={ele.name}
                                                        onChange={onChangeHandler}
                                                        value={inputData[ele.name]}
                                                        className='inputField'
                                                    />
                                                </React.Fragment>
                                            ) : (
                                                ele.label !== "Family Inforamation" && ele.name !== "id" && ele.name !== "updated_date" && (
                                                    <React.Fragment>
                                                        <input
                                                            name={ele.name}
                                                            onChange={onChangeHandler}
                                                            value={inputData[ele.name]}
                                                            type={ele.type}
                                                            className='inputField'
                                                        />
                                                    </React.Fragment>
                                                )
                                            )
                                        }
                                        {ele.type === "file" && (
                                            <React.Fragment>
                                                <input
                                                    type={ele.type}
                                                    name={ele.name}
                                                    accept="image/*"
                                                    onChange={onChangeHandler}
                                                />
                                            </React.Fragment>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ textAlign: "center" }}>
                    {isBtnValid ? (
                        <button onClick={updateHandler} className='table-btn-update'>Update</button>
                    ) : (
                        <button onClick={editHandler} className='table-btn-edit'>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPage;
