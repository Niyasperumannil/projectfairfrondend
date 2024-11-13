import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { serverUrl } from '../services/serverUrl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi, userProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/ContentShare';

function Edit({ projects }) {
  const {setEditResponse} = useContext(editResponseContext)
   const [show, setShow] = useState(false);
  const [key, setkey] = useState(1)
  const [preview, setPreview] = useState('')

  const [ProjectDetails, setProjectdetails] = useState({
    Title: projects.Title,
    Language: projects.Language,
    Github: projects.Github,
    Website: projects.Website,
    Overview: projects.Overview,
    ProjectImage: ""
  })


  const handleClose = () => {
    setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);




  const handlefile = (e) => {
    setProjectdetails({ ...ProjectDetails, ProjectImage: e.target.files[0] })
  }


  const handleCancel = () => {
    setProjectdetails({
      Title: projects.Title,
      Language: projects.Language,
      Github: projects.Github,
      Website: projects.Website,
      Overview: projects.Overview,
      ProjectImage: ""
    })

    setPreview("")
    if (key == 1) {
      setkey(0)
    }
    else {
      setkey(1)
    }
  }
  useEffect(() => {
    if (ProjectDetails.ProjectImage) {
      setPreview(URL.createObjectURL(ProjectDetails.ProjectImage))
    }
  }, [ProjectDetails.ProjectImage])
  console.log(preview);
  

  const handleupdate = async() =>{
    const {Title,Language,Github,Website,Overview,ProjectImage} = ProjectDetails

    if(!Title || !Language || !Github || !Website || !Overview){
      toast.info('please fill completly')
    }
    else{
      //reqbody
      const reqBody = new FormData()
      reqBody.append("Title",Title)
      reqBody.append("Language",Language)
      reqBody.append("Github",Github)
      reqBody.append("Website",Website)
      reqBody.append("Overview",Overview)
      preview?reqBody.append("ProjectImage",ProjectImage): reqBody.append("ProjectImage",projects.ProjectImage)

      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader={
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProjectApi(projects._id , reqBody , reqHeader)
        console.log(result);
        if(result.status==200){
          setEditResponse(result)
          handleClose()
          toast.success('update succces')
          
        }else{
          handleCancel()
          toast.error('something went wrong')
        }
        
      }else{
        const reqHeader={
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
      const result = await updateUserProjectApi(projects._id, reqBody ,reqHeader)
      console.log(result);
      if(result.status==200){
        setEditResponse(result)
        handleClose()
        toast.success('update succces')
      }else{
        handleCancel()
        toast.error('something went wrong')
      }
      
      }
    }
  }

  return (
    <div>
      <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} style={{ color: "#a602f2", }} className='mx-4 fs-4' />
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectImage">
                  <input id='projectImage' type="file" style={{ display: 'none' }} key={key} onChange={(e) => handlefile(e)} />
                  <img src={preview ? preview : `${serverUrl}/upload/${projects.ProjectImage}`} alt="no image" className='w-100 mt-5' />
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input type="text" placeholder='Title' className='form-control' value={ProjectDetails.Title} onChange={(e) => setProjectdetails({ ...ProjectDetails, Title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Language' className='form-control' value={ProjectDetails.Language} onChange={(e) => setProjectdetails({ ...ProjectDetails, Language: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Github' className='form-control' value={ProjectDetails.Github} onChange={(e) => setProjectdetails({ ...ProjectDetails, Github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Website' className='form-control' value={ProjectDetails.Website} onChange={(e) => setProjectdetails({ ...ProjectDetails, Website: e.target.value })} />
                </div>
                <div className="mb-3">
                  <textarea rows={5} className='form-control' placeholder='Overview' value={ProjectDetails.Overview} onChange={(e) => setProjectdetails({ ...ProjectDetails, Overview: e.target.value })}></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancel} >
            Cancel
          </Button>
          <Button variant="success" onClick={handleupdate}>
         Update
          </Button>
        </Modal.Footer>
        <ToastContainer theme="colored" position="top-center" autoClose={2000}/>
      </Modal>
    </div>
  )
}

export default Edit
