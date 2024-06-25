// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from '../Pages/Home';
// import ViewProfile from '../Pages/ViewProfile';
// import SubmitForm from '../Pages/SubmitForm';
// import EditPage from '../Pages/EditPage';
// import DeletePage from '../Pages/DeletePage';
// import Table from '../Pages/Table';
// import Loginpage from '../Pages/Loginpage';
// import ProtectedRouting from './ProtectedRouting';
// import ExtraEmpDetailsForm from '../Pages/ExtraEmpDetailsForm';

// const Router = () => {
//   const role=sessionStorage.getItem("role");

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Loginpage />} />
//         <Route element={<ProtectedRouting />}>
//         {
//           role==="HR"?
//           <Route path='/home' element={<Home />}>
//             <Route index element={<Table />} />
//             <Route path='viewProfile' element={<ViewProfile />} />
//             <Route path='register' element={<SubmitForm />} />
//             <Route path='edit' element={<EditPage />} />
//             <Route path='delete' element={<DeletePage />} />
//           </Route>:

//           <Route path='/skillsetForm' element={<ExtraEmpDetailsForm />} />
//         }

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Router;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import ViewProfile from '../Pages/ViewProfile';
import SubmitForm from '../Pages/SubmitForm';
import EditPage from '../Pages/EditPage';
import DeletePage from '../Pages/DeletePage';
import Table from '../Pages/Table';
import Loginpage from '../Pages/Loginpage';
import ProtectedRouting from './ProtectedRouting';
import ExtraEmpDetailsForm from '../Pages/ExtraEmpDetailsForm';
import ForgotPwd from '../Pages/ForgotPwd';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/forgotPwd' element={<ForgotPwd />} />
        <Route element={<ProtectedRouting />}>
          <Route path='/home' element={<Home />}>
            <Route index element={<Table />} />
            <Route path='viewProfile' element={<ViewProfile />} />
            <Route path='register' element={<SubmitForm />} />
            <Route path='edit' element={<EditPage />} />
            <Route path='delete' element={<DeletePage />} />
          </Route>
          <Route path='/skillsetForm' element={<ExtraEmpDetailsForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

