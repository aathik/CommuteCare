import React from 'react';
import './index.css';

import { Route, Routes } from "react-router-dom";
import Home from './Routes/Home';
import Customer from './Routes/Customer';
import Helper from './Routes/Helper';
import HelperList from './Components/HelperList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/helper" element={<Helper />} />
        <Route path="/helperList" element={<HelperList />} />
      </Routes>
    </>
  );
}

export default App;
