import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';

export const baseURL = "https://buybestthemes.com/findmyfitness_api/api";

const Register = () => {

  const navigate = useNavigate();

 const navigateToLogin = () => {
    // 👇️ navigate to /login
    navigate('/');
  };
// Register Use States:
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [roles, setroles] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");


   // REGISTER POST API
  const registerPostData = () =>{
    axios.post(baseURL+'/register',{
     name: name,
     email: email,
     roles:roles,
     phone:phone,
     password: password,
     confirm_password: confirm_password,
    },{
      headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
              },
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <Container>
       <Form className='col-6 mx-auto bg-light py-5'>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name"      onChange={(e) => {
          console.log(e.target.value);
          setname(e.target.value);
        }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(e) => {
        console.log(e.target.value);
          setemail(e.target.value);
        }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Role"   onChange={(e) => {
          console.log(e.target.value);
          setroles(e.target.value);
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Enter Your Phone Number"   onChange={(e) => {
          console.log(e.target.value);
          setphone(e.target.value);
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Current Password" onChange={(e) => {
          console.log(e.target.value);
          setpassword(e.target.value);
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password"  onChange={(e) => {
          console.log(e.target.value);
          setconfirm_password(e.target.value);
        }} />
      </Form.Group>

      <div className="d-flex justify-content-center">
                
                <Button
                  variant="dark"
                  className="text-start"
                  type="submit"
                  onClick={navigateToLogin}
                >
                  Signin
                </Button>
                  &nbsp;
                  &nbsp;


                <Button
                    variant="primary"
                    className="justify-content-end"
                    type="submit"
                    onClick={() => {registerPostData()}}>
                    SignUp
                  </Button>
                </div>
      {/* <Button variant="primary" type="submit" onClick={() => {registerPostData()}}>
        Register
      </Button> */}
       </Form>
    </Container>
  )
}

export default Register
