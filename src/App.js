import React from 'react';
import './index.css';

import { Route, Routes } from "react-router-dom";
import Home from './Routes/Home';
import Customer from './Routes/Customer';
import Helper from './Routes/Helper';
import AvailableHelpers from './Routes/AvailableHelpers';
import ConfirmationPage from './Routes/ConfirmationPage';
import Login from './Routes/Login';
import ForgotPass from './Routes/ForgotPass';
import SignUp from './Routes/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/helper" element={<Helper />} />
        <Route path="/availableHelpers" element={<AvailableHelpers />} />
        <Route path="/confirmationPage" element={<ConfirmationPage />} />
        
      </Routes>
    </>
  );
}

export default App;
