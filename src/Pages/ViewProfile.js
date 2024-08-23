import { useSelector } from 'react-redux';
import "../CSS/profile.css";
import { useState, useEffect } from 'react';
import LZString from 'lz-string'; 
import Header from '../Components/Header';

const ViewProfile = () => {
    const [storedData, setStoredData] = useState(null);

    const getData = useSelector(state => state.profileDetails);
    console.log("Details::::", getData);

    useEffect(() => {
        let editdata = Object.keys(getData);
        if (editdata?.length > 0) {
            try {
                const compressedData = LZString.compressToUTF16(JSON.stringify(getData));
                localStorage.setItem('ViewData', compressedData);
            } catch (e) {
                console.error("Failed to store data in localStorage:", e);
            }
        }
    }, [getData]);

    useEffect(() => {
        const data = localStorage.getItem('ViewData');
        // console.log("data:::==",data);
        if (data) {
            setStoredData(JSON.parse(LZString.decompressFromUTF16(data)));
        }
    }, []);
    // console.log("storedData::",storedData);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const filteredData = Object.entries(storedData || {}).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('T')) {
            value = value.split('T')[0];
        }
        return [key, value];
    });

    const det = filteredData?.filter(([key, value]) => key !== 'emp_photo' && key !== 'emp_password');
    console.log(det);

    const half = Math.ceil(det?.length / 2);
    const firstHalf = det?.slice(0, half);
    const secondHalf = det?.slice(half);

    const formatKey = (key) => {
        return key
            .replace('e_', '')
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    const showPDF=(pdf)=>{
        window.open(`http://localhost:3003/files/${pdf}`);
    }

    // useEffect(()=>{
    //     sessionStorage.get
    // },[])

    return (
        <div>
            <Header/>
        <div className='container'>
            <div style={sessionStorage.getItem("role")==="hr"?null:{top:"105px"}} className="container2">
                <div className="card2">
                    <div style={{ position: "absolute", width:"100vw",padding:"7px", left: "20px", top: "0px", backgroundColor:"white", zIndex:"4" }}>
                        <img 
                            className="img" 
                            // src={`data:image/jpeg;base64,${arrayBufferToBase64(storedData?.emp_photo)}`} 
                            src={`http://localhost:3003/images/${storedData?.emp_photo}`}
                            alt="Employee Photo" 
                            style={{ width: '130px', height: '130px' }} 
                        />
                    </div>
                    <div style={{ marginTop: "120px", display: "flex", justifyContent: "space-between", zIndex:"3" }}>
                        <div>
                            <table>
                                <thead></thead>
                                <tbody>
                                    {firstHalf?.map(([key, value], index) => (
                                        <tr key={index}>
                                            <td style={{ fontFamily: "Times New Roman", padding: "10px", fontWeight: "bold" }}>
                                                {formatKey(key)}
                                            </td>
                                            <td>:</td>
                                            <td style={{ fontFamily: "Times New Roman", padding: "10px", maxWidth: "250px", wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table>
                                <thead></thead>
                                <tbody>
                                    {secondHalf?.map(([key, value], index) => (
                                        <tr key={index}>
                                            <td style={{ fontFamily: "Times New Roman", padding: "10px", fontWeight: "bold" }}>
                                            {formatKey(key)}
                                            </td>
                                            <td>:</td>
                                            <td style={{ fontFamily: "Times New Roman", padding: "10px", maxWidth: "250px", wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                                              {
                                                key==="resume"?<button onClick={()=>showPDF(value)}>View PDF</button>:value
                                              }  
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
    );
};

export default ViewProfile;
