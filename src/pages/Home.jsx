
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import  photo  from '../assets/images.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'

function Home() {
    const [isLogin, setIsLogin] = useState(false)
    const [homeProject, setHomeProject] = useState([])

    const getHomeProject= async()=>{
        const result = await homeProjectApi()
        setHomeProject(result.data)
    }
    console.log(homeProject);
    

    useEffect(()=>{
        getHomeProject()
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    },[])
  return (
    <>
    <div style={{height:'100vh'}} className='bg-success p-5'>
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-6 mt-5">
                <h1 className='text-center' style={{fontSize:'100px',color:'white'}}>Project Fair</h1>
                <p className='text-center' style={{fontSize:'20px'}}>One stop destination for all software development project</p>
                <div className='d-flex align-items-center justify-content-center'>
                { isLogin == false ?
                    <Link to={'/login'}><button className='btn btn-trasparent text-light p-2 '>Get started<FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link> :
                    <Link to={'/dashboard'}><button className='btn btn-trasparent text-light p-2'>Manage Project<FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link>}
                </div>
            </div>
            <div className="col-md-6 mt-5 d-flex align-items-center justify-content-center">
                <img src={photo} alt=""className='w-75' />
            </div>
        </div>
    </div>
</div>

<div>
    <h1 className='text-center my-5'>Explore Our Projects</h1>
    <div className="container">
        <div className="row">
           {homeProject?.map((item)=>(
                <div className="col-md-4">
                <ProjectCard project = {item}/>
            </div>  ))}

            {/* <div className="col-md-4">
            <ProjectCard/>
            </div>
            <div className="col-md-4">
            <ProjectCard/>
            </div> */}
        </div>
    </div>
    <Link to={'/project'}><p className='text-center my-4'>See more projects</p></Link>
</div>
</>
  )
}

export default Home
