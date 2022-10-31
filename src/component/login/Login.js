import React, { useState, useContext, useEffect } from "react";
import { Container, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../images/loader2.gif";
import Home from "../pages/Home";
import AppContext from "../../Provider/AppContext";
import axiosconfig from "../../Provider/Axios";
import { FaEye, FaFacebook } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { GApiProvider } from "react-gapi-auth2";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const navigate = useNavigate();
  const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PWD_REGEX = /^[a-zA-Z0-9]*$/;
  const EMAIL_REGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const context = useContext(AppContext);
  //GOOGLE LOGIN Client_Id:
  const client_id =
    "459140099344-ikj8jh2ff3ud5a5gi72s1itqqcgl3qn4.apps.googleusercontent.com";
  //FACEBOOK LOGIN App ID:
  const app_id = "1088597931155576";
  // Loader State:
  const [isLoading, setIsLoading] = useState(false);
  // Token State:
  const [token, setToken] = useState("");
  // GOOGLE USERData
  const [g_UserData, setG_UserData] = useState();
  // Google username
  const [g_name, setG_name] = useState();

 
  //Login Use States:
  //name
  const [name, setname] = useState("");
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

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  // const accessToken  = gapi.auth.getToken().access_token;
  // console.log(accessToken);
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
    } else if (!EMAIL_REGX.test(item)) {
      setEmail1Err(
        "Please include '@' in the email address. \n Example: user@gmail.com"
      );
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
    if (!item) {
      setPassword1Err("*Required");
      setIsDisabled(true);
    } else if (!PWD_REGEX.test(item)) {
      setPassword1Err("*Password should contain only Alphanumeric characters.");
      setIsDisabled(true);
    } else if (item.length >= 9) {
      setPassword1Err("*Password should have max 8 digits.");
      setIsDisabled(true);
    } else {
      setPassword1Err(false);
      setIsDisabled(false);
    }
    setpassword1(item);
  }
  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };
  function LoginButton() {
    if (email1 && password1 && !email1Err && !password1Err) {
      return (
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
      );
    } else {
      return (
        <Button variant="dark" className="text-start" type="submit" disabled>
          Signin
        </Button>
      );
    }
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
        // context.setToken({token: res.data.token, type: "simpleUser"} );
        // localStorage.setItem("token",{token: res.data.token, type: 'simpleUser'});
        localStorage.setItem("token", res.data.token);
        context.setToken(res.data.token);
        localStorage.setItem("type" , 'simpleUser');
        context.setType('simpleUser');

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
  
  //GOOGLE LOGIN
  const onSuccess = (response) => {
    console.log("LOGIN SUCCESS! Current User: ", response.profileObj);
    context.setG_UserData(
      {...response.profileObj,
      type: "google"}
    );
    // context.setG_UserData({ user: response.profileObj, type: "google" });
    // localStorage.setItem("user", JSON.stringify({user:response.profileObj, type: 'google'}));
    // 👇️ navigate to /login
    navigate("/");
    console.log(response.profileObj.name);
    localStorage.setItem("token", response.profileObj.googleId);
    context.setToken(response.profileObj.googleId);
    localStorage.setItem("type",'google');
    context.setType('google');
    localStorage.setItem("username",response.profileObj.name);
    context.setG_name(response.profileObj.name);
  };
  const onFailure = (response) => {
    console.log("LOGIN FAILED! Res: ", response);
  };
  const onLogoutSuccess = () => {
    console.log("LOGOUT SUCCESSFUL!");
  };
  const onLogoutFailure = () => {
    console.log("LOGOUT FAILURE!");
  };
  const googleHandleClick = () => {};
  //FACEBOOK LOGIN
  const responseFacebook = (response) => {
    console.log(response);
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
                    autoComplete="current-email"
                    // onChange={(e) => {
                    //   setemail1(e.target.value); //trainer@gmail.com
                    // }}
                    onChange={emailHandler}
                  />

                  <div>
                    {email1Err ? (
                      <span className="text-danger">{email1Err}</span>
                    ) : (
                      ""
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup className="">
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="current-password"
                      // onChange={(e) => {
                      //   console.log(e.target.value);
                      //   setpassword1(e.target.value); //admin123
                      // }}
                      onChange={passwordHandler}
                      aria-describedby="basic-addon2"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={handleShowPassword}
                      id="button-addon2"
                    >
                      {passwordShown ? <FaEye /> : <FaEyeSlash />}
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
                      ""
                    )}
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <LoginButton />
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
                <div className="d-flex justify-content-center row mx-5 mt-3">
                  {/* 
                <FacebookLogin
                appId={app_id}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon={<FaFacebook/>}
                /> */}

                  <GoogleLogin
                    clientId={client_id}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                    onClick={googleHandleClick}
                  />

                  {/* <GoogleLogout
                 clientId={client_id}
                 buttonText='Logout'
                 onLogoutSuccess={onLogoutSuccess}
                 onLogoutFailure={onLogoutFailure}
                /> */}

                  {/* <TwitterLogin/> */}
                </div>
              </Form>
            </>
          ) : (
            <>
              <Home
                token={token}
                setToken={setToken}
                googleUsername={g_UserData}
                setGoogleUsername={setG_UserData}
                name={g_name}
                setGooglename={setG_name}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Login;
