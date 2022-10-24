import "./App.css";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import Profile from "./component/profile";
// import { useNavigate, Routes, Route, Router } from "react-router-dom";
import Trainers from "./component/pages/Trainers";
import Specialities from "./component/pages/Specialities";
import { Container } from "react-bootstrap";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/pages/Home";
import Profile from "./component/pages/Profile";
import { useEffect, useState } from "react";
import Navbar1 from "./component/Navbar";
import AppContext from "./Provider/AppContext";

function App() {
  const [token, setToken] = useState();
  const tokenSetting = {
    token,
    setToken,
  };

  useEffect(() => {
    const value = localStorage.getItem("token");
    setToken(value);
  }, []);

  return (
    <AppContext.Provider value={tokenSetting}>
      <Container>
        {token ? (
          <>
            <Navbar1 />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile:id" element={<Profile />} />
              <Route exact path="/trainers" element={<Trainers />} />
              <Route exact path="/specialities" element={<Specialities />} />
              {/* <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} /> */}
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </>
        )}
      </Container>
    </AppContext.Provider>
  );
}

export default App;
