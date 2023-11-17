import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

import Navbar from './components/navbar';
import Home from './components/home';
import SignUp from './components/signup';
import Note from "./components/note";
import Task from './components/task'
import Profile from "./components/profile";

import './App.css';

function App() {
  function isLogin(elementToRender){
    const user =  Cookies.get('user');
    if(user === undefined){
      return (
        <Navigate to="/signup"/>
      )
    }else{
      return elementToRender
    }
  }
  return (
    <BrowserRouter>

        <Navbar></Navbar>
        <Routes>
          <Route 
          index 
          element={<Home/>}
          />
          <Route 
          path='/signUp' 
          element={<SignUp/>}
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
          element={isLogin(<Profile/>)}
          />
        </Routes>
       
      
    </BrowserRouter>
  );
}

export default App;
