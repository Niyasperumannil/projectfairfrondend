import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  return (
    <>
    <div>
      <h3>Welcome <span className='text-primary'>User</span></h3>
    </div>

    <Container>
      <Row className='mt-5'>
        <Col sm={12} md={8}>
        <MyProject/>
        </Col>

        <Col sm={12} md={4}>
        <Profile/>
        </Col>
      </Row>
    </Container>
    


    </>
  )
}

export default Dashboard
