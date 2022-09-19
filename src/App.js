import React, { useEffect, useState } from "react";
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

function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.token != null) {
      console.log("not logged in.");
    } else {
      console.log("logged in");
      // <Navigate to="/login" />;
    }
    return () => {};
  }, []);

  return (
    <div className="bg-[#001220] h-screen w-screen m-0 p-0 ">
      {/*//040404*/}
      <Svganimation />
      {/* <Wavesanimation /> */}
      {LoggedIn ? <Nav /> : ""}
      <div className="container">
        <Routes>
          <Route path="/" element={LoggedIn ? <Home /> : <Register />} />
          {/*<Login />*/}
          <Route path="/projects" element={<Projects />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
