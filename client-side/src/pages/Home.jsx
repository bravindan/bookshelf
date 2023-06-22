/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link,useParams } from 'react-router-dom';
import Welcome from './Welcome';

export default function HomeController() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [user_id, setuser_id] = useState();
  const [searchTerm, setSearchTerm] =useState('');
  const [books, setBooks] = useState('')
  const redirect = useNavigate();
  axios.defaults.withCredentials= true

  function loggedInUserInfo(){
   axios.get('http://localhost:5000').then((res) => {
    
      if(res.data.Status === 'OK') {
        setAuth(true)
        setName(res.data.name)
        setuser_id(res.data.id)

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
   const handleRedirect = () =>{
      redirect(`/addbook/${user_id}`)
   }

   const getBoooksByUserID = async(user_id)=>{
    await axios.get(`http://localhost:5000/books?user_id=${user_id}`).then((res)=>{
      // console.log(res.data) 
      setBooks(res.data.result)
      // console.log(user_id)

    }).catch((err)=>{
      return err
    })
  }
  useEffect(()=>{
    getBoooksByUserID(user_id)
  },[user_id])
  
   
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
          {/* {user_id} */}
          <div className='mt-3'>
         
              {books && books.length > 0 ?(
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4'>{books.map((book)=>(
                <div key={book.book_id}>
                  <h3>{book.book_title}</h3>
                  <p>Author: {book.book_author}</p>
                  <p>{book.book_summary}</p>

                </div>
              ))}</div>)
              
              : <div><p className='text-center mt-4 text-lg font-bold'>{books? books.msg:"No records yet for this user"}</p></div> }
             
          </div>
          
      </div>}
      
    </div>
  )
}
