import React from 'react'

function Newbook() {
  return (
    <div className='d-flex align-items-center justify-content-center bg-primary vh-100'>
        <form  className='p-3 my-3 mx-auto w-6/12 border bg-light rounded'>
        <h1>Add New Book</h1>
          <input type="text" placeholder='Book title' className='form-control mb-3 h-10'  />
          <input type="text" name="" id="" placeholder='Book author' className='form-control mb-3 h-10'/>
          <input type="file" className='form-control mb-3'/>
          <textarea rows="4" placeholder='Book summary' className='form-control mb-3  '></textarea>
          <button className='btn btn-primary w-25 fw-bold'>Add</button>
        </form>
      </div>
  )
}

export default Newbook