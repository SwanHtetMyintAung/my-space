
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState } from "react";


import Navbar from './components/common/Navbar';
import Home from './components/dashboard/Home';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Note from "./components/dashboard/Note";
import Task from './components/dashboard/Task';
import Profile from './components/dashboard/Profile';
import PageNotFound from './components/dashboard/PageNotFound'

import './App.css';


function App() {
  const [login , setLogin]= useState(Boolean(Cookies.get('user')))
  //check there's "user" cookie or not
  //basically authorize function
  function isLogin(elementToRender){
    //const user =  Cookies.get('user');
    if(login){
      return elementToRender
    }else{
      return(
        <Navigate to="/signup"/>
      )
    }
  }
  return (
    <BrowserRouter>

        <Navbar login={login}></Navbar>
        <Routes>
          <Route 
          index 
          element={<Home cookies={Cookies.get('user')}/>}
          />
          <Route 
          path='/signup' 
          element={<SignUp/>}
          />
          <Route 
          path='/login' 
          element={<Login/>}
          />
          <Route 
          path='/note' 
          element={isLogin(<Note/>)}
          />
          <Route 
          path='/task' 
          element={isLogin(<Task/>)}
          />
          <Route 
          path='/profile'
          element={isLogin(<Profile url="http://localhost:3000/profile"/>)}
          />
          <Route
          path="*"
          element={<PageNotFound/>}
          />
        </Routes>
       
      
    </BrowserRouter>
  );
}

export default App;
