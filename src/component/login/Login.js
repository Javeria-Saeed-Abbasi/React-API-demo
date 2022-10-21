import axios from "axios";
import React, { useState , useContext} from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../images/loader2.gif";
import Home from "../pages/Home";
import AppContext from "../../Provider/AppContext";
import axiosconfig from '../../Provider/Axios';
export const baseURL = "https://buybestthemes.com/findmyfitness_api/api";

const Login = () => {

  const context = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  // Token State:
  const [token, setToken] = useState('');
  //Login Use States:
  const [email1, setemail1] = useState("trainer@gmail.com");
  const [password1, setpassword1] = useState("admin123");

  const navigate = useNavigate();

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
        navigate('/');
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
              <Form className="col-6 mx-auto bg-light py-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setemail1("trainer@gmail.com");
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setpassword1("admin123");
                    }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  className="text-start"
                  type="submit"
                  onClick={() => {
                    postLoginData();
                  }}
                >
                  Signin
                </Button>
                  &nbsp;
                  &nbsp;
                <Button
                    variant="primary"
                    className="justify-content-end"
                    type="submit"
                    as={Link}
                    to={"register"}>
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
