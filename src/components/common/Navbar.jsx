import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

const CustomNavbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <FaCar className="me-2" /> CarRental
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarNav" />
        
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className={`mx-2 ${isActive('/')}`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={`mx-2 ${isActive('/about')}`}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className={`mx-2 ${isActive('/services')}`}>
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/cars" className={`mx-2 ${isActive('/cars')}`}>
              Our Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs" className={`mx-2 ${isActive('/blogs')}`}>
              Blogs
            </Nav.Link>
            {/* <Button 
              as={Link} 
              to="/#contact" 
              variant="primary" 
              className="ms-3 px-4"
            >
              Contact
            </Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;