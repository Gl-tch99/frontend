import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import Svganimation from "./components/Svganimation";
import Wavesanimation from "./components/Wavesanimation";
import Register from "./components/Register";
export const UserContext = React.createContext(null);
export const ThemeContext = React.createContext(null);

function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [LargeScreen, setLargeScreen] = useState(true);
  const [User, setUser] = useState();

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 1024) setLargeScreen(false);
    if (localStorage.token != null) {
    } else {
      console.log("logged in");
      // <Navigate to="/login" />;
    }
    return () => {};
  }, []);
  const handleLoggedIn = () => {};
  return (
    <UserContext.Provider
      value={({ LoggedIn, setLoggedIn }, { User, setUser })}
      // user={{ User, setUser }}
    >
      <div className="bg-[#001220] h-screen w-screen m-0 p-0 overflow-hidden overflow-x-hidden">
        {/*//040404*/}
        <Svganimation />
        {/* <Wavesanimation /> */}

        {/* {LoggedIn && !LargeScreen ? <Nav /> : <Login />} */}
        <Nav />
        <div className="container">
          <Routes>
            {/* <Route
              path="/"
              element={
                LoggedIn ? (
                  <>
                    <Nav /> <Home />
                  </>
                ) : (
                  <Login />
                )
              }
            /> */}
            <Route path="/" element={LoggedIn ? <Home /> : <Login />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
