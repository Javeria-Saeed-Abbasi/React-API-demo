import React, { useState, useContext, } from "react";
import { Container, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../images/loader2.gif";
import Home from "../pages/Home";
import AppContext from "../../Provider/AppContext";
import axiosconfig from "../../Provider/Axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PWD_REGEX = /^[a-zA-Z0-9]*$/;
  const EMAIL_REGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const context = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  // Token State:
  const [token, setToken] = useState("");
  //Login Use States:
  //email
  const [email1, setemail1] = useState("");
  //password
  const [password1, setpassword1] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  //Errors
  const [email1Err, setEmail1Err] = useState(false);
  const [password1Err, setPassword1Err] = useState(false);
  //Disabled Submit Button
  const [isDisabled, setIsDisabled] = useState(true);

  function loginHandle(e) {
    if (email1.length === "" || password1.length === "") {
      alert("Required");
    } else {
      alert("all good :)");
    }
    e.preventDefault();
  }
  function emailHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!item) {
      setEmail1Err("Required");
      setIsDisabled(true);
    } 
     else if((!EMAIL_REGX.test(item))) {
      setEmail1Err("Please include '@' in the email address. \n Example: user@gmail.com");
      setIsDisabled(true);
    }
    else {
      setEmail1Err(false);
      setIsDisabled(false);
    }
    setemail1(item);
  }
  function passwordHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!item) {
      setPassword1Err("*Required");
      setIsDisabled(true);
    } 
     else if ((!PWD_REGEX.test(item))) {
      setPassword1Err("*Password should contain only Alphanumeric characters.");
      setIsDisabled(true);
    }
    else if (item.length >= 9) {
      setPassword1Err("*Password should have max 8 digits." );
      setIsDisabled(true);
    }
    else {
      setPassword1Err(false);
      setIsDisabled(false);
    }
    setpassword1(item);
  }
  const handleShowPassword=()=>{
    setPasswordShown(!passwordShown)
  }
  function LoginButton(){
    if (email1 && password1 && !email1Err && !password1Err){
      return   <Button
      variant="dark"
      className="text-start"
      type="submit"
      onClick={() => {
        postLoginData();
      }}
    >
      Signin
    </Button>
    } else {
      return <Button
      variant="dark"
      className="text-start"
      type="submit"
      disabled
    >
      Signin
    </Button>
    };
  };
  // LOGIN POST API
  const postLoginData = (data) => {
    setIsLoading(true);
    console.log(email1, password1);

    axiosconfig
      .post(
        "login",
        {
          email: email1,
          password: password1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.token, "RESPONSE");
        localStorage.setItem("token", res.data.token, "RESPONSE");
        context.setToken(res.data.token);
        // 👇️ navigate to /login
        navigate("/");
        // findMyFitness();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "ERROR");
        setIsLoading(false);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <>
          <div className="loader d-flex justify-content-center">
            <img src={Loader} alt="loader" />
          </div>
        </>
      ) : (
        <>
          {!token ? (
            <>
              <Form
                className="col-6 mx-auto bg-light py-5"
                onSubmit={loginHandle}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    // onChange={(e) => {
                    //   setemail1(e.target.value); //trainer@gmail.com
                    // }}
                    onChange={emailHandler}
                  />

                  <div>
                    {email1Err ? (
                      <span className="text-danger">
                        {email1Err}
                      </span>
                    ) : (
                      "")}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                    <InputGroup className="">
                      <Form.Control
                         type={(passwordShown) ? "text" : "password"}
                         placeholder="Password"
                         // onChange={(e) => {
                         //   console.log(e.target.value);
                         //   setpassword1(e.target.value); //admin123
                         // }}
                         onChange={passwordHandler}
                        aria-describedby="basic-addon2"
                      />
            <Button variant="outline-secondary" onClick={handleShowPassword} id="button-addon2">
           {passwordShown? (<FaEye/>): (<FaEyeSlash/>) } 
            </Button>
                    </InputGroup>
                    <div>
                    {password1Err ? (
                      <span className="text-danger">
                        {password1Err}
                        {/* *Password should contain in one Capital letter.
                        <br />
                        *Password should contain in one number.
                        <br />
                        *Password should contain in symbol character.
                        <br />
                        *Password minimum length should be 8 characters.
                        <br />
                        *Password maximum length should be 24 characters.
                        <br />
                        *Example: User@123
                        <br /> */}
                      </span>
                    ) : (
                      "" )}
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-center">
                <LoginButton/>
                
                  &nbsp; &nbsp;
                  <Button
                    variant="primary"
                    className="justify-content-end"
                    type="submit"
                    as={Link}
                    to={"register"}
                  >
                    SignUp
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <>
              <Home token={token} setToken={setToken} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Login;
