// eslint-disable-next-line no-unused-vars
import React from "react"
import { Link } from "react-router-dom"

function Welcome() {
  return (

    <div className="d-flex ">
      <h1 className="bg-primary vh-100 d-flex align-items-center fw-bold text-white">BOOKSHELF</h1>
      <div className="mt-5 mx-auto w-75">
        <h1 className="fw-bold ">Welcome</h1>
          <h2 className="mt-5 lh-md bg-light d-flex align-items-center justify-content-center fs-3 text-wrap">This is your digital bookshelf for keeping track of your favourite books, that you have read or wish to read. Say goodbye to the traditional paper method and enjoy the full potential of this app. Good news is, you can access it anywhere anytime provided you are connected to the internet.
          </h2>
          <h3 className="mt-5">
              <p className="">To proceed, you can <Link to='/login'>login </Link>or <Link to='/register'>register </Link>a new account.</p>
          </h3> 
      
      </div>
    </div>
  )
}

export default Welcome