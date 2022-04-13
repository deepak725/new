import React, { useState } from 'react'
import './Register.css'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { NavLink } from 'react-router-dom';
const Register = ({setUser}) => {
  const [fname,setFName] = useState("");
  const [lname,setLName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  let navigate = useNavigate();
    async function  submithandler(event)
    {
      const notify = () => toast("Email already present!");

      event.preventDefault();
      // setUser(true);
      // event.preventDefault();
      
      // navigate("/notes");
      console.log(fname,lname,email,password);
      const name = fname+" "+lname;
      const response = await fetch('http://localhost:3001/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()
    if(data.status === 'ok')
      {
          
          navigate("/");
      }
    if(data.status === 'error')
      {
        alert("Email already present")
      }
    }
  
  return (
    <div className='formcontainer2'>
        <form onSubmit={submithandler} className='registerform'>
        <div className="form-title">    
        <h3>Register</h3>
        </div>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={(e)=> {setFName(e.target.value)}} className="form-control" placeholder="First name" required />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={(e)=> {setLName(e.target.value)}} className="form-control" placeholder="Last name" required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={(e)=> {setEmail(e.target.value)}} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control" placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e)=> {setPassword(e.target.value)}} className="form-control" placeholder="Enter password" required />
                </div>

                <button type="submit" id="submit-btn" className="btn btn-dark btn-lg btn-block">Register</button>
                <NavLink to={"/"} > Already user? click here</NavLink>
            </form>
           
    </div>
  )
}

export default Register