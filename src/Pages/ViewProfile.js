
import { useSelector } from 'react-redux';
import "../CSS/profile.css";
import { useState,useEffect } from 'react';

const ViewProfile = () => {

    const getData = useSelector(state => state.profileDetails);
    console.log("Details::::", getData);
    // const data=Object.entries(getData)
    useEffect(() => {
        let editdata=Object.keys(getData)
        if (editdata?.length>0) {
            localStorage.setItem('ViewData', JSON.stringify(getData));
        }
    }, [getData]);
    const [storedData, setStoredData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('ViewData');
        if (data) {
            setStoredData(JSON.parse(data));
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


    const filteredData =Object.entries( storedData ||{}  ).map(([key, value]) => {

        if (typeof value === 'string' && value.includes('T')) {
            value = value.split('T')[0];
        }
        return [key, value];
    });
    const det = filteredData.filter(([key, value]) => key !== 'photo' && key !== 'relieving_date'&&key !== 'pwd')

    console.log(det)
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

    return (

        // <div>
        <div className='container'>
            {/* <div className="container1">
                <div className="card1">
                    <img height="350px" src={`data:image/jpeg;base64,${arrayBufferToBase64(getData?.e_photo?.data)}`} alt="Employee Photo" style={{ width: '105%' }} />
                    <h1>{getData.e_name}</h1>
                    <p className="title">{getData.e_role}</p>

                </div>
            </div> */}
            <div className="container2">
                <div className="card2">
                    <div style={{ position: "absolute", left: "210px", top: "20px" }}>
                        <img className="img" src={`data:image/jpeg;base64,${arrayBufferToBase64(storedData ?.photo?.data)}`} alt="Employee Photo" style={{ width: '120px', height: '120px' }} />
                    </div>
                    <div>
                        <table style={{ marginTop: "160px"}}>
                            <thead>
                            </thead>
                            <tbody >
                                <tr>
                                    <td>
                                        {firstHalf.map(([key, value]) => (
                                            <tr>
                                                <td style={{ fontFamily: "Times New Roman", padding: "6px", fontWeight: "bold" }}> 
                                                {formatKey(key)}
                                                </td>
                                                <td>:</td>
                                                <td style={{ fontFamily: "Times New Roman", padding: "6px" }}>{value}</td>
                                            </tr>
                                        ))}

                                    </td>
                                    <td>
                                        {secondHalf.map(([key, value]) => (
                                            <tr>
                                                <td style={{ fontFamily: "Times New Roman", padding: "6px", fontWeight: "bold" }}> 
                                                
                                                {formatKey(key)}</td>
                                                <td>:</td>
                                                <td style={{ fontFamily: "Times New Roman", padding: "6px" }}>{value}</td>
                                            </tr>

                                        ))}</td>

                                </tr>

                            </tbody>
                      
                       
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ViewProfile;

