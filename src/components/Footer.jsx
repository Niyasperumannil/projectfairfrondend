import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Footer() {
  return (
    <>
     <div className="container-fluid">
        <div className='row p-2 bg-success mt-5'>
          <div className="col-md-3  ">

            <div className='fs-4 text-warning'>
            <FontAwesomeIcon icon={faStackOverflow} />
              {' '}
              Project Fair
            </div>

            <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptate nostrum consequuntur iste atque praesentium eius nulla. Officiis, architecto quis iusto dicta doloribus placeat repellat laborum, rem dolor, blanditiis ducimus.</p>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h4>Links</h4>

             <p> Home <br /></p>
             <p> Project <br /></p>
             <p>DashBoard</p>

          </div>
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h4>Guides</h4>
            <p>React</p>
            <p>React Bootstrap</p>
            <p>Bootswatch</p>
          </div>
          <div className="col-md-3">
            <h4>Contact Us</h4>
            <div className='d-flex'>
              <input type="text" className='form-control w-75 me-4' placeholder='Email Id' />
              <button className='btn btn-warning'>Subscribe</button>
            </div>
            <div className='d-flex p-3'>
              <FontAwesomeIcon icon={faInstagram} className='fa-2x me-5' />
              <FontAwesomeIcon icon={faTwitter} className='fa-2x me-5' />
              <FontAwesomeIcon icon={faFacebook} className='fa-2x me-5' />
              <FontAwesomeIcon icon={faLinkedin} className='fa-2x me-5' />
              <FontAwesomeIcon icon={faWhatsapp} className='fa-2x me-5' />

            </div>

          </div>




        </div>
      </div>
    </>
  )
}

export default Footer
