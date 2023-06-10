// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const redirect = useNavigate()
    axios.defaults.withCredentials= true

    const userData ={email,password }
   
      
  const handleLogin= (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', userData)
        .then((res) => {
           
            if(res.data.Status==='OK') {
                
                redirect('/home')
            }else if(res.data.Error){
                alert(res.data.Error)
            }else{
                alert(res.data.emailErr)
            }
        }).catch((err) => {
                alert(err.Err)  
            })
  }
  return (
    <div className=''>
        <div className=' d-flex align-items-center justify-content-center bg-primary vh-100' >
            <form className='p-3 my-3 mx-auto w-6/12 border bg-light rounded' onSubmit={handleLogin}>

                <div className='form-group w-75 mx-auto '>
                    <h1 className='mb-3 fw-bold'>Login</h1>
                   
                    <label htmlFor="email" className='fw-bold'>Email Address</label>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Email' className='form-control mb-3'/>

                    <label htmlFor="password" className='fw-bold'>Password</label>
                    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Password' className='form-control mb-3'/>

                    <button type="submit" className='btn btn-primary w-25 fw-bold'>Login</button>
                </div>
                <div className='d-flex align-items-center justify-content-center mt-3 '>
                    <p>Not registered? <Link to = '/register' className='text-sm'>signup here</Link></p>
                </div>
                <div className='d-flex align-items-center justify-content-center '>
                    <Link to= '/reset'>Forgot password</Link>
                </div>

            </form>
        </div>
    </div>
  )
}
