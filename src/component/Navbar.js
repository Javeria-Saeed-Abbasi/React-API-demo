import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/Navitem';
import { Switch, Route, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import AppContext from '../Provider/AppContext';

const Navbar1 = () => {

  // const [token, setToken] = useState(localStorage.getItem("token"));
  const context = useContext(AppContext);
  const navigate = useNavigate();
// For Logut 
const profileLogout = () =>{
  const logOutItem = localStorage.removeItem('token');
  console.log(logOutItem);
  context.setToken(null);
   // 👇️ navigate to /login
   navigate('/');
}


  return (
    <div>
       <Navbar bg="dark" variant="dark">
        <Container>

        <NavItem>
          <Navbar.Brand as={Link} to="/">Fitness</Navbar.Brand>
          </NavItem> 

          <Nav className="me-auto">


          <NavItem to="">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </NavItem>

          <NavItem to="">
            <Nav.Link as={Link} to="/trainers">Trainers</Nav.Link>
          </NavItem>

          <NavItem to="">
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </NavItem>

          <NavItem to="">
            <Nav.Link as={Link} to="/specialities">Specialities</Nav.Link>
          </NavItem>

           <NavItem to="mr-auto">
              <Button variant="primary" className="logout-btn" onClick={profileLogout}>Logout</Button>
           </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar1;
