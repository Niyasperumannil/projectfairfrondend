import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/ContentShare'

function Auth({register}) {
  const navigate =useNavigate()
  const {setLoginResponse} = useContext(loginResponseContext)
  const [userDetails ,setUserDetails] =
  useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userDetails);
  
 const handleRegister = async()=>{
  const {username, email,password} = userDetails 
  if(!username || !email || !password){
      toast.info('please fill the details')
  }else{
    const result = await registerApi({username, email,password})
    console.log(result);
    if(result.status==200){
      toast.success('Registretion succesful')
      setUserDetails({
        username:"",
        email:"",
        password:""
      })
      navigate('/login')
    }
    else if(result.status==406){
      toast.warning(result.respose.data)
    }
    else{
      toast.danger('something went wrong')
    }
    

  }
 }
 const handleLogin = async()=>{
  const {email, password} =userDetails
  if(!email || !password ){
    toast.info('please fill completely')
  }else{
    const result =await loginApi({email, password})
    console.log(result);
    if(result.status==200){
      setLoginResponse(true)
      toast.success("login successful")
      sessionStorage.setItem("existngUser", JSON.stringify(result.data.existngUser))
      sessionStorage.setItem("token",result.data.token)

      setUserDetails({
        username:"",
        email:"",
        password:""
      })
      setTimeout(()=>{
        navigate('/')
      },2000)
      
    }
    else if (result.status==406){
      toast.warning(result.respose.data)
      setUserDetails({
        username:"",
        email:"",
        password:""
      })
    }else{
      toast.error('something went wrong')
      setUserDetails({
        username:"",
        email:"",
        password:""
      })
    }
  }
 }
  return (
    <>
    {<div className='my-5'>
      <div className="row my-4">
      <div className="col-md-2"></div>
      <div className="col-md-8">
      <h4><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back Home</h4>
        <div className="row bg-success">
          <div className="col-md-6 d-flex align-items-center justify-content-center my-5">
            <img src='' alt="no image" className='w-75'/>
          </div>
          <div className="col-md-6 mt-5">
          <h3 className='text-light text-center mt-3 '>
          <span className='fs-3 me-2'><FontAwesomeIcon icon={faStackOverflow} className='me-2' /></span>
            Project Fair
          </h3>
{ !register ?         <p className='text-light text-center'>Sign in to your account</p>:
          <p className='text-light text-center'>Sign up to your account</p>}
          <div className=''>
            
          {register && <input type="text" placeholder='Username'  className='form-control mt-3' onChange={(e)=>
            setUserDetails({...userDetails ,username:e.target.value})
          } value={userDetails.username}/> }
            
            <input type="text" placeholder='Email'  className='form-control mt-3' onChange={(e)=>
            setUserDetails({...userDetails , email:e.target.value})
          } value={userDetails.email}/>
            <input type="password" placeholder='password' className='form-control mt-3' onChange={(e)=>
            setUserDetails({...userDetails ,password:e.target.value})
          }value={userDetails.password}/>

{!register ?<div>
              <button className='btn btn-primary w-100 mt-3' onClick={handleLogin}>Login</button>
              <p className='text-warning mt-3'>New user ? click here to <Link to={'/register'} style={{color:'white'}}>Register</Link></p>
</div>

:
<div>
              <button className='btn btn-primary w-100 mt-3'  onClick={handleRegister} >Register</button>
              <p className='text-warning mt-3'>Allready a user ? click here to <Link to={'/login'}style={{color:'white'}}>Login</Link></p>
</div>}


          </div>

          </div>
        </div>

      </div>
      <div className="col-md-2"></div>
      </div>
      
    </div>}
    <ToastContainer theme="colored" position="top-center" autoClose={2000}/>
    </>
  )
}

export default Auth
