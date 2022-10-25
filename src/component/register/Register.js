import React, { useContext, useEffect, useState } from "react";
import { Container, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Provider/AppContext";
import axiosconfig from "../../Provider/Axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const PHONE_REGX =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
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
  const [passwordShown, setPasswordShown] = useState(false);

  //Errors
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [rolesErr, setrolesErr] = useState(false);
  const [phoneErr, setphoneErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confPasswordErr, setConfPasswordErr] = useState(false);
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
    if (!item) {
      setNameErr("Required");
      setIsDisabled(true);
    } else if (!USERNAME_REGEX.test(item)) {
      setNameErr(
        "*Invalid UserName. Only accept letters or Alpha Numeric Characters with Underscore"
      );
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
    if (!item) {
      setEmailErr("Required");
      setIsDisabled(true);
    } else if (!EMAIL_REGX.test(item)) {
      setEmailErr(
        "Please include '@' in the email address. \n Example: user@gmail.com"
      );
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
    if (!item) {
      setrolesErr("Required");
      setIsDisabled(true);
    } else if (
      !item === "user" ||
      !item === "gym-owner" ||
      !item === "trainer" ||
      !item === "physiotherapist" ||
      !item === "nutritionist"
    ) {
      setrolesErr(true);
      setIsDisabled(true);
    } else {
      setrolesErr(false);
      setIsDisabled(false);
    }
    setroles(item);
  }
  function phoneNumbHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!item) {
      setphoneErr("Required");
      setIsDisabled(true);
    } else if (!PHONE_REGX.test(item)) {
      setphoneErr("Mobile Number is invalid");
      setIsDisabled(true);
    } else {
      setphoneErr(false);
      setIsDisabled(false);
    }
    setphone(item);
  }
  function passwordHandler(e) {
    let item = e.target.value;
    console.log(item);
    if (!item) {
      setPasswordErr("*Required");
      setIsDisabled(true);
    } else if (!PWD_REGEX.test(item)) {
      setPasswordErr(
        "*Password should contain only Alphanumeric characters.  \n  *Example: John_123"
      );
      setIsDisabled(true);
    } else if (item.length >= 9) {
      setPasswordErr("*Password should have max 8 digits.");
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
    if (!item) {
      setConfPasswordErr("*Required");
      setIsDisabled(true);
    } else if (!item === { password }) {
      setConfPasswordErr("Password Not Matched");
      setIsDisabled(true);
    } else if (!PWD_REGEX.test(item)) {
      setConfPasswordErr(
        "*Password should contain only Alphanumeric characters.  \n  *Example: John_123"
      );
      setIsDisabled(true);
    } else if (item.length >= 9) {
      setConfPasswordErr("*Password should have max 8 digits.");
      setIsDisabled(true);
    } else {
      setConfPasswordErr(false);
      setIsDisabled(false);
    }
    setconfirm_password(item);
  }
  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };
  function SignUpButton() {
    if (
      name &&
      email &&
      roles &&
      phone &&
      password &&
      confirm_password &&
      !nameErr &&
      !emailErr &&
      !roles &&
      !phoneErr &&
      !passwordErr &&
      !confPasswordErr
    ) {
      return (
      <Button
        variant="primary"
        className="justify-content-end"
        type="submit"
        onClick={() => {
          registerPostData();
        }}
      >
        SignUp
      </Button>);
    } else {
      return (
        <Button
          variant="primary"
          className="justify-content-end"
          type="submit"
          disabled={isDisabled}
        >
          SignUp
        </Button>
      );
    }
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
                {nameErr}
                {/* //   *Invalid User Name
              //   <br />
              //   *Only accept letters or Alpha Numeric Characters with Underscore
              //   <br />
              //   *Example: John_123
              //   <br /> */}
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
            {emailErr ? <span className="text-danger">{emailErr}</span> : ""}
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
            type="tel"
            placeholder="Enter Your Phone Number"
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setphone(e.target.value);
            // }}
            onChange={phoneNumbHandler}
          />
          <div>
            {phoneErr ? <span className="text-danger">{phoneErr}</span> : ""}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup className="">
            <Form.Control
              type={passwordShown ? "text" : "password"}
              placeholder="Current Password"
              autoComplete="current-password"
              //onChange={(e) => {
              // console.log(e.target.value);
              // setpassword(e.target.value);
              //}}
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
            {passwordErr ? (
              <span className="text-danger">
                {passwordErr}
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
          <InputGroup className="">
            <Form.Control
              type={passwordShown ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="new-password"
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setconfirm_password(e.target.value);
              // }}
              onChange={conf_passwordHandler}
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              onClick={handleShowPassword}
              id="button-addon3"
            >
              {passwordShown ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputGroup>
          <div>
            {confPasswordErr ? (
              <span className="text-danger">
                {confPasswordErr}
                {/* *Password Not Matched
                <br />
                *Password should contain only Alphanumeric characters. */}
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
          <SignUpButton />
        </div>
      </Form>
    </Container>
  );
};

export default Register;
