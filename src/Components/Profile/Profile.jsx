import React,{useEffect,useState} from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa';

const Profile = ({setUser}) => {
  let navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");

  async function getusername()
  {
    const req = await fetch('http://localhost:3001/username', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
    })

    const data = await req.json()
		if (data.status === 'ok') {
			setUsername(data.data.name)
      setEmail(data.data.email)
		} 
  }
  


useEffect(() => {

 getusername();
  

 
}, [])
  return (
    <div className='profile'>
      <div className='profile-username'>
      <h1>Username: {username} </h1> 
      <FaEdit className='edit'/>
      </div>
      
      <h2>Email: {email}</h2>
      <button type="submit" id="submit-btn" className="btn btn-dark btn-lg btn-block" onClick={(event)=>{
        
        event.preventDefault();
        setUser(false);
        navigate("/");
        const token = localStorage.getItem('token');
				localStorage.removeItem(token)

      }} >Logout</button>
      </div>
  )
}

export default Profile