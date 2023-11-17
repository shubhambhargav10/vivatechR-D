import React from 'react';
import AllRoutes from './AllRoutes';
import './App.css'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <FaArrowLeft className="back-button" onClick={()=>navigate(-1)} />
      <h1 className='h1'>Task Management App</h1>
     
      <AllRoutes/>
    </div>
  );
};

export default App;
