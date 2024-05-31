 import React from "react";
import "./CSS/App.css";
import Router from "./Components/Router";
import ContentPage from "./Pages/ContentPage";
// import Loginpage from "./Pages/Loginpage";

function App() {

  return (
    <div className="app-p" style={{fontFamily:"'Times New Roman', Times, serif"}}>
      {/* <Header/> */}
      {/* <ContentPage/> */}
      {/* <Loginpage/> */}
      <Router/>
    </div>
  );
}

export default App;
