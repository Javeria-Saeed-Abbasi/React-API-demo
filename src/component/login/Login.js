import React, { useState, useContext, } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../images/loader2.gif";
import Home from "../pages/Home";
import AppContext from "../../Provider/AppContext";
import axiosconfig from "../../Provider/Axios";

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
    if ((!EMAIL_REGX.test(item))) {
      setEmail1Err(true);
      setIsDisabled(true);
    } else if (email1.length === "0") {
      setEmail1Err("Required");
      setIsDisabled(true);
    } else {
      setEmail1Err(false);
      setIsDisabled(false);
    }
    setemail1(item);
  }
  function passwordHandler(e) {
    let item = e.target.value;
    console.log(item);
    if ((!PWD_REGEX.test(item))) {
      setPassword1Err(true);
      setIsDisabled(true);
    } else if (password1.length === "0") {
      setPassword1Err("Required");
      setIsDisabled(true);
    } else {
      setPassword1Err(false);
      setIsDisabled(false);
    }
    setpassword1(item);
  }
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
                        Invalid Email
                        <br />
                        *Example: user@gmail.com
                        <br />
                      </span>
                    ) : (
                      "")}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    // onChange={(e) => {
                    //   console.log(e.target.value);
                    //   setpassword1(e.target.value); //admin123
                    // }}
                    onChange={passwordHandler}
                  />
                  <div>
                    {password1Err ? (
                      <span className="text-danger">
                        *Invalid Password
                        <br />
                        *Password should contain only Alphanumeric characters.
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
                  <Button
                    variant="dark"
                    className="text-start"
                    type="submit"
                    disabled={isDisabled}
                    onClick={() => {
                      postLoginData();
                    }}
                  >
                    Signin
                  </Button>
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
