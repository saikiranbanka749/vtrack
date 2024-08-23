import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Loginpage.css';
import { useNavigate } from 'react-router-dom';

function Loginpage() {
    const [errors, setErrors] = useState({});
    const [val, setVal] = useState({});
    const [details, setDetails] = useState({
        emp_id: '',
        emp_password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));

        // Clear errors for the current field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value === "" ? `${name === "emp_id" ? "Employee ID" : "Password"} required` : ""
        }));

        // Clear server validation errors
        setVal({});
    };

    const Clicked = async (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {};

        if (details.emp_id === "") {
            newErrors.emp_id = 'Employee ID required';
            isValid = false;
        }
        if (details.emp_password === "") {
            newErrors.emp_password = 'Password required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            localStorage.setItem('LoginDetails', JSON.stringify(details));

            try {
                const { data } = await axios.post("http://localhost:3003/employeeDetails/login_emp_details", details);

                if (data) {
                    sessionStorage.setItem("emp_id", data.data[0].emp_id);
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("role", data.data[0].role);

                    // Convert the object to a JSON string before storing it
                    localStorage.setItem("data", JSON.stringify(data.data[0]));

                    console.log(data.data[0]);

                    setDetails({
                        emp_id: "",
                        emp_password: ''
                    });

                    navigate('/home-page');
                } else {
                    alert("Something went wrong");
                }
            } catch (err) {
                if (err.response) {
                    const Err = {};

                    if (err.response.status === 404 || 400 || 401) {
                        Err.errors = 'Username or Password Invalid';
                        setDetails({
                            emp_id: "",
                            emp_password: ''
                        });
                    }

                    setVal(Err);
                } else {
                    console.error("Error during login:", err);
                }
            }
        }
    };

    const forgotHandler = () => {
        navigate("/forgotPwd");
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className='login-p'>
            <div>
                <div>
                    <img className='image_Vtrack' src="/assets/vtrack-logo.png" alt='logo' />
                </div>
                <div className='login_headLine_text'>
                    Employee Login
                </div>
                <div className='Login_page'>
                    <div>
                        <table className='login_table'>
                            <tbody>
                                <tr>
                                    <td>
                                        <form onSubmit={Clicked}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>{val.errors && <span className='error_span'> {val.errors}</span>}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input
                                                                className='Input_field'
                                                                type='text'
                                                                name='emp_id'
                                                                placeholder='Employee ID'
                                                                value={details.emp_id}
                                                                onChange={changeHandler}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{errors.emp_id && <span className='error_span'> {errors.emp_id}</span>}<br /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input
                                                                type={showPassword ? 'text' : 'password'}
                                                                className='Input_field'
                                                                name='emp_password'
                                                                placeholder='Password'
                                                                value={details.emp_password}
                                                                onChange={changeHandler}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{errors.emp_password && <span className='error_span'> {errors.emp_password}</span>}<br /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input
                                                                className='checkbox_input'
                                                                type="checkbox"
                                                                checked={showPassword}
                                                                onChange={togglePasswordVisibility}
                                                            /> Show Password
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button className="login-button" type="submit">Login</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='login_forgot_pwd'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <img className='vensai_log_img' alt='vensai logo' src='assets/vensai-logo.png' />
                                    </td>
                                </tr>
                                <tr>
                                    <td onClick={forgotHandler}>
                                        <div className='forgot_pwd_txt'>
                                            <div className='forgot_pwd_txt_data'>Forget Password?</div>
                                            <div className='txt'>
                                                Click here to receive password<br />
                                                via your registered email address.
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='Login_footer'>
                    © 2013, Vensai Technologies All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Loginpage;
