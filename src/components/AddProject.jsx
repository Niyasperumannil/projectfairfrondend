import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/ContentShare';

function AddProject() {
    const [show, setShow] = useState(false);
    const {setAddResponse} = useContext(addResponseContext)
    const [ProjectDetails, setProjectdetails] = useState({
      Title:"",
      Language:"",
      Github:"",
      Website:"",
      Overview:"",
      ProjectImage:""
    })
    const [preview, setPreview] = useState("")
    const [token, setToken] =useState("")
    const [key, setkey] = useState(1)
    // console.log(preview);
    // console.log(token);
    
    
    // console.log(ProjectDetails);

    
    const handleCancel = ()=>{
      setProjectdetails({
        Title:"",
        Language:"",
        Github:"",
        Website:"",
        Overview:"",
        ProjectImage:""
      })
      setPreview('')
      if(key==1){
        setkey(0)
      }else{
        setkey(1)
      }
    }
    const handleAdd = async()=>{
      const {Title,Language,Github,Website,Overview,ProjectImage} =ProjectDetails
      if(!Title || !Language || !Github || !Website || !Overview || !ProjectImage){
           toast.info("please fill the  form properly")
      }else {
        //append()
        const reqBody = new FormData()

        reqBody.append("Title",Title)
        reqBody.append("Language",Language)
        reqBody.append("Github",Github)
        reqBody.append("Website",Website)
        reqBody.append("Overview",Overview)
        reqBody.append("ProjectImage",ProjectImage)


        if(token){
          const reqHeader = {
           " Content-Type":"multipart/form-data",
           "Authorization":`Bearer ${token}`
          }
          const result = await addProjectApi(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('project added succesfuly')
     
            setTimeout(()=>{
              handleClose()
            },2000)
            setAddResponse(result)
          
          }
          else if(result.status==406){
            toast.warning(result.response.data)
            handleCancel()
          }else{
            toast.error('something went wrong')
            handleClose()
          }
          
        }
        else{
          toast.warning('please login')
        }
      }
    }

    const handleFile = (e)=>{
      // console.log(e.target.files[0]);
      
      setProjectdetails({...ProjectDetails,ProjectImage:e.target.files[0]})
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
         if(ProjectDetails.ProjectImage){
          setPreview(URL.createObjectURL(ProjectDetails.ProjectImage))
         }

    },[ProjectDetails.ProjectImage])

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem('token'))
      }
    },[])
  return (
    <>
    <button onClick={handleShow} className='btn btn-success rounded-0 mt-2'>Add Project</button>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="projectImage">
                            <input id='projectImage' type="file" style={{display:'none'}} key={key} onChange={(e)=>handleFile(e)} />
                            <img src={preview?preview:''} alt="no image" className='w-100 mt-5' />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <input type="text" placeholder='Title'  className='form-control' onChange ={(e)=>setProjectdetails({...ProjectDetails, Title:e.target.value})} value={ProjectDetails.Title} />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder='Language' className='form-control'  onChange ={(e)=>setProjectdetails({...ProjectDetails, Language:e.target.value})} value={ProjectDetails.Language} />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder='Github' className='form-control'  onChange ={(e)=>setProjectdetails({...ProjectDetails, Github:e.target.value})} value={ProjectDetails.Github}/>
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder='Website' className='form-control' onChange ={(e)=>setProjectdetails({...ProjectDetails, Website:e.target.value})} value={ProjectDetails.Website} />
                        </div>
                        <div className="mb-3">
                            <textarea rows={5} className='form-control' placeholder='Overview' onChange ={(e)=>setProjectdetails({...ProjectDetails, Overview:e.target.value})} value={ProjectDetails.Overview}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            ADD
          </Button>
        </Modal.Footer>
        <ToastContainer theme="colored" position="top-center" autoClose={2000}/>
      </Modal>

     
    </>
  )
}

export default AddProject
