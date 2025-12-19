import React, { useState } from "react";
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import Signup from './screen/Signup'
import AdminHome from "./admin/AdminPage";
import Home from "./screen/Home";
import AdminRoute from "./route/AdminRoute"

export default function App() {


  return (
    
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Signup/>}/>
      
 <Route path="/" element={<Home/>}/>
   <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminHome />
      </AdminRoute>
    }
  />
  </Routes>
  </BrowserRouter>

  </>
  );
}
