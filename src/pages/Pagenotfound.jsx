import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8 d-flex align-items-center justify-content-center flex-column'>
                <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="no image" className='w-50' />
                <h1>Look Like Your Lost</h1>
                <h5>The Page Is Looking Unavailable</h5>
               <Link to={'/'}> <button className='btn btn-success mt-3 rounded-0'>Go Home</button></Link>
            </div>
            <div className='col-md-2'></div>
            <div className='col-md-2'></div>
        </div>
      
    </div>
  )
}

export default Pagenotfound
