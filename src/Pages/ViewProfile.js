import { useSelector } from 'react-redux';
import "../CSS/profile.css";
import { useState, useEffect } from 'react';
import LZString from 'lz-string'; 

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
        if (data) {
            setStoredData(JSON.parse(LZString.decompressFromUTF16(data)));
        }
    }, []);

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

    const det = filteredData.filter(([key, value]) => key !== 'photo' && key !== 'pwd');
    console.log(det);

    const half = Math.ceil(det.length / 2);
    const firstHalf = det.slice(0, half);
    const secondHalf = det.slice(half);

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

    return (
        <div className='container'>
            <div className="container2">
                <div className="card2">
                    <div style={{ position: "absolute", width:"100vw", left: "20px", top: "20px", backgroundColor:"white", zIndex:"4" }}>
                        <img 
                            className="img" 
                            src={`data:image/jpeg;base64,${arrayBufferToBase64(storedData?.photo?.data)}`} 
                            alt="Employee Photo" 
                            style={{ width: '120px', height: '120px' }} 
                        />
                    </div>
                    <div style={{ marginTop: "150px", display: "flex", justifyContent: "space-between", zIndex:"3" }}>
                        <div>
                            <table>
                                <thead></thead>
                                <tbody>
                                    {firstHalf.map(([key, value], index) => (
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
                                    {secondHalf.map(([key, value], index) => (
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
    );
};

export default ViewProfile;
