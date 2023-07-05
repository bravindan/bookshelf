import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Newbook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [summary, setSummary] = useState('')

  const {user_id} =useParams();

  console.log(user_id)
  // const formData = new FormData()
  // formData.append('book_title', title);
  // formData.append('book_author', author);
  // formData.append('book_summary', summary);
  // formData.append('user_id', user_id);
const bookDetails = {
  book_title, book_author, book_summary, user_id
}

const addNewBook = async (event)=>{
  event.preventDefault();
  console.log(bookDetails)

  try {
    const response = await axios.post('http://localhost:5000/addbook', bookDetails);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className='d-flex align-items-center justify-content-center bg-primary vh-100'>
        <form  className='p-3 my-3 mx-auto w-6/12 border bg-light rounded' onSubmit={addNewBook}>
        <h1>Add New Book</h1>
          <input type="text" name="book_title" value={title} onChange={(event)=>setTitle(event.target.value)} placeholder='Book title' className='form-control mb-3 h-10'  />
          <input type="text" name="book_author" value={author} onChange={(event)=>setAuthor(event.target.value)} placeholder='Book author' className='form-control mb-3 h-10'/>
          <input type="file" name=""  accept="image/jpeg, image/png" className='form-control mb-3'/>
          <textarea rows="4" name="book_summary" value={summary} onChange={(event)=>setSummary(event.target.value)} placeholder='Book summary' className='form-control mb-3'></textarea>
          <button type="submit" className='btn btn-primary w-25 fw-bold'>Add</button>
        </form>
    </div>
  )
}

export default Newbook