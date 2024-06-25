 import React from "react";
import "./CSS/App.css";
import Router from "./Components/Router";
import ContentPage from "./Pages/ContentPage";
import ExtraEmpDetailsForm from "./Pages/ExtraEmpDetailsForm";
import ChipInput from "./Pages/ExtraEmpDetailsForm";
import ForgotPwd from "./Pages/ForgotPwd";
// import Loginpage from "./Pages/Loginpage";

function App() {

  return (
    <div className="app-p" style={{fontFamily:"'Times New Roman', Times, serif"}}>
      {/* <Header/> */}
      {/* <ContentPage/> */}
      {/* <Loginpage/> */}
      <Router/>
      {/* <ExtraEmpDetailsForm/> */}
      {/* <ChipInput/> */}
      {/* <ForgotPwd/> */}
    </div>
  );
}

export default App;
