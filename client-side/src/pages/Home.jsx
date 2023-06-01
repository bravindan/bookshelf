/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function HomeController() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const redirect = useNavigate();
  axios.defaults.withCredentials= true


  useEffect(() => {
    axios.get('http://localhost:5000').then((res) => {
      // console.log(res.data.name)
      
      if(res.data.Status === 'OK') {
        setAuth(true)
        setName(res.data.name)
      }else{
        setAuth(false)
      }
    });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:5000/logout').then((res) => {
      location.reload(true)
    }).catch((err) => {console.log(err)});
  };
   const handleRedirect = () =>{
      redirect('/addbook')
   }

  return (
    <div className='container mt-4'>
      {
      auth? 
      <div>
      <div className='d-flex justify-content-between'>
          <h2>Home | <span className='fs-4 fw-bold'>Library</span></h2>
         
          <details>
            <summary className='fw-bold text-primary'> Welcome,{name}</summary>
           <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
          </details>    
      </div>
      <hr/>
          <div className='d-flex align-items-center justify-content-between'>
              <button onClick={handleRedirect} className='btn btn-secondary mx-4'> +New</button>
              <input type="search" name="search" id="" placeholder='Type to search' className='form-control mx-12'/>
          </div>
      
      </div>
        : 
        <div className='d-flex align-items-center justify-content-center fw-bold fs-5 fst-italic'>
          <h1>Oops!...</h1>
          <p>You are not authorized, please log in. <Link to='/login'>Login</Link></p>
        </div>
          
      }
      
    </div>
  )
}
