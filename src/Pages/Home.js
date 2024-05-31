import React from 'react'
import ContentPage from './ContentPage'
import Header from '../Components/Header'
import {Outlet} from "react-router-dom";
import ViewProfile from './ViewProfile';


const Home = () => {
  return (
    <div>
        <Header/>
        {/* <ContentPage/>  */}
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Home