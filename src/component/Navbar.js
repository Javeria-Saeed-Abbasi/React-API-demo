import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/Navitem';
import { Switch, Route, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import AppContext from '../Provider/AppContext';
import {gapi} from 'gapi-script';
import { useGoogleLogout } from 'react-google-login';

const Navbar1 = () => {

  //GOOGLE LOGIN Client_Id:
  const client_id = "459140099344-ikj8jh2ff3ud5a5gi72s1itqqcgl3qn4.apps.googleusercontent.com";
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
const onLogoutSuccess = () => {

      console.log("LOGOUT SUCCESSFUL!");
};
const onLogoutFailure= () => {
  console.log("LOGOUT FAILURE!");

};
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
              <Button variant="primary" className="g-logout-btn" onClick={profileLogout}
               clientId={client_id}
               buttonText='Logout'
               onLogoutSuccess={onLogoutSuccess}
               onLogoutFailure={onLogoutFailure}
              >Logout</Button>
           </NavItem>

          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar1;
