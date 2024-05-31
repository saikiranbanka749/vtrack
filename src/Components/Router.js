import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ContentPage from '../Pages/ContentPage';
import Home from '../Pages/Home';
import ViewProfile from '../Pages/ViewProfile';
import SubmitForm from '../Pages/SubmitForm';
import EditPage from '../Pages/EditPage';
import DeletePage from '../Pages/DeletePage';
import Table from '../Pages/Table';
import Loginpage from '../Pages/Loginpage';

const Router = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loginpage />} />
          <Route path='/Home' element={<Home />}>
            <Route path='/Home' element={<Table />} />
            <Route path='viewProfile' element={<ViewProfile />} />
            <Route path='register' element={<SubmitForm />} />
            <Route path='edit' element={<EditPage />} />
            <Route path='delete' element={<DeletePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router