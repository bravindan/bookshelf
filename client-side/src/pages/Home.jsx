/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Welcome from './Welcome';

export default function HomeController() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [user_id, setuser_id] = useState();
  const [searchTerm, setSearchTerm] =useState('');
  const [books, setBooks] = useState('')
  const redirect = useNavigate();
  axios.defaults.withCredentials= true

  async function loggedInUserInfo(){
    await axios.get('http://localhost:5000').then((res) => {
      if(res.data.Status === 'OK') {
        setAuth(true)
        setName(res.data.name)
        setuser_id(res.data.id)
        
        // console.log('logged in user id:', user_id)
        // console.log('logged in user name:', name)

      }else{
        setAuth(false)
      }
    });
  }

  useEffect(() => {
    loggedInUserInfo()
  }, []);



  const handleLogout = () => {
    axios.get('http://localhost:5000/logout').then((res) => {
      // location.reload(true)
      redirect('/')
    }).catch((err) => {console.log(err)});
  };
   const handleRedirect = (user_id) =>{
      redirect('/addbook')
   }

   const getBoooksByUserID = async(user_id)=>{
    await axios.get(`http://localhost:5000/books/${user_id}`).then((res)=>{
      console.log(res.data) 
    }).catch((err)=>{
      return err
    })
  }
  getBoooksByUserID()
  //  async function getBooks(){
  //   axios.get('http://localhost:5000/books').then((res)=>{
  //     console.log(res.data)
  //     setBooks(res.data)
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  //  }
  //  getBooks()
   
  return (
    <div className='container mt-4'>
      {auth && 
      <div>
      <div className='d-flex justify-content-between'>
          <h2>Home | <span className='fs-4 fw-bold'>Library</span></h2>
         
          <details>
            <summary className='fw-bold text-primary'> Welcome {name}</summary>
           <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
          </details>    
      </div>
      <hr/>
          <div className='d-flex align-items-center justify-content-between'>
              <button onClick={handleRedirect} className='btn btn-secondary mx-4'> +New</button>
              <input type="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} name="search" id="" placeholder='Type to search' className='form-control mx-12'/>
          </div>
          {user_id}
          {(books.length==0 && <>{books}</>)  }
          
      </div>}
      
    </div>
  )
}
