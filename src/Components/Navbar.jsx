import React,{useState} from 'react'
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';



function Navbar() {
    const [mouseClick, setMouseClick] = useState(1);

    const navigate = useNavigate();


// Tried to Implement Button active when clicked on it

    const handleMouseClickQstn =()=>{
        setMouseClick(1)
    }
    const handleMouseClickQstnAdd =()=>{
        setMouseClick(2)
    }

  return (
   <nav className="navbar">
    <div className="container">
        <div className="appIcon">
            Quiz App
        </div>
        <ul className='linkss'>
            <button onMouseEnter={handleMouseClickQstn} className='nav_btn' onClick={()=>navigate('/qstns')}>Questions</button>
            <button onMouseEnter={handleMouseClickQstnAdd} className='nav_btn' type='button' onClick={()=>navigate('/qAdd')}>Add Questions</button>
        </ul>
        
    </div>
   </nav>
  )
}

export default Navbar