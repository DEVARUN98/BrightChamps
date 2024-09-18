import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom'
import React,{useState,useEffect} from 'react';
import Questions from './Components/Questions';
import Qstnadd from './Components/Qstnadd';
import Navbar from './Components/Navbar';


function App() {
  // let navigate = useNavigate();


  return (
    
    <>
    
    <Router>
    {" "}
    <Navbar/>
      <Routes>{" "}
      <Route path='' element={<Questions/>} />
        <Route path='qAdd' element={<Qstnadd/>} />
      </Routes>{" "}
    </Router></>
    


  );
}

export default App;
