import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import {  Button, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';
import photo1 from '../assets/New folder/blackcar.png.avif'
//import projectPhoto from '../assets/blackcar.png'


function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
       <Card style={{ width: '100%' }} className='mt-4 shadow border-0 rounded-0'>
      <Card.Img variant="top" src={`${serverUrl}/upload/${project.ProjectImage}`} className='w-100' style={{height:'250px'}} />
      <Card.Body>
        <Card.Title className='text-center'>{project.Title}</Card.Title>
       
        
      </Card.Body>
    </Card>
    <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <img src={`${serverUrl}/upload/${project.ProjectImage}`} alt="no image" className='w-100' />
                    </div>
                    <div className='col-md-6'>
                        <h4>Description</h4>
                        <p>{project?.Language}</p>
                        <h4>Technologies</h4>
                        <p>{project?.Overview}</p>

                    </div>

                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="d-flex">
           <Link to={project?.Github}> <FontAwesomeIcon icon={faGithub} className='fa-2x me-3'/></Link>
            <Link to={project?.Website}><FontAwesomeIcon icon={faLink}  className='fa-2x me-3'/></Link>
            </div>
         
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard
