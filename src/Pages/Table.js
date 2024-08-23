
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import "../CSS/Table.css";
// import { FaSearch } from "react-icons/fa";
// import { IoIosPersonAdd } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import ContentPage from './ContentPage';
// import { MdOutlineDelete } from "react-icons/md";
// import { FaUserEdit } from "react-icons/fa";
// import { LuFileSearch } from "react-icons/lu";

// const Table = () => {
//     const dispatch = useDispatch();
//     const [getEmpData, setGetEmpData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage] = useState(5);
//     const [dataset, setDataset] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");

//     const navigate = useNavigate();

//     const handleview = (data) => {
//         dataset.map((ele) => {
//             if (ele.e_name === data.e_name) {
//                 dispatch({ type: "DETAILS", payload: ele });
//             }
//         });
//         navigate('/Home/ViewProfile');
//     };

//     const handleDelete = async (data) => {
//         if (window.confirm("Are u sure u want to Delete")) {
//             setGetEmpData(getEmpData.filter(emp => emp.e_id !== data.e_id));
//             await axios
//                 .delete(`http://192.168.2.114:3003/employeePortal/delete-employeePortal?e_id=${data.e_id}`)
//                 .then(() => {})
//                 .catch((err) => {
//                     console.log("error");
//                     alert("Id not found");
//                 });
//         }
//     };

//     const Register = () => {
//         navigate('/Home/register');
//     };

//     const handleEdit = (data) => {
//         dataset.map((ele) => {
//             if (ele.id === data.id) {
//                 dispatch({ type: "EditDetails", payload: ele });
//             }
//         });
//         navigate('/Home/edit');
//     };

//     useEffect(() => {
//         axios.get("http://192.168.2.114:3003/employeePortal/getAll-employeePortal")
//             .then(res => {
//                 setDataset(res.data.data);
//             }).catch(err => console.log(err));
//     }, []);

//     useEffect(() => {
//         axios.get("http://192.168.2.114:3003/employeePortal/getAll-employeePortal")
//             .then(res => {
//                 const getData = res.data.data;
//                 const filteredData = getData.map(ele => {
//                     delete ele.anniversary_date;
//                     delete ele.blood_group;
//                     delete ele.dob;
//                     delete ele.father_name;
//                     delete ele.mother_name;
//                     delete ele.relieving_date;
//                     delete ele.present_address;
//                     delete ele.permenant_address;
//                     delete ele.gender;
//                     delete ele.family_contact;
//                     delete ele.updated_date;
//                     delete ele.pwd;
//                     delete ele.e_location;
//                     ele.joining_date = ele.joining_date?.split('T')[0];
//                     return ele;
//                 });

//                 setGetEmpData(filteredData);
//             }).catch(err => console.log(err));
//     }, []);

//     useEffect(() => {
//         console.log("getEmpData:::", getEmpData);
//     }, [getEmpData]);

//     const arrayBufferToBase64 = (buffer) => {
//         let binary = '';
//         const bytes = new Uint8Array(buffer);
//         for (let i = 0; i < bytes.byteLength; i++) {
//             binary += String.fromCharCode(bytes[i]);
//         }
//         return window.btoa(binary);
//     };

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = getEmpData?.slice(indexOfFirstRow, indexOfLastRow);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     const Search = (e) => {
//         const input = e.target.value.toLowerCase();
//         setSearchQuery(input);
//         let ar1 = getEmpData.filter(item => {
//             return item.id.toString().toLowerCase().includes(input);
//         });
//         setSearchResults(ar1);
//     };

//     return (
//         <div>
//             <div className="selectBox">
//                 <div className="selectBox-ele">
//                     <input
//                         type="text"
//                         className="search-input"
//                         placeholder="Search...."
//                         onKeyUp={Search}
//                     />
//                     <button className="search-button"><FaSearch /></button>
//                 </div>
//             </div>
//             <div className='reg-btn'>
//                 <button className="Register-btn" onClick={Register}> <IoIosPersonAdd className="icon" />New Register</button>
//             </div>
//             <div className='ViewPage-table'>
//                 <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th style={{ padding: "5px" }}>Id</th>
//                             <th style={{ padding: "5px" }}>Name</th>
//                             <th style={{ padding: "5px" }}>Email</th>
//                             <th style={{ padding: "5px" }}>Role</th>
//                             <th style={{ padding: "5px" }}>Designation</th>
//                             <th style={{ padding: "5px" }}>Manager</th>
//                             <th style={{ padding: "5px" }}>Contact</th>
//                             <th style={{ padding: "5px" }}>Project Name</th>
//                             <th style={{ padding: "5px" }}>Joining date</th>
//                             <th style={{ padding: "5px" }}>Photo</th>
//                             <th style={{ padding: "5px" }}>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {searchQuery && searchResults.length === 0 ? (
//                             <tr>
//                                 <td colSpan="12" className='table-td'>Id not found</td>
//                             </tr>
//                         ) : searchResults.length > 0 ? (
//                             searchResults.map((items, index) => (
//                                 <tr key={index}>
//                                     <td className='table-td'>{items.id}</td>
//                                     <td className='table-td'>{items.e_name}</td>
//                                     <td className='table-td'>{items.email}</td>
//                                     <td className='table-td'>{items.e_role}</td>
//                                     <td className='table-td'>{items.designation}</td>
//                                     <td className='table-td'>{items.manager}</td>
//                                     <td className='table-td'>{items.contact}</td>
//                                     <td className='table-td'>{items.project_name || 'N/A'}</td>
//                                     <td className='table-td'>{items.joining_date}</td>
//                                     <td className='table-td' key={index}>
//                                         {items.photo ? (
//                                             <img
//                                                 height='30px'
//                                                 width='30px'
//                                                 src={`data:image/jpeg;base64,${arrayBufferToBase64(items.photo.data)}`}
//                                                 alt='Employee Photo'
//                                             />
//                                         ) : (
//                                             "Image not found"
//                                         )}
//                                     </td>
//                                     <td className='table-td'>{items.status}</td>
//                                     <td>
//                                         <button onClick={() => handleview(items)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
//                                         &nbsp;&nbsp;
//                                         <button onClick={() => { handleEdit(items) }} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}> <FaUserEdit /></button>
//                                         &nbsp;&nbsp;
//                                         <button disabled onClick={() => { handleDelete(items) }} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : getEmpData?.length > 0 && searchResults.length === 0 ? (
//                             currentRows.map((ele, i) => (
//                                 <tr key={i}>
//                                     {Object.entries(ele).map(([key, value], index) => (
//                                         <td className='table-td' key={index}>
//                                             {key === "photo" ? (
//                                                 <img height="30px" width="30px" src={`data:image/jpeg;base64,${arrayBufferToBase64(value?.data)}`} alt="Employee Photo" />
//                                             ) : (
//                                                 value
//                                             )}
//                                         </td>
//                                     ))}
//                                     <td>
//                                         <button onClick={() => handleview(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
//                                         &nbsp;&nbsp;
//                                         <button onClick={() => { handleEdit(ele) }} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}> <FaUserEdit /></button>
//                                         &nbsp;&nbsp;
//                                         <button disabled onClick={() => { handleDelete(ele) }} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="12" className='table-td'>No data available</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <ul className="viewPageTable-pagination">
//                     {Array.from({ length: Math.ceil(getEmpData?.length / rowsPerPage) }, (_, i) => i + 1).map(number => (
//                         <li className='pagination-item' key={number}>
//                             <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Table;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../CSS/Table.css";
// import { FaSearch } from "react-icons/fa";
// import { IoIosPersonAdd } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';

// const Table = () => {
//     const dispatch = useDispatch();
//     const [getEmpData, setGetEmpData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage] = useState(5);
//     const [dataset, setDataset] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const navigate = useNavigate();

//     const handleView = (data) => {
//         dataset.forEach((ele) => {
//             if (ele.id === data.id) {
//                 dispatch({ type: "DETAILS", payload: ele });
//             }
//         });
//         navigate('/Home/ViewProfile');
//     };

//     const handleDelete = async (data) => {
//         if (window.confirm("Are you sure you want to delete?")) {
//             setGetEmpData(getEmpData.filter(emp => emp.id !== data.id));
//             try {
//                 await axios.delete(`http://localhost:3003/employeePortal/delete-employeePortal?e_id=${data.id}`);
//             } catch (err) {
//                 console.error("Error:", err);
//                 alert("Id not found");
//             }
//         }
//     };

//     const handleEdit = (data) => {
//         dataset.forEach((ele) => {
//             if (ele.id === data.id) {
//                 dispatch({ type: "EditDetails", payload: ele });
//             }
//         });
//         navigate('/Home/edit');
//     };

//     useEffect(() => {
//         axios.get("http://localhost:3003/employeePortal/getAll-employeePortal")
//             .then(res => {
//                 const data = res.data.data;
//                 // setDataset(data);
//                 const filteredData = data.map(ele => {
//                     delete ele.anniversary_date;
//                     delete ele.blood_group;
//                     delete ele.dob;
//                     delete ele.father_name;
//                     delete ele.mother_name;
//                     delete ele.relieving_date;
//                     delete ele.present_address;
//                     delete ele.permanent_address;
//                     delete ele.gender;
//                     delete ele.family_contact;
//                     delete ele.updated_date;
//                     delete ele.pwd;
//                     delete ele.e_location;
//                     delete ele.e_role;
//                     ele.joining_date = ele.joining_date?.split('T')[0];
//                     return ele;
//                 });
//                 setGetEmpData(filteredData);
//             }).catch(err => console.error(err));
//     }, []);
//     useEffect(()=>{
//         axios.get("http://localhost:3003/employeePortal/getAll-employeePortal").then((res)=>{
//             setDataset(res.data.data);
//         })
//     },[])

//     const arrayBufferToBase64 = (buffer) => {
//         let binary = '';
//         const bytes = new Uint8Array(buffer);
//         for (let i = 0; i < bytes.byteLength; i++) {
//             binary += String.fromCharCode(bytes[i]);
//         }
//         return window.btoa(binary);
//     };

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = getEmpData?.slice(indexOfFirstRow, indexOfLastRow);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     const search = (e) => {
//         const input = e.target.value.toLowerCase();
//         const results = getEmpData.filter(item => {
//             return item.id.toString().toLowerCase().includes(input);
//         });
//         setSearchResults(results);
//     };

//     useEffect(() => {
//         searchResults.forEach(item => console.log("Item:", typeof item));
//     }, [searchResults]);

//     return (
//         <div>
//             <div className="selectBox">
//                 <div className="selectBox-ele">
//                     <input
//                         type="text"
//                         className="search-input"
//                         placeholder="Search...."
//                         onKeyUp={search}
//                     />
//                     <button className="search-button"><FaSearch /></button>
//                 </div>
//             </div>
//             <div className='reg-btn'>
//                 <button className="Register-btn" onClick={() => navigate('/Home/register')}>
//                     <IoIosPersonAdd className="icon" />New Register
//                 </button>
//             </div>
//             <div className='ViewPage-table'>
//                 <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th style={{ padding: "5px" }}>Id</th>
//                             <th style={{ padding: "5px" }}>Name</th>
//                             <th style={{ padding: "5px" }}>Email</th>
//                             {/* <th style={{ padding: "5px" }}>Role</th> */}
//                             <th style={{ padding: "5px" }}>Designation</th>
//                             <th style={{ padding: "5px" }}>Manager</th>
//                             <th style={{ padding: "5px" }}>Contact</th>
//                             <th style={{ padding: "5px" }}>Project Name</th>
//                             <th style={{ padding: "5px" }}>Joining date</th>
//                             <th style={{ padding: "5px" }}>Photo</th>
//                             <th style={{ padding: "5px" }}>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             (searchResults.length > 0 ? searchResults : currentRows).map((ele, i) => (
//                                 <tr key={i}>
//                                     {
//                                         Object.entries(ele).map(([key, value], index) => (
//                                             <td className='table-td' key={index}>
//                                                 {key === "photo" ? (
//                                                     <img height="30px" width="30px" src={`data:image/jpeg;base64,${arrayBufferToBase64(value?.data)}`} alt="Employee Photo" />
//                                                 ) : (
//                                                     value
//                                                 )}
//                                             </td>
//                                         ))
//                                     }
//                                     <td>
//                                         <button onClick={() => handleView(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}>View</button>
//                                         &nbsp;&nbsp;
//                                         <button onClick={() => handleEdit(ele)} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}>Edit</button>
//                                         &nbsp;&nbsp;
//                                         <button onClick={() => handleDelete(ele)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <ul className="viewPageTable-pagination">
//                     {Array.from({ length: Math.ceil(getEmpData.length / rowsPerPage) }, (_, i) => i + 1).map(number => (
//                         <li className='pagination-item' key={number}>
//                             <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Table;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../CSS/Table.css";
// import { FaSearch, FaUserEdit } from "react-icons/fa";
// import { IoIosPersonAdd } from "react-icons/io";
// import { useDispatch } from 'react-redux';
// import { LuFileSearch } from 'react-icons/lu';
// import { MdOutlineDelete } from 'react-icons/md';
// import { axiosInstance } from '../Components/ApiCalls/BaseApIUrl';

// const Table = () => {
//     const dispatch = useDispatch();
//     const [getEmpData, setGetEmpData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage] = useState(10);
//     const [searchResults, setSearchResults] = useState([]);
//     const [dataset, setDataset] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
//     const navigate = useNavigate();
//     // const [skillFormData,setSkillFormData]=useState("");

//     const handleView = async (data) => {
//         const selectedData = dataset.find((ele) => ele.id === data.id);
//         // let resData="";
//         const response = await axios.get(`http://localhost:3003/empPortal/getSingleRow-employeePortal?id=${data.id}`)
//         const resData = response.data.result[0];
//         // console.log(":::::resData:::::",resData);
//         const getSelectedData = { ...selectedData, ...resData }
//         // console.log(":::getSelectedData::",getSelectedData);
//         if (getSelectedData) {
//             dispatch({ type: "DETAILS", payload: getSelectedData });
//         }
//         navigate('/Home/ViewProfile');
//     };

//     const handleDelete = async (data) => {
//         // if (window.confirm("Are you sure you want to delete?")) {
//         //     setGetEmpData(getEmpData.filter(emp => emp.id !== data.id));
//         //     try {
//         //         await axios.delete(`http://localhost:3003/employeePortal/delete-employeePortal?e_id=${data.id}`);
//         //     } catch (err) {
//         //         console.error("Error:", err);
//         //         alert("Id not found");
//         //     }
//         // }
//         const status = "InActive";
//         if (window.confirm("Are you sure , You want to delete ?")) {
//             await axios.put(`http://localhost:3003/employeePortal/delete-employeePortal`, {
//                 id: data.id, status: status
//             }).then((res) => {
//                 alert("Employee inactived successfully")
//             }).catch(err => console.log(err));
//         }
//     };

//     const handleEdit = (data) => {
//         const selectedData = dataset.find((ele) => ele.id === data.id);
//         if (selectedData) {
//             dispatch({ type: "EditDetails", payload: selectedData });
//         }
//         navigate('/Home/edit');
//     };

//     useEffect(() => {
//         axiosInstance.get(`${process.env.REACT_APP_GET_END_POINT}`, {
//             headers: {
//                 "authorization": sessionStorage.getItem("token")
//             }
//         })
//             .then(res => {
//                 const data = res.data.data;
//                 const filteredData = data.map(ele => {
//                     delete ele.anniversary_date;
//                     delete ele.blood_group;
//                     delete ele.dob;
//                     delete ele.father_name;
//                     delete ele.mother_name;
//                     delete ele.photo;
//                     delete ele.relieving_date;
//                     delete ele.present_address;
//                     delete ele.permenant_address;
//                     delete ele.gender;
//                     delete ele.family_contact;
//                     delete ele.updated_date;
//                     delete ele.pwd;
//                     delete ele.e_location;
//                     delete ele.e_role;
//                     ele.joining_date = ele.joining_date?.split('T')[0];
//                     return ele;
//                 });
//                 setGetEmpData(filteredData);
//             }).catch(err => console.error(err));
//     }, []);

//     useEffect(() => {
//         axiosInstance.get(`${process.env.REACT_APP_GET_END_POINT}`, {
//             headers: {
//                 "authorization": sessionStorage.getItem("token")
//             }
//         }).then((res) => {
//             setDataset(res.data.data);
//         })
//     }, [])

//     const arrayBufferToBase64 = (buffer) => {
//         let binary = '';
//         const bytes = new Uint8Array(buffer);
//         for (let i = 0; i < bytes.byteLength; i++) {
//             binary += String.fromCharCode(bytes[i]);
//         }
//         return window.btoa(binary);
//     };

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = (isSearching ? searchResults : getEmpData)?.slice(indexOfFirstRow, indexOfLastRow);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     const search = (e) => {
//         const input = e.target.value.toLowerCase();
//         if (input === "") {
//             setIsSearching(false);
//             setSearchResults([]);
//         } else {
//             const results = getEmpData.filter(item => {
//                 return item.id.toString().toLowerCase().includes(input);
//             });
//             setSearchResults(results);
//             setIsSearching(true);
//             setCurrentPage(1);
//         }
//     };

//     const handleSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     const sortedData = React.useMemo(() => {
//         let sortableItems = [...getEmpData];
//         if (sortConfig !== null) {
//             sortableItems.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }
//         return sortableItems;
//     }, [getEmpData, sortConfig]);

//     const currentSortedRows = (isSearching ? searchResults : sortedData)?.slice(indexOfFirstRow, indexOfLastRow);

//     return (
//         <div>
//             <div className="selectBox">
//                 <div className="selectBox-ele">
//                     <input
//                         type="text"
//                         className="search-input"
//                         placeholder="Search...."
//                         onKeyUp={search}
//                     />
//                     <button style={{ position: "absolute", top: "10px" }} className="search-button"><FaSearch /></button>
//                 </div>
//             </div>
//             <div className='reg-btn'>
//                 <button className="Register-btn" onClick={() => navigate('/Home/register')}>
//                     <IoIosPersonAdd className="icon" />New Register
//                 </button>
//             </div>
//             <div className='ViewPage-table'>
//                 <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th style={{ padding: "5px" }}>Id</th>
//                             <th style={{ padding: "5px" }} >Name</th>
//                             <th style={{ padding: "5px" }} >Email</th>
//                             <th style={{ padding: "5px" }}>Designation</th>
//                             <th style={{ padding: "5px" }} >Manager</th>
//                             <th style={{ padding: "5px" }}>Contact</th>
//                             <th style={{ padding: "5px" }}>Project Name</th>
//                             <th style={{ padding: "5px" }} >Joining date</th>
//                             <th style={{ padding: "5px", cursor: "pointer" }} onClick={() => handleSort('status')}>Status</th>
//                             <th style={{ padding: "5px" }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             currentSortedRows.map((ele, i) => (
//                                 <tr key={i}>
//                                     {
//                                         Object.entries(ele).map(([key, value], index) => (
//                                             <td className='table-td' key={index}>
//                                                 {key === "photo" ? (
//                                                     <img height="30px" width="30px" src={`data:image/jpeg;base64,${arrayBufferToBase64(value?.data)}`} alt="Employee Photo" />
//                                                 ) : (
//                                                     value
//                                                 )}
//                                             </td>
//                                         ))
//                                     }
//                                     <td style={{ textAlign: "center" }}>
//                                         <button onClick={() => handleView(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
//                                         &nbsp;&nbsp;
//                                         <button onClick={() => handleEdit(ele)} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><FaUserEdit /></button>
//                                         &nbsp;&nbsp;
//                                         <button onClick={() => { handleDelete(ele) }} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <ul className="viewPageTable-pagination">
//                     {Array.from({ length: Math.ceil((isSearching ? searchResults : getEmpData).length / rowsPerPage) }, (_, i) => i + 1).map(number => (
//                         <li className='pagination-item' key={number}>
//                             <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Table;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../CSS/Table.css";
// import { FaSearch, FaUserEdit } from "react-icons/fa";
// import { IoIosPersonAdd } from "react-icons/io";
// import { useDispatch } from 'react-redux';
// import { LuFileSearch } from 'react-icons/lu';
// import { MdOutlineDelete } from 'react-icons/md';
// import { axiosInstance } from '../Components/ApiCalls/BaseApIUrl';
// import { RiFilter2Line } from "react-icons/ri";

// const Table = () => {
//     const dispatch = useDispatch();
//     const [getEmpData, setGetEmpData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage] = useState(10);
//     const [searchResults, setSearchResults] = useState([]);
//     const [dataset, setDataset] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
//     const navigate = useNavigate();

//     const handleView = async (data) => {
//         const selectedData = dataset.find((ele) => ele.id === data.id);
//         const response = await axios.get(`http://localhost:3003/empPortal/getSingleRow-employeePortal?id=${data.id}`)
//         const resData = response.data.result[0];
//         const getSelectedData = { ...selectedData, ...resData }
//         if (getSelectedData) {
//             dispatch({ type: "DETAILS", payload: getSelectedData });
//         }
//         navigate('/Home/ViewProfile');
//     };

//     const handleDelete = async (data) => {
//         const status = "InActive";
//         if (window.confirm("Are you sure , You want to delete ?")) {
//             await axios.put(`http://localhost:3003/employeePortal/delete-employeePortal`, {
//                 id: data.id, status: status
//             }).then((res) => {
//                 alert("Employee inactived successfully");
//                 // Disable the table row by updating the status in getEmpData
//                 setGetEmpData(prevState => prevState.map(emp => emp.id === data.id ? { ...emp, status: "InActive" } : emp));
//             }).catch(err => console.log(err));
//         }
//     };

//     const handleEdit = (data) => {
//         const selectedData = dataset.find((ele) => ele.id === data.id);
//         if (selectedData) {
//             dispatch({ type: "EditDetails", payload: selectedData });
//         }
//         navigate('/Home/edit');
//     };

//     useEffect(() => {
//         // axiosInstance.get(`${process.env.REACT_APP_GET_END_POINT}`, {
//         //     headers: {
//         //         "authorization": sessionStorage.getItem("token")
//         //     }
//         // })
//         axios.get("http://localhost:3003/employeeDetails/getAll_emp_details",{
//             headers:{
//                 "authorization":sessionStorage.getItem("token")
//             }
//         })
//             .then(res => {
//                 const data = res.data.data;
//                 // const filteredData = data.map(ele => {
//                 //     delete ele.anniversary_date;
//                 //     delete ele.blood_group;
//                 //     delete ele.dob;
//                 //     delete ele.father_name;
//                 //     delete ele.mother_name;
//                 //     delete ele.photo;
//                 //     delete ele.relieving_date;
//                 //     delete ele.present_address;
//                 //     delete ele.permenant_address;
//                 //     delete ele.gender;
//                 //     delete ele.family_contact;
//                 //     delete ele.updated_date;
//                 //     delete ele.pwd;
//                 //     delete ele.e_location;
//                 //     delete ele.e_role;
//                 //     ele.joining_date = ele.joining_date?.split('T')[0];
//                 //     return ele;
//                 // });
//                 setGetEmpData(filteredData);
//             }).catch(err => console.error(err));
//     }, []);

//     useEffect(() => {
//         axiosInstance.get(`${process.env.REACT_APP_GET_END_POINT}`, {
//             headers: {
//                 "authorization": sessionStorage.getItem("token")
//             }
//         }).then((res) => {
//             setDataset(res.data.data);
//         })
//     }, [])

//     const arrayBufferToBase64 = (buffer) => {
//         let binary = '';
//         const bytes = new Uint8Array(buffer);
//         for (let i = 0; i < bytes.byteLength; i++) {
//             binary += String.fromCharCode(bytes[i]);
//         }
//         return window.btoa(binary);
//     };

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = (isSearching ? searchResults : getEmpData)?.slice(indexOfFirstRow, indexOfLastRow);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     const search = (e) => {
//         const input = e.target.value.toLowerCase();
//         if (input === "") {
//             setIsSearching(false);
//             setSearchResults([]);
//         } else {
//             const results = getEmpData.filter(item => {
//                 return item.id.toString().toLowerCase().includes(input);
//             });
//             setSearchResults(results);
//             setIsSearching(true);
//             setCurrentPage(1);
//         }
//     };

//     const handleSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     const sortedData = React.useMemo(() => {
//         let sortableItems = [...getEmpData];
//         if (sortConfig !== null) {
//             sortableItems.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }
//         return sortableItems;
//     }, [getEmpData, sortConfig]);

//     const currentSortedRows = (isSearching ? searchResults : sortedData)?.slice(indexOfFirstRow, indexOfLastRow);

//     return (
//         <div>
//             <div className="selectBox">
//                 <div className="selectBox-ele">
//                     <input
//                         type="text"
//                         className="search-input"
//                         placeholder="Search...."
//                         onKeyUp={search}
//                     />
//                     <button style={{ position: "absolute", top: "10px" }} className="search-button"><FaSearch /></button>
//                 </div>
//             </div>
//             <div className='reg-btn'>
//                 <button className="Register-btn" onClick={() => navigate('/Home/register')}>
//                     <IoIosPersonAdd className="icon" />New Register
//                 </button>
//             </div>
//             <div className='ViewPage-table'>
//                 <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th style={{ padding: "5px" }}>Id</th>
//                             <th style={{ padding: "5px" }}>Name</th>
//                             <th style={{ padding: "5px" }}>Email</th>
//                             <th style={{ padding: "5px" }}>Designation</th>
//                             <th style={{ padding: "5px" }}>Manager</th>
//                             <th style={{ padding: "5px" }}>Contact</th>
//                             <th style={{ padding: "5px" }}>Project Name</th>
//                             <th style={{ padding: "5px" }}>Joining date</th>
//                             <th style={{ padding: "5px", cursor: "pointer" }} onClick={() => handleSort('status')}>Status <RiFilter2Line /></th>
//                             <th style={{ padding: "5px" }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentSortedRows.map((ele, i) => (
//                             <tr key={i} className={ele.status === "InActive" ? 'disabled-row' : ''}>
//                                 <td className='table-td'>{ele.id}</td>
//                                 <td className='table-td'>{ele.e_name}</td>
//                                 <td className='table-td'>{ele.email}</td>
//                                 <td className='table-td'>{ele.designation}</td>
//                                 <td className='table-td'>{ele.manager}</td>
//                                 <td className='table-td'>{ele.contact}</td>
//                                 <td className='table-td'>{ele.project_name}</td>
//                                 <td className='table-td'>{ele.joining_date}</td>
//                                 <td className='table-td'>{ele.status}</td>
//                                 <td>
//                                     <button onClick={() => handleView(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
//                                     &nbsp;&nbsp;
//                                     <button onClick={() => handleEdit(ele)} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><FaUserEdit /></button>
//                                     &nbsp;&nbsp;
//                                     <button onClick={() => handleDelete(ele)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 {/* <ul className="viewPageTable-pagination">
//                     {Array(Math.ceil((isSearching ? searchResults.length : getEmpData.length) / rowsPerPage))
//                         .fill()
//                         .map((_, i) => (
//                             <li key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
//                                 {i + 1}
//                             </li>
//                         ))}
//                 </ul> */}

//                 <ul className="viewPageTable-pagination">
//                     {Array.from({ length: Math.ceil((isSearching ? searchResults : getEmpData).length / rowsPerPage) }, (_, i) => i + 1).map(number => (
//                         <li className='pagination-item' key={number}>
//                             <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Table;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/Table.css";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { LuFileSearch } from 'react-icons/lu';
import { MdOutlineDelete } from 'react-icons/md';

const Table = () => {
    const dispatch = useDispatch();
    const [getEmpData, setGetEmpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const [dataset, setDataset] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'emp_id', direction: 'ascending' });
    const navigate = useNavigate();

    const handleView = async (data) => {
        try {
            const selectedData = dataset?.find((ele) => ele.emp_id === data.emp_id);
    
            // Fetch employee details
            const response = await axios.get(`http://localhost:3003/employeeDetails/get_emp_details?emp_id=${data.emp_id}`);
            const resData = response?.data;
    
            let skillSetData = {};
            try {
                // Fetch skill set data
                const response2 = await axios.get(`http://localhost:3003/employeeDetails/get_skill_set_data?emp_id=${data.emp_id}`);
                console.log("response2::::==>", response2.data.data[0]);
                skillSetData = response2.data.data[0] || {};
            } catch (error) {
                console.error("Error fetching skill set data:", error);
            }
    
            // Combine data
            const getSelectedData = { ...selectedData, ...resData, ...skillSetData };
    
            // Dispatch combined data to store
            if (getSelectedData) {
                dispatch({ type: "DETAILS", payload: getSelectedData });
            }
    
            // Navigate to ViewProfile
            navigate('/Home/ViewProfile');
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    

    const handleDelete = async (data) => {
        const status = "Disable";
        if (window.confirm("Are you sure, you want to delete?")) {
            await axios.put(`http://localhost:3003/employeeDetails/delete_emp_details`, {
                emp_id: data.emp_id, status: status
            }).then((res) => {
                alert("Employee inactivated successfully");
                // Disable the table row by updating the status in getEmpData
                setGetEmpData(prevState => prevState.map(emp => emp.emp_id === data.emp_id ? { ...emp, status: "Disable" } : emp));
            }).catch(err => console.log(err));
        }
    };

    const handleEdit = async(data) => {
        const response = await axios.get(`http://localhost:3003/employeeDetails/get_emp_details?emp_id=${data.emp_id}`)
        const resData = response?.data;
        const getSelectedData = {...resData }
        console.log("photoData::",getSelectedData)
        if (getSelectedData) {
            dispatch({ type: "EditDetails", payload: getSelectedData });
        }
        navigate('/Home/edit');
    };

    useEffect(() => {
        axios.get("http://localhost:3003/employeeDetails/getAll_emp_details_data", {
            headers: {
                "authorization": sessionStorage.getItem("token")
            }
        })
            .then(res => {
                const data = res.data.data;
                const transformedData = Object.values(data); // Transform the data object into an array
                const filteredData = transformedData.map(ele => {
                    delete ele.emp_last_name;
                    delete ele.emp_password;
                    delete ele.gender;
                    delete ele.role;
                    delete ele.department_id;
                    delete ele.location;
                    delete ele.emp_photo;
                    delete ele.updated_date;
                    delete ele.blood_group;
                    delete ele.anniversary_date;
                    delete ele.family_contact;
                    delete ele.updated_date;
                    delete ele.relieving_date;
                    delete ele.primary_skill;
                    delete ele.nationality;
                    delete ele.dob;
                    delete ele.father_name;
                    delete ele.mother_name;
                    delete ele.personal_email;
                    delete ele.present_address;
                    delete ele.perminent_address;
                    ele.doj = ele.doj?.split('T')[0];
                    return ele;
                });

                setGetEmpData(filteredData);
            }).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3003/employeeDetails/getAll_emp_details")
            .then((res) => {
                setDataset(res.data.data);
            })
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = (isSearching ? searchResults : getEmpData)?.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const search = (e) => {
        const input = e.target.value.toLowerCase();
        if (input === "") {
            setIsSearching(false);
            setSearchResults([]);
        } else {
            const results = getEmpData.filter(item => {
                return Object.values(item).some(value => {
                    if (value === null || value === undefined) {
                        return false;
                    }
                    return value.toString().toLowerCase().includes(input);
                });
            });
            setSearchResults(results);
            setIsSearching(true);
            setCurrentPage(1);
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        let sortableItems = [...getEmpData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [getEmpData, sortConfig]);

    const currentSortedRows = (isSearching ? searchResults : sortedData)?.slice(indexOfFirstRow, indexOfLastRow);

    // Pagination logic
    const totalPages = Math.ceil((isSearching ? searchResults : getEmpData).length / rowsPerPage);
    const maxPageNumbersToShow = 5;
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    const startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
    const endPage = Math.min(currentPage + halfMaxPageNumbersToShow, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="selectBox">
                <div className="selectBox-ele">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search...."
                        onKeyUp={search}
                    />
                    <button style={{ position: "absolute", top: "10px" }} className="search-button"><FaSearch /></button>
                </div>
            </div>
            <div className='reg-btn'>
                <button className="Register-btn" onClick={() => navigate('/Home/register')}>
                    <IoIosPersonAdd className="icon" />New Register
                </button>
            </div>
            <div className='ViewPage-table'>
                <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('emp_id')}>Employee id</th>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('emp_first_name')}>Name</th>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('email')}>Email</th>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('current_designation')}>Designation</th>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('manager_id')}>Manager id</th>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('contact_number')}>Contact</th>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('project_name')}>Project name</th>
                            <th style={{ padding: "5px" }} onClick={() => handleSort('doj')}>Date of joining</th>
                            <th style={{ padding: "5px", cursor:"pointer" }} onClick={() => handleSort('status')}>Status</th>
                            <th style={{ padding: "5px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSortedRows.map((ele, i) => (
                            <tr key={i} className={ele.status === "Disable" ? 'disabled-row' : ''}>
                                <td className='table-td'>{ele.emp_id}</td>
                                <td className='table-td'>{ele.emp_first_name}</td>
                                <td className='table-td'>{ele.email}</td>
                                <td className='table-td'>{ele.current_designation}</td>
                                <td className='table-td'>{ele.manager_id}</td>
                                <td className='table-td'>{ele.contact_number}</td>
                                <td className='table-td'>{ele.project_name}</td>
                                <td className='table-td'>{new Date(ele.doj).toLocaleDateString()}</td>
                                <td className='table-td'>{ele.status}</td>
                                <td>
                                    <button title='View profile' onClick={() => handleView(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
                                    &nbsp;&nbsp;
                                    <button title='Edit' onClick={() => handleEdit(ele)} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><FaUserEdit /></button>
                                    &nbsp;&nbsp;
                                    <button title='Delete' onClick={() => handleDelete(ele)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <ul className="viewPageTable-pagination">
                    <li className='pagination-item'>
                        <a className='pagination-link' href="#" onClick={() => paginate(1)}>First</a>
                    </li>
                    {pageNumbers.map(number => (
                        <li className='pagination-item' key={number}>
                            <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))}
                    <li className='pagination-item'>
                        <a className='pagination-link' href="#" onClick={() => paginate(totalPages)}>Last</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Table;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../CSS/Table.css";
// import { FaSearch, FaUserEdit } from "react-icons/fa";
// import { IoIosPersonAdd } from "react-icons/io";
// import { useDispatch } from 'react-redux';
// import { LuFileSearch } from 'react-icons/lu';
// import { MdOutlineDelete } from 'react-icons/md';

// const Table = () => {
//     const dispatch = useDispatch();
//     const [getEmpData, setGetEmpData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage] = useState(10);
//     const [searchResults, setSearchResults] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const [sortConfig, setSortConfig] = useState({ key: 'emp_id', direction: 'ascending' });
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("http://localhost:3003/employeeDetails/getAll_emp_details", {
//             headers: {
//                 "authorization": sessionStorage.getItem("token")
//             }
//         })
//             .then(res => {
//                 const data = res.data.data;
//                 const transformedData = Object.values(data); // Transform the data object into an array
//                 setGetEmpData(transformedData);
//             }).catch(err => console.error(err));
//     }, []);

//     const handleView = async (data) => {
//         const selectedData = getEmpData.find((ele) => ele.emp_id === data.emp_id);
//         const response = await axios.get(`http://localhost:3003/empPortal/getSingleRow-employeePortal?id=${data.emp_id}`)
//         const resData = response.data.result[0];
//         const getSelectedData = { ...selectedData, ...resData }
//         if (getSelectedData) {
//             dispatch({ type: "DETAILS", payload: getSelectedData });
//         }
//         navigate('/Home/ViewProfile');
//     };

//     const handleDelete = async (data) => {
//         const status = "InActive";
//         if (window.confirm("Are you sure , You want to delete ?")) {
//             await axios.put(`http://localhost:3003/employeePortal/delete-employeePortal`, {
//                 id: data.emp_id, status: status
//             }).then((res) => {
//                 alert("Employee inactivated successfully");
//                 setGetEmpData(prevState => prevState.map(emp => emp.emp_id === data.emp_id ? { ...emp, status: "InActive" } : emp));
//             }).catch(err => console.log(err));
//         }
//     };

//     const handleEdit = (data) => {
//         const selectedData = getEmpData.find((ele) => ele.emp_id === data.emp_id);
//         if (selectedData) {
//             dispatch({ type: "EditDetails", payload: selectedData });
//         }
//         navigate('/Home/edit');
//     };

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = (isSearching ? searchResults : getEmpData)?.slice(indexOfFirstRow, indexOfLastRow);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     const search = (e) => {
//         const input = e.target.value.toLowerCase();
//         if (input === "") {
//             setIsSearching(false);
//             setSearchResults([]);
//         } else {
//             const results = getEmpData.filter(item => {
//                 return Object.values(item).some(value => {
//                     if (value === null || value === undefined) {
//                         return false;
//                     }
//                     return value.toString().toLowerCase().includes(input);
//                 });
//             });
//             setSearchResults(results);
//             setIsSearching(true);
//             setCurrentPage(1);
//         }
//     };

//     const handleSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     const sortedData = React.useMemo(() => {
//         let sortableItems = [...getEmpData];
//         if (sortConfig !== null) {
//             sortableItems.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }
//         return sortableItems;
//     }, [getEmpData, sortConfig]);

//     const currentSortedRows = (isSearching ? searchResults : sortedData)?.slice(indexOfFirstRow, indexOfLastRow);

//     // Pagination logic
//     const totalPages = Math.ceil((isSearching ? searchResults : getEmpData).length / rowsPerPage);
//     const maxPageNumbersToShow = 5;
//     const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

//     const startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
//     const endPage = Math.min(currentPage + halfMaxPageNumbersToShow, totalPages);

//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div>
//             <div className="selectBox">
//                 <div className="selectBox-ele">
//                     <input
//                         type="text"
//                         className="search-input"
//                         placeholder="Search...."
//                         onKeyUp={search}
//                     />
//                     <button style={{ position: "absolute", top: "10px" }} className="search-button"><FaSearch /></button>
//                 </div>
//             </div>
//             <div className='reg-btn'>
//                 <button className="Register-btn" onClick={() => navigate('/Home/register')}>
//                     <IoIosPersonAdd className="icon" />New Register
//                 </button>
//             </div>
//             <div className='ViewPage-table'>
//                 <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('emp_id')}>Employee id</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('emp_first_name')}>Name</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('email')}>Email</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('current_designation')}>Designation</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('manager_id')}>Manager id</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('contact_number')}>Contact</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('project_name')}>Project name</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('doj')}>Date of joining</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('status')}>Status</th>
//                             <th style={{ padding: "5px" }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentSortedRows.map((ele, i) => (
//                             <tr key={i} className={ele.status === "InActive" ? 'disabled-row' : ''}>
//                                 <td className='table-td'>{ele.emp_id}</td>
//                                 <td className='table-td'>{ele.emp_first_name}</td>
//                                 <td className='table-td'>{ele.email}</td>
//                                 <td className='table-td'>{ele.current_designation}</td>
//                                 <td className='table-td'>{ele.manager_id}</td>
//                                 <td className='table-td'>{ele.contact_number}</td>
//                                 <td className='table-td'>{ele.project_name}</td>
//                                 <td className='table-td'>{new Date(ele.doj).toLocaleDateString()}</td>
//                                 <td className='table-td'>{ele.status}</td>
//                                 <td>
//                                     <button onClick={() => handleView(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
//                                     &nbsp;&nbsp;
//                                     <button onClick={() => handleEdit(ele)} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><FaUserEdit /></button>
//                                     &nbsp;&nbsp;
//                                     <button onClick={() => handleDelete(ele)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <ul className="viewPageTable-pagination">
//                     <li className='pagination-item'>
//                         <a className='pagination-link' href="#" onClick={() => paginate(1)}>First</a>
//                     </li>
//                     {pageNumbers.map(number => (
//                         <li className='pagination-item' key={number}>
//                             <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
//                         </li>
//                     ))}
//                     <li className='pagination-item'>
//                         <a className='pagination-link' href="#" onClick={() => paginate(totalPages)}>Last</a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Table;

