import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import emailjs from '@emailjs/browser';

function LeaveFromEmp() {
    const [leaveType, setLeaveType] = useState([]);
    const [userLeaves, setUserLeaves] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [departDetails, setDepartmentDetails] = useState({});
    const [managerDetails, setManagerDetails] = useState({});
    const [dialogBox, setDialogBox] = useState(false);
    const [leaveForm, setLeaveForm] = useState({
        leave_id: "",
        leave_applied_date: "",
        fromdate: "",
        todate: "",
        leavemode1: "",
        leavemode2: "",
        duration: "",
        reason: "",
        leavetypeid: "",
        emp_id: "",
        privilage_id: ""
    });

    const [localStorageData, setLocalStorageData] = useState(() => {
        const storedData = localStorage.getItem("data");
        return storedData ? JSON.parse(storedData) : {};
    });

    const [leaveCal, setLeaveCal] = useState({
        sickCal: 0,
        privilageCal: 0,
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("data"));

        axios.get(`http://localhost:3003/LMS-page/get_leave_types?emp_id=${sessionStorage.getItem("emp_id")}&department_id=${storedData.department_id.toString()}`)
            .then((res) => {
                setLeaveType(res.data.leaveTypes);
                setUserLeaves(res.data.userLeaves);
                setDepartmentDetails(res.data.departmentDetails[0]);
                setManagerDetails(res.data.managerDetails[0]);

                calculateLeaveData(res.data.userLeaves);
            })
            .catch(err => console.log(err));

        const currDate = new Date();
        setLeaveForm((prev) => ({
            ...prev,
            leave_applied_date: `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`,
            leave_id: `leave_${Math.floor(Math.random() * 100000)}`
        }));
    }, []);

    const calculateLeaveData = (leaves) => {
        const calSickDuration = leaves
            .filter(ele => ele.leavetypeid === 151)
            .map(ele => Number(ele.duration) || 0)
            .reduce((acc, cur) => acc + cur, 0);

        const calPrivilageDuration = leaves
            .filter(ele => ele.leavetypeid === 152)
            .map(ele => Number(ele.duration) || 0)
            .reduce((acc, cur) => acc + cur, 0);

        setLeaveCal({ sickCal: calSickDuration, privilageCal: calPrivilageDuration });
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "todate" && leaveForm.fromdate) {
            if (new Date(value) < new Date(leaveForm.fromdate)) {
                alert("End Date must be greater than or equal to Start Date.");
                return;
            }
        }
        if (name === "fromdate" && leaveForm.todate) {
            if (new Date(value) > new Date(leaveForm.todate)) {
                alert("Start Date must be less than or equal to End Date.");
                return;
            }
        }
        if (value === "152") {
            setIsValid(!isValid);
        } else {
            setIsValid(false);
        }

        if (value === "153") {
            setDialogBox(!isValid);
        }
        else {
            setDialogBox(false);
        }
        setLeaveForm((prev) => ({ ...prev, [name]: value }));
    };

    const calculateDuration = (fromdate, todate, leavemode1, leavemode2) => {
        const date1 = new Date(fromdate);
        const date2 = new Date(todate);
        const timeDifference = date2 - date1;
        let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

        if (leavemode1 === "H") {
            daysDifference -= 0.5;
        }
        if (leavemode2 === "H") {
            daysDifference -= 0.5;
        }

        return daysDifference;
    };

    const submitHandler = async () => {
        try {
            const leavemode = `${leaveForm.leavemode1}-${leaveForm.leavemode2}`;
            const duration = calculateDuration(leaveForm.fromdate, leaveForm.todate, leaveForm.leavemode1, leaveForm.leavemode2);
            const emp_id = "VEN0383";
            const status = "pending";

            const updatedLeaveForm = {
                ...leaveForm,
                leavemode,
                duration,
                emp_id,
                status
            };

            delete updatedLeaveForm.leavemode1;
            delete updatedLeaveForm.leavemode2;

            await axios.post("http://localhost:3003/LMS-page/post_leave_form", updatedLeaveForm);
            alert("Data added successfully");

            const email = managerDetails.email;
            const serviceId = 'service_x1nk02l';
            const templateId = 'template_yhtpkoc';
            const userId = 'GV5Di06yHsm2ByopJ';
            const templateParams = {
                reply_to: email,
                to_name: managerDetails.emp_first_name,
                from_name: localStorageData.emp_first_name,
                message: leaveForm.reason,
                reply_cc: "thullurivamsi25@gmail.com;mr.vamsithulluri25@gmail.com"
            };

            await emailjs.send(serviceId, templateId, templateParams, userId);
            console.log('Email sent successfully!');

            setLeaveForm({
                leave_id: "",
                leave_applied_date: "",
                fromdate: "",
                todate: "",
                leavemode1: "",
                leavemode2: "",
                duration: "",
                reason: "",
                leavetypeid: "",
                emp_id: "",
                privilage_id: ""
            });

            const res = await axios.get(`http://localhost:3003/LMS-page/get_leave_types?emp_id=${emp_id}`);
            setUserLeaves(res.data.userLeaves);
            calculateLeaveData(res.data.userLeaves);

        } catch (err) {
            console.log(err);
        }
    };

    const leaveSummaryData = leaveType
        .filter(leave => !["Workers' Compensation", "Work From Home", "Paternity Leave"].includes(leave.leavetype))
        .map((leave) => {
            const availed = leave.leavetypeid === 151 ? leaveCal.sickCal : leave.leavetypeid === 152 ? leaveCal.privilageCal : 0;
            const leftOver = leave.leaves_per_year - availed;

            return {
                leaveType: leave.leavetype,
                allotted: leave.leaves_per_year,
                availed,
                leftOver
            };
        });
    return (
        <div style={{position:"absolute", top:"165px"}} >
            <div style={{ display: "flex", columnGap: "200px", backgroundColor: "skyblue", padding: "10px", width:"100%" }}>
                        <div>Choose Approver</div>
                        <div>To Manager: {managerDetails.emp_first_name} - {managerDetails.email}</div>
                        <div>Apply Leave Form</div>
                    </div>
            <div style={{ display: "flex" }}>
                <div style={{ border: "2px solid rgb(203, 219, 226)", width: "40%" }}>
                    <table  Name="leave_tbl" width="100%">
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td>{localStorageData.emp_first_name}</td>
                            </tr>
                            <tr>
                                <td>Department</td>
                                <td>{departDetails.department_name}</td>
                            </tr>
                            <tr>
                                <td>
                                    Type<span style={{ color: "red" }}>*</span>
                                </td>
                                <td>
                                    <select onChange={changeHandler} name="leavetypeid" value={leaveForm.leavetypeid}>
                                        <option value="">Select</option>
                                        {leaveType?.map((ele, i) => (
                                            <option value={ele.leavetypeid} key={i}>
                                                {ele.leavetype}
                                            </option>
                                        ))}
                                    </select>
                                    {
                                        dialogBox && (
                                            <div style={{ position: "absolute", zIndex: "9", border: "1px solid lightblue", backgroundColor: "white", color: "black", borderRadius: "10px", top: "130px", left: "30%" }}>
                                                <DialogContent dividers>
                                                    <Typography gutterBottom>
                                                        "Paternity Leave" needs to be Approved by GOPI CHAND,<br />
                                                        NOT by your reporting Manager.<br />
                                                        Your Leave Request will be sent to GOPI CHAND.
                                                    </Typography>
                                                    <Button autoFocus onClick={() => setDialogBox(false)}>
                                                        Ok
                                                    </Button>
                                                </DialogContent>
                                            </div>
                                        )
                                    }

                                </td>
                                {leaveForm.leavetypeid === "152" && (
                                    <td style={{ position: "absolute", left: "21.5%" }}>
                                        <select name="privilage_id" onChange={changeHandler} value={leaveForm.privilage_id}>
                                            <option value="">Select</option>
                                            <option value="1">Privilege</option>
                                            <option value="2">Emergency</option>
                                        </select>
                                    </td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    Start Date<span style={{ color: "red" }}>*</span>
                                </td>
                                <td>
                                    <input name="fromdate" onChange={changeHandler} value={leaveForm.fromdate} type="date" />
                                </td>
                                <td style={{ position: "absolute", left: "18%" }}>
                                    <select name="leavemode1" onChange={changeHandler} value={leaveForm.leavemode1}>
                                        <option value="">Select</option>
                                        <option value="F">Full Day</option>
                                        <option value="H">Half Day</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    End Date<span style={{ color: "red" }}>*</span>
                                </td>
                                <td>
                                    <input name="todate" onChange={changeHandler} value={leaveForm.todate} type="date" />
                                </td>
                                <td style={{ position: "absolute", left: "18%" }}>
                                    <select name="leavemode2" onChange={changeHandler} value={leaveForm.leavemode2}>
                                        <option value="">Select</option>
                                        <option value="F">Full Day</option>
                                        <option value="H">Half Day</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Reason<span style={{ color: "red" }}>*</span>
                                </td>
                                <td>
                                    <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        style={{ width: "250px" }}
                                        required
                                        name="reason"
                                        onChange={changeHandler}
                                        value={leaveForm.reason}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{ display: "flex", columnGap: "5px" }}>
                                    <button onClick={submitHandler} className="leave_draft_btn">Grant Leave</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="approval_content">
                        <div style={{ textAlign: "center", fontWeight: "bolder", paddingBottom: "10px" }}>
                            Approvers
                        </div>
                        <span>To: {managerDetails.emp_first_name} - {managerDetails.email}</span>
                        <div>CC: VINOD KUMAR - hr@vensaiinc.com</div>
                    </div>
                    <table className="leave_summary_tbl" border="1" width="100%" align="center">
                        <thead style={{ backgroundColor: "skyblue" }}>
                            <tr>
                                <th colSpan="4">Leave Summary</th>
                            </tr>
                            <tr>
                                <th>Leave Type</th>
                                <th>Allotted</th>
                                <th>Availed</th>
                                <th>Left Over</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center", backgroundColor: "lightgrey" }}>
                            {leaveSummaryData.map((leave, index) => (
                                <tr key={index}>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.allotted}</td>
                                    <td>{leave.availed}</td>
                                    <td>{leave.leftOver}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ color: "green", position: "absolute", top: "280px" }}>
                        Note: Privilege Leaves are calculated on a monthly basis. You are eligible
                        to take only one leave per month. If you exceed more leaves than eligible for
                        a month, it will be calculated as Loss of Pay.
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeaveFromEmp;