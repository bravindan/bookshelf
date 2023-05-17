// eslint-disable-next-line no-unused-vars
import React, {useState, useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Register() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const redirect = useNavigate()
    const userData ={
        name,
        email,
        password
    }

    const handleRegistration = (e) =>{
        e.preventDefault();

        axios.post('http://localhost:5000/register',userData)
        .then((response) => {
            console.log(response.data)
            redirect('/login')
            setname('')
            setemail("")
            setpassword('')
        }).catch((err) => {
            console.log(err.message)
        })
            
        
    }


  return (
    <div className=''>
        <div className='d-flex align-items-center justify-content-center vh-100 bg-primary' >
            <form className='p-3 my-3 w-75 border bg-white rounded' onSubmit={handleRegistration}>

                <div className='form-group mx-auto w-100'>
                    <h1 className='mb-3 fw-bold'>Register</h1>
                    <label htmlFor="name" className='fw-bold'>Name</label>
                    <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder='Name' className='form-control mb-3'/>

                    <label htmlFor="email"><strong>Email Address</strong></label>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Email' className='form-control mb-3'/>

                    <label htmlFor="password" className='fw-bold'>Password</label>
                    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Password' className='form-control mb-3'/>

                    <button type="submit" className='btn btn-primary w-25 fw-bold'>Register</button>
                </div>
                <div className='d-flex align-items-center justify-content-center mt-3 '>
                    <p>Already registered? <Link to = '/login' className='text-sm'>Login here</Link></p>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Register