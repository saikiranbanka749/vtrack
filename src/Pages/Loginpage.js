import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Loginpage.css';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Components/ApiCalls/BaseApIUrl';


function Loginpage() {
  const [errors, setErrors] = useState({});
  const [val, setVal] = useState({});
  const [details, setDetails] = useState({
    email: '',
    pwd: ''
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));

    setVal({});
    if (value === "") {
      if (name === "email") {
        errors.email = "Email required"
      }
      if (name === "pwd") {
        errors.pwd = "Password required"
      }
    } else {
      errors[name] = "";
    }
  };

  const Clicked = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    if (details.email === "") {
      newErrors.email = 'Email required';
      isValid = false;
    }
    if (details.pwd === "") {
      newErrors.pwd = 'Password required';
      isValid = false;
    }
    localStorage.setItem('LoginDetails', JSON.stringify(details));
    console.log(details.pwd)
    setErrors(newErrors);


    if (isValid) {
      try {
        const { data } = await axiosInstance.post(`${process.env.REACT_APP_LOGIN_END_POINT}`, details);
        // console.log(data.token);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.data.e_role);
        setDetails({
          email: "",
          pwd: ''
        })
        // console.log("role::::===:::=>",data.e_role);
        if (sessionStorage.getItem("role") === "HR") {
          navigate('/home')
        }
        else {
          navigate("/skillsetForm")
        }
      }
      catch (err) {
        if (err.response) {
          const Err = {};

          if (err.response.status === 404) {
            // alert('Error 404: Not Found');

            Err.errors = 'Username or Password Invalid';
            setDetails({
              email: "",
              pwd: ''
            })

          }
          setVal(Err);
        }

      }

    }


  };
  const forgotHandler = () => {
    navigate("/forgotPwd");
  }

  return (
    <div className='login-p'>

      <div style={{ fontFamily: "'Times New Roman', Times, serif" }} className='card-container'>
        <div className=''>
          <img height="300px" width="400px" src="/assets/vtrack-logo.png" alt='logo' />
        </div>
        <div>
          <table>
            <tr>
              <td> <div className="card">
                <h1 >Login Page</h1>
                <form>
                  <table style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    <tr><td></td>
                      <td> {val.errors && <span style={{ color: 'red' }}> {val.errors}</span>}</td></tr>
                    <tr>
                      <td><label style={{ fontWeight: "bold" }}>UserName:</label></td>

                      <td>
                        <input style={{ fontFamily: "'Times New Roman', Times, serif", color: "black", border: "2px solid black", borderRadius: "3px", height: "22px" }} type='text' name='email' placeholder='Enter Email' value={details.email} onChange={changeHandler} />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{errors.email && <span style={{ color: 'red' }}> {errors.email}</span>}<br /></td>
                    </tr>
                    <tr>
                      <td><label style={{ fontWeight: "bold" }}>Password:</label></td>

                      <td><input type='password' style={{ fontFamily: "'Times New Roman', Times, serif", color: "black", border: "1px solid lightblack", borderRadius: "3px", height: "22px" }} name='pwd' placeholder='Enter password' value={details.pwd} onChange={changeHandler} /></td>
                    </tr>
                    <tr>
                      <td> </td>
                      <td>{errors.pwd && <span style={{ color: 'red', fontFamily: "'Times New Roman', Times, serif" }}> {errors.pwd}</span>}<br /></td>
                    </tr>
                    <tr><td></td>
                      <td>
                        <button className="login-button" onClick={Clicked}>Login</button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>

                    <tr>
                      <td></td>

                      <td className='forget' onClick={forgotHandler}>Forget Password?</td>
                    </tr>

                  </table>
                </form>
              </div></td>

            </tr>
          </table>
        </div>


      </div>
    </div>
  );
}

export default Loginpage;
