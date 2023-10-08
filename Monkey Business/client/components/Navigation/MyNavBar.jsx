// Make the navigation bar for the web
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function MyNavBar () {
  return (
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand >Monkey Business</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" >
        <LinkContainer to = "/" >
          <Nav.Link> Home </Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/monkeyTech" >
          <Nav.Link> Monkey Technology </Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/about" >
          <Nav.Link> About Us </Nav.Link>
        </LinkContainer>
        </Nav>
        <Nav className="justify-content-end" style={{ width: '70%' }}>
        <LinkContainer to = "/login" >
          <Nav.Link> Log In </Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/signup" >
          <Nav.Link> Sign Up </Nav.Link>
        </LinkContainer>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  )
}
