import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import "../CSS/Leave_report.css";

function LMS_leaveReport() {
    const [employee, setEmployee] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [leaveData, setLeaveData] = useState([]);

    const years = [2022, 2023, 2024];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleGenerateClick = async () => {
        const selectedData = {
            employee,
            recordsPerPage,
            year: Number(year),
            month: Number(month)
        };

        try {
            const res = await axios.post("http://localhost:3003/LMS-page/leave_monthly_generator", selectedData);
            processLeaveData(res.data.user_leaves, res.data.leave_types, res.data.userLeavesData);
        } catch (error) {
            console.error("Error generating the report", error);
        }
    };

    const processLeaveData = (userLeaves, leaveTypes, userLeavesData) => {
        const privilegeLeaveType = leaveTypes.find(type => type.leavetype === 'Privilege Leave');
        if (!privilegeLeaveType) {
            console.error("Privilege leave type not found.");
            return;
        }
        const privilegeLeaveTypeId = privilegeLeaveType.leavetypeid;
    
        const pUserLeavesData = userLeavesData
            .filter(leave => leave.leavetypeid === privilegeLeaveTypeId)
            .map(leave => ({
                duration: leave.duration,
                leaveAppliedDate: leave.fromdate
            })) || [];
    
        const privilegeCountByMonthData = Array(12).fill(0);
        pUserLeavesData.forEach(leave => {
            const month = new Date(leave.leaveAppliedDate).getMonth();
            privilegeCountByMonthData[month] += 1;
        });
    
        let carryForwardLeaves = 0;
        let eligibleLeaves = 0;
        let availedLeaves = 0;
        let lossOfPay = 0;
    
        for (let i = 0; i < Number(month); i++) {
            const leavesTaken = privilegeCountByMonthData[i];
    
            if (leavesTaken > 0) {
                availedLeaves += leavesTaken;
                if (carryForwardLeaves > 0) {
                    const usedCarryForward = Math.min(leavesTaken, carryForwardLeaves);
                    carryForwardLeaves -= usedCarryForward;
                    eligibleLeaves -= usedCarryForward;
                }
                eligibleLeaves -= leavesTaken;
            } else {
                carryForwardLeaves += 1;
            }
    
            // Calculate eligible leaves for the current month
            eligibleLeaves = month - availedLeaves;
        }
    
        // Adjust eligibleLeaves and calculate lossOfPay if eligibleLeaves is negative
        if (eligibleLeaves < 0) {
            lossOfPay = Math.abs(eligibleLeaves); // Convert negative eligibleLeaves to positive for lossOfPay
            eligibleLeaves = 0;                   // Set eligibleLeaves to 0 since it cannot be negative
        }
    
        let totalAllottedLeaves = 12;
        let leftOverLeaves = totalAllottedLeaves - availedLeaves;
        if(availedLeaves > month){
            availedLeaves=availedLeaves-lossOfPay;
            leftOverLeaves=totalAllottedLeaves-availedLeaves;
        }
        setLeaveData([{
            type: privilegeLeaveType.leavetype,
            alloted: totalAllottedLeaves,
            availed: availedLeaves,
            eligible: eligibleLeaves,
            lossOfPay: lossOfPay,
            leftOver: leftOverLeaves > 0 ? leftOverLeaves : 0,
        }]);
    };
    

    return (
        <div>
            <div style={{ display: "flex", marginTop: "-6%", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <section style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                        Employee Monthly Calculation Report
                    </div>
                    <table border="1" align="center" style={{ background: "linear-gradient(to bottom, #89d0f8, white)", color: "white" }}>
                        <tbody>
                            <tr>
                                <td>Select Employee</td>
                                <td>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="employee-select-label">Employee</InputLabel>
                                        <Select
                                            labelId="employee-select-label"
                                            id="employee-select"
                                            value={employee}
                                            label="Employee"
                                            onChange={(e) => setEmployee(e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={sessionStorage.getItem("emp_id")}>{sessionStorage.getItem("emp_id")}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </td>
                                <td>Records per Page</td>
                                <td>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="records-select-label">Records</InputLabel>
                                        <Select
                                            labelId="records-select-label"
                                            id="records-select"
                                            value={recordsPerPage}
                                            label="Records"
                                            onChange={(e) => setRecordsPerPage(e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>Select</em>
                                            </MenuItem>
                                            <MenuItem value={1}>1 Record</MenuItem>
                                        </Select>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="year-select-label">Year</InputLabel>
                                        <Select
                                            labelId="year-select-label"
                                            id="year-select"
                                            value={year}
                                            label="Year"
                                            onChange={(e) => setYear(e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>Select</em>
                                            </MenuItem>
                                            {years.map(y => (
                                                <MenuItem key={y} value={y}>{y}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </td>
                                <td>Month</td>
                                <td>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="month-select-label">Month</InputLabel>
                                        <Select
                                            labelId="month-select-label"
                                            id="month-select"
                                            value={month}
                                            label="Month"
                                            onChange={(e) => setMonth(e.target.value)}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {months.map((m, idx) => (
                                                <MenuItem key={idx} value={idx + 1}>{m}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" align="center">
                                    <button className="leave_draft_btn" onClick={handleGenerateClick}>Generate</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>

            <table width="100%" style={{ textAlign: "center", position: "absolute", top: "53%" }}>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid white", backgroundColor: "skyblue", padding: "5px" }} colSpan="7">
                            <center>For the Period ({months[month - 1]} {year})</center>
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: "skyblue", padding: "5px" }}>
                        <td>Name</td>
                        <td>Type</td>
                        <td>Alloted</td>
                        <td>Availed</td>
                        <td>Eligible</td>
                        <td>Loss of pay</td>
                        <td>Left over</td>
                    </tr>
                    {leaveData.map((leave, index) => (
                        <tr key={index}>
                            <td>{employee}</td>
                            <td style={{ border: "1px solid black" }}>{leave.type}</td>
                            <td style={{ border: "1px solid black" }}>{leave.alloted}</td>
                            <td style={{ border: "1px solid black" }}>{leave.availed}</td>
                            <td style={{ border: "1px solid black" }}>{leave.eligible}</td>
                            <td style={{ border: "1px solid black", color: leave.lossOfPay > 0 ? "red" : "black" }}>{leave.lossOfPay}</td>
                            <td style={{ border: "1px solid black" }}>{leave.leftOver}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LMS_leaveReport;
