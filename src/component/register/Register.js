import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Provider/AppContext";
import axiosconfig from "../../Provider/Axios";
export const baseURL = "https://buybestthemes.com/findmyfitness_api/api";

const Register = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    // 👇️ navigate to /login
    navigate("/");
  };

  const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PWD_REGEX = /^[a-zA-Z0-9]*$/;
  const EMAIL_REGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  //For Data Setting
  const [data, setData] = useState("");
  const context = useContext(AppContext);

  // Register Use States:
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [roles, setroles] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  //Errors
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [rolesErr, setrolesErr] = useState(false);
  const [phoneErr, setphoneErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confPasswordErr, setConfPasswordErr] =useState(false)
  //Disabled Submit Button
  const [isDisabled, setIsDisabled] = useState(true);

  function registerHandle(e) {
    if (email.length === "" || password.length === "") {
      alert("Required");
    } else {
      alert("all good :)");
    }
    e.preventDefault();
  }
  function nameHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!USERNAME_REGEX.test(item)) {
      setNameErr(true);
      setIsDisabled(true);
    } else if (name.length === "0") {
      setNameErr("Required");
      setIsDisabled(true);
    } else {
      setNameErr(false);
      setIsDisabled(false);
    }
    setname(item);
  }
  function emailHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!EMAIL_REGX.test(item)) {
      setEmailErr(true);
      setIsDisabled(true);
    } else if (email.length === "0") {
      setEmailErr("Required");
      setIsDisabled(true);
    } else {
      setEmailErr(false);
      setIsDisabled(false);
    }
    setemail(item);
  }
  function rolesHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!item === "user" || !item === "gym-owner"  
    || !item === "trainer" || !item === "physiotherapist" 
     || !item === "nutritionist" ) {
      setEmailErr(true);
      setIsDisabled(true);
    } else if (roles.length === "0") {
      setEmailErr("Required");
      setIsDisabled(true);
    } else {
      setEmailErr(false);
      setIsDisabled(false);
    }
    setemail(item);
  }
  function passwordHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!PWD_REGEX.test(item)) {
      setPasswordErr(true);
      setIsDisabled(true);
    } else if (password.length === "0") {
      setPasswordErr("Required");
      setIsDisabled(true);
    } else {
      setPasswordErr(false);
      setIsDisabled(false);
    }
    setpassword(item);
  }
  function conf_passwordHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!PWD_REGEX.test(item) || !item === password ) {
      setConfPasswordErr(true);
      setIsDisabled(true);
    } else if (password.length === "0") {
      setConfPasswordErr("Required");
      setIsDisabled(true);
    } else {
      setConfPasswordErr(false);
      setIsDisabled(false);
    }
    setpassword(item);
  }
  // REGISTER POST API
  const registerPostData = () => {
    axiosconfig
      .post(
        "register",
        {
          name: name,
          email: email,
          roles: roles,
          phone: phone,
          password: password,
          confirm_password: confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getRolesData();
  // }, []);
  // //GET ROLES FROM API:
  // const getRolesData = async () => {
  //   await axiosconfig
  //   .get("roles" , {
  //     headers: {
  //       Authorization: `Bearer ${context.token}`,
  //     },
  //   })
  //   .then((response) => {
  //     // handle success
  //     const data1 = response.data;
  //     console.log(data1.data, "Roles Data");
  //     setData(data1?.data);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   });
  // };
  return (
    <Container>
      <Form className="col-6 mx-auto bg-light py-5" onSubmit={registerHandle}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            autoComplete="username"
            //onChange={(e) => {
            // console.log(e.target.value);
            // setname(e.target.value);}}
            onChange={nameHandler}
          />
          <div>
            {nameErr ? (
              <span className="text-danger">
                *Invalid User Name
                <br />
                *Only accept letters or Alpha Numeric Characters with Underscore
                <br />
                *Example: John_123
                <br />
              </span>
            ) : (
              ""
            )}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="useremail"
            //onChange={(e) => {
            // console.log(e.target.value);
            //   setemail(e.target.value);
            // }}
            onChange={emailHandler}
          />
          <div>
            {emailErr ? (
              <span className="text-danger">
                Invalid Email
                <br />
                *Example: user@gmail.com
                <br />
              </span>
            ) : (
              ""
            )}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSelect">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
         
          // onChange={e => {
          //   console.log("e.target.value", e.target.value);
          //   setType(e.target.value);
          //}}
          onChange={rolesHandler}
        >
          <option value="user">User</option>
          <option value="gym-owner">Gym Owner</option>
          <option value="trainer">Trainer</option>
          <option value="physiotherapist">Physiotherapist</option>
          <option value="nutritionist">Nutritionist</option>
        </Form.Control>
        {/* <div>
            {rolesErr ? (
              <span className="text-danger">
                *Invalid Role
                <br />
                *Role Should be 
                <br />
              </span>
            ) : (
              ""
            )}
          </div> */}
      </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Role"
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setroles(e.target.value);
            // }}
            onChange={rolesHandler}
          />
            <div>
            {rolesErr ? (
              <span className="text-danger">
                *Invalid Role
                <br />
                *Role Should be 
                <br />
              </span>
            ) : (
              ""
            )}
          </div>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Your Phone Number"
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setphone(e.target.value);
            // }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Current Password"
            autoComplete="current-password"
            //onChange={(e) => {
            // console.log(e.target.value);
            // setpassword(e.target.value);
            //}}
            onChange={passwordHandler}
          />
          <div>
            {passwordErr ? (
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
              ""
            )}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setconfirm_password(e.target.value);
            // }}
            onChange={conf_passwordHandler}
          />
          <div>
            {confPasswordErr ? (
              <span className="text-danger">
                *Password Not Matched
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
              ""
            )}
          </div>
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
          &nbsp; &nbsp;
          <Button
            variant="primary"
            className="justify-content-end"
            type="submit"
            disabled={isDisabled}
            onClick={() => {
              registerPostData();
            }}
          >
            SignUp
          </Button>
        </div>
        {/* <Button variant="primary" type="submit" onClick={() => {registerPostData()}}>
        Register
      </Button> */}
      </Form>
    </Container>
  );
};

export default Register;
