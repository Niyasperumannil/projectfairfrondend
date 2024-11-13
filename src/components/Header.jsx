import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'
import { loginResponseContext } from '../context/ContentShare'

function Header() {
  const [token,setToken] = useState("")
  const navigate = useNavigate()
  const {setLoginResponse} = useContext(loginResponseContext)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  const handleLogout = ()=>{
    sessionStorage.removeItem("existngUser")
    sessionStorage.removeItem("token")
    setLoginResponse(false)
    navigate('/')
  }
  return (
    <>
        <Navbar className="bg-success">
      <Container>
        <Navbar.Brand className='text-light'>
        <Link to={'/'}>  <span className='fs-3 mt-5 me-2'> <FontAwesomeIcon icon={faStackOverflow} /> Project Fair</span></Link>

        </Navbar.Brand>

{  token &&        <button className='btn btn-primary' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2'/>logout</button>
}  
     </Container>
    </Navbar>
    </>
  )
}

export default Header
