import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar';
import Home from './components/home';
import SignUp from './components/signup';
import Note from "./components/note";
import Task from './components/task'

import './App.css';

function App() {
  return (
    <BrowserRouter>

        <Navbar></Navbar>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path='/SignUp' element={<SignUp/>}></Route>
          <Route path='/note' element={<Note/>}></Route>
          <Route path='/task' element={<Task/>}></Route>
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
