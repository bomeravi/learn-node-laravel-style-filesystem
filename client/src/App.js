import React, { useState } from 'react';

import { BrowserRouter,Routes, Route} from 'react-router-dom'
import {Error, Signin, Signup,Homepage}  from './app/frontend/pages'
import { JwtService } from "./services/jwtService";
import {AdminLayout} from "./app/backend/layouts"
import {Profile, Dashboard} from "./app/backend/pages"

JwtService.isAuthTokenValid(JwtService.getAccessToken());

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
              <AdminLayout />
          }
        
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route index path="/admin/profile" element={<Profile />} />
          <Route  element={<Error />} />
        </Route>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Signin />} />
        
        <Route path='/' element={<Homepage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
