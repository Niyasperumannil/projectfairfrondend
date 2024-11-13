import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import Edit from './Edit'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/ContentShare'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-bootstrap'


function MyProject() {
    const [userprojects, setuserproject] = useState([])
    const { addResponse } = useContext(addResponseContext)
   const {editResponse} = useContext(editResponseContext)
    const [deleteStatus, setdeletestatus] = useState({})
    
    const getuserproject = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await userProjectApi(reqHeader)
            setuserproject(result.data);

        }
    }
   



    const handleDelete = async (id) => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await removeUserProjectApi(id, reqHeader)
            if (result.status == 200) {
                toast.success("project removed succes")
                setdeletestatus(result)
            }else{
                toast.error("something went wrong")
            }

        }

    }
    useEffect(() => {
        getuserproject()
    }, [addResponse,deleteStatus,editResponse])
    return (
        <>
            <div className='p-4 shadow-lg w-100'>
                <div className="d-flex justify-content-between">
                    <h3 className='text-success mt-2'>My Projects</h3>
                    <AddProject />
                </div>

                {userprojects.length > 0 ?
                    userprojects.map(item => (
                        <div className="p-3 bg-light mt-4 rounded-2 d-flex justify-content-between ">
                            <h4>{item?.Title}</h4>
                            <div className="d-flex">
                                <Edit projects={item}/>
                                <Link to={item?.Website} target='-blank'> <FontAwesomeIcon icon={faGlobe} className='text-primary mx-3 fs-4' /></Link>
                                <Link to={item.Github}> <FontAwesomeIcon icon={faGithub} className='text-success mx-3 fs-4' /></Link>
                                <FontAwesomeIcon icon={faTrash} className='text-danger mx-3 fs-4' onClick={() => handleDelete(item._id)} />
                            </div>

                        </div>)) :
                    <h5>No project added</h5>
                }
                

                <ToastContainer theme="colored" position="top-center" autoClose={2000}/>
            </div>
        </>
    )
}

export default MyProject
