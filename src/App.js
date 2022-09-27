import React, { useEffect, useState, createContext, useMemo } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import MobileHome from "./pages/MobileHome";
import Login from "./components/Login";
import Svganimation from "./components/Svganimation";
import Wavesanimation from "./components/Wavesanimation";
import Register from "./components/Register";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Projectadd from "./components/Projectadd";
import MobileProjects from "./pages/MobileProjects";
import useLocalStorage from "./components/useLocalStorage";
import MobileProfile from "./components/MobileProfile";
import EditUser from "./components/EditUser";
export const UserContext = React.createContext({ user: {} });
export const ThemeContext = React.createContext(null);
export const ProjectsContext = React.createContext([{}]);
export const AllUserContext = React.createContext([{}]);

function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [LargeScreen, setLargeScreen] = useState(true);
  const [User, setUser] = useState({});
  const [Local, setLocal] = useLocalStorage("User");
  const value = useMemo(
    () => ({
      User,
      setUser,
      LoggedIn,
      setLoggedIn,
    }),
    [User, LoggedIn]
  );
  const navigate = useNavigate();

  const verifytoken = async () => {
    await axios
      .get("http://localhost:3000/users/verifytoken", {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        const users = res.data;
        setUser(users);
        setLoggedIn(true);
        setLocal(users);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 1024) setLargeScreen(false);
    if (localStorage.token != null) {
      console.log("token found");
      // const result = async () => {
      //   const data = await verifytoken();
      //   console.log(data);
      // };
      let result = verifytoken();
      console.log(result);
    } else {
      console.log("no token found.");
    }
  }, []);

  return (
    <UserContext.Provider
      value={value}
      // user={{ User, setUser }}
    >
      <div className="bg-[#001220] h-screen w-screen m-0 p-0 overflow-hidden overflow-x-hidden">
        {/*//040404*/}
        <Svganimation />
        {/* {!LargeScreen ? <Nav /> : ""} */}
        {LoggedIn ? <Nav /> : ""}
        {/* <Projectadd /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                LoggedIn ? (
                  LargeScreen ? (
                    <Home />
                  ) : (
                    <MobileHome />
                  )
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/addproj" element={<Projectadd />} />
            <Route
              path="/projects"
              element={
                LoggedIn ? (
                  LargeScreen ? (
                    <Navigate to="/home" />
                  ) : (
                    <MobileProjects />
                  )
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/friends"
              element={
                LoggedIn ? (
                  LargeScreen ? (
                    <Navigate to="/home" />
                  ) : (
                    <Friends />
                  )
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                LoggedIn ? (
                  LargeScreen ? (
                    <Navigate to="/home" />
                  ) : (
                    <MobileProfile />
                  )
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/edituser"
              element={
                LoggedIn ? (
                  LargeScreen ? (
                    <EditUser />
                  ) : (
                    <EditUser />
                  )
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
