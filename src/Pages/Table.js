
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import "../CSS/Table.css";
import { FaSearch } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import ContentPage from './ContentPage';
import { MdOutlineDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { LuFileSearch } from "react-icons/lu";

const Table = () => {
    const dispatch = useDispatch();
    const [getEmpData, setGetEmpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [dataset, setDataset] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleview = (data) => {
        dataset.map((ele) => {
            if (ele.e_name === data.e_name) {
                dispatch({ type: "DETAILS", payload: ele });
            }
        });
        navigate('/Home/ViewProfile');
    };

    const handleDelete = async (data) => {
        if (window.confirm("Are u sure u want to Delete")) {
            setGetEmpData(getEmpData.filter(emp => emp.e_id !== data.e_id));
            await axios
                .delete(`http://192.168.2.114:3003/employeePortal/delete-employeePortal?e_id=${data.e_id}`)
                .then(() => {})
                .catch((err) => {
                    console.log("error");
                    alert("Id not found");
                });
        }
    };

    const Register = () => {
        navigate('/Home/register');
    };

    const handleEdit = (data) => {
        dataset.map((ele) => {
            if (ele.id === data.id) {
                dispatch({ type: "EditDetails", payload: ele });
            }
        });
        navigate('/Home/edit');
    };

    useEffect(() => {
        axios.get("http://192.168.2.114:3003/employeePortal/getAll-employeePortal")
            .then(res => {
                setDataset(res.data.data);
            }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://192.168.2.114:3003/employeePortal/getAll-employeePortal")
            .then(res => {
                const getData = res.data.data;
                const filteredData = getData.map(ele => {
                    delete ele.anniversary_date;
                    delete ele.blood_group;
                    delete ele.dob;
                    delete ele.father_name;
                    delete ele.mother_name;
                    delete ele.relieving_date;
                    delete ele.present_address;
                    delete ele.permenant_address;
                    delete ele.gender;
                    delete ele.family_contact;
                    delete ele.updated_date;
                    delete ele.pwd;
                    delete ele.e_location;
                    ele.joining_date = ele.joining_date?.split('T')[0];
                    return ele;
                });

                setGetEmpData(filteredData);
            }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        console.log("getEmpData:::", getEmpData);
    }, [getEmpData]);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = getEmpData?.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const Search = (e) => {
        const input = e.target.value.toLowerCase();
        setSearchQuery(input);
        let ar1 = getEmpData.filter(item => {
            return item.id.toString().toLowerCase().includes(input);
        });
        setSearchResults(ar1);
    };

    return (
        <div>
            <div className="selectBox">
                <div className="selectBox-ele">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search...."
                        onKeyUp={Search}
                    />
                    <button className="search-button"><FaSearch /></button>
                </div>
            </div>
            <div className='reg-btn'>
                <button className="Register-btn" onClick={Register}> <IoIosPersonAdd className="icon" />New Register</button>
            </div>
            <div className='ViewPage-table'>
                <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "5px" }}>Id</th>
                            <th style={{ padding: "5px" }}>Name</th>
                            <th style={{ padding: "5px" }}>Email</th>
                            <th style={{ padding: "5px" }}>Role</th>
                            <th style={{ padding: "5px" }}>Designation</th>
                            <th style={{ padding: "5px" }}>Manager</th>
                            <th style={{ padding: "5px" }}>Contact</th>
                            <th style={{ padding: "5px" }}>Project Name</th>
                            <th style={{ padding: "5px" }}>Joining date</th>
                            <th style={{ padding: "5px" }}>Photo</th>
                            <th style={{ padding: "5px" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchQuery && searchResults.length === 0 ? (
                            <tr>
                                <td colSpan="12" className='table-td'>Id not found</td>
                            </tr>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((items, index) => (
                                <tr key={index}>
                                    <td className='table-td'>{items.id}</td>
                                    <td className='table-td'>{items.e_name}</td>
                                    <td className='table-td'>{items.email}</td>
                                    <td className='table-td'>{items.e_role}</td>
                                    <td className='table-td'>{items.designation}</td>
                                    <td className='table-td'>{items.manager}</td>
                                    <td className='table-td'>{items.contact}</td>
                                    <td className='table-td'>{items.project_name || 'N/A'}</td>
                                    <td className='table-td'>{items.joining_date}</td>
                                    <td className='table-td' key={index}>
                                        {items.photo ? (
                                            <img
                                                height='30px'
                                                width='30px'
                                                src={`data:image/jpeg;base64,${arrayBufferToBase64(items.photo.data)}`}
                                                alt='Employee Photo'
                                            />
                                        ) : (
                                            "Image not found"
                                        )}
                                    </td>
                                    <td className='table-td'>{items.status}</td>
                                    <td>
                                        <button onClick={() => handleview(items)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
                                        &nbsp;&nbsp;
                                        <button onClick={() => { handleEdit(items) }} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}> <FaUserEdit /></button>
                                        &nbsp;&nbsp;
                                        <button disabled onClick={() => { handleDelete(items) }} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
                                    </td>
                                </tr>
                            ))
                        ) : getEmpData?.length > 0 && searchResults.length === 0 ? (
                            currentRows.map((ele, i) => (
                                <tr key={i}>
                                    {Object.entries(ele).map(([key, value], index) => (
                                        <td className='table-td' key={index}>
                                            {key === "photo" ? (
                                                <img height="30px" width="30px" src={`data:image/jpeg;base64,${arrayBufferToBase64(value?.data)}`} alt="Employee Photo" />
                                            ) : (
                                                value
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <button onClick={() => handleview(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
                                        &nbsp;&nbsp;
                                        <button onClick={() => { handleEdit(ele) }} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}> <FaUserEdit /></button>
                                        &nbsp;&nbsp;
                                        <button disabled onClick={() => { handleDelete(ele) }} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className='table-td'>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <ul className="viewPageTable-pagination">
                    {Array.from({ length: Math.ceil(getEmpData?.length / rowsPerPage) }, (_, i) => i + 1).map(number => (
                        <li className='pagination-item' key={number}>
                            <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Table;
