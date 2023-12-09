
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import Cookies from 'js-cookie';


import Navbar from './components/common/Navbar';
import Home from './components/dashboard/Home';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Note from "./components/dashboard/Note";
import Task from './components/dashboard/Task';
import Profile from './components/dashboard/Profile';

import './App.css';


function App() {
  function isLogin(elementToRender){
    const user =  Cookies.get('user');
    if(user && user !== ""){
      return elementToRender
    }else{
      return (
        <Navigate to="/signup"/>
      )
    }
  }
  return (
    <BrowserRouter>

        <Navbar></Navbar>
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
        </Routes>
       
      
    </BrowserRouter>
  );
}

export default App;
