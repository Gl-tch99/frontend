import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Tilt from "react-parallax-tilt";
import Typed from "react-typed";

function Login() {
  const navigate = useNavigate();
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [RememberMe, setRememberMe] = useState(false);
  const [LoginUser, setLoginUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    admin: false,
  });
  const [Errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (event) => {
    setLoginUser({
      ...LoginUser,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  useEffect(() => {
    console.log(User);
    console.log(LoggedIn);
    if (LoggedIn) navigate("/home");
  }, [LoggedIn, User]);

  const handleSubmit = async (event) => {
    console.log(LoginUser);
    await axios({
      method: "post",
      url: "http://localhost:3000/users/login",
      data: {
        LoginUser,
      },
    })
      .then((res) => {
        console.log("success");
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log(res.data._doc);
        setUser(res.data._doc);
        setLoggedIn(true);
        // setUser(res.data._doc);
        console.log(LoggedIn);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRememberMe = (event) => {
    // console.log(event.target);
    setLoginUser((LoginUser) => ({
      ...LoginUser,
      rememberMe: RememberMe,
    }));
  };

  const handleAdmin = (event) => {
    // console.log(event.target);
    setLoginUser((LoginUser) => ({
      ...LoginUser,
      admin: !LoginUser.admin,
    }));
  };

  const validate = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    switch (field) {
      case "email": {
        if (
          value === "" ||
          !value.match(/^([A-z0-9]+)*(@\w+)*([.com, .org])+$/)
        )
          setErrors({
            ...Errors,
            [field]: true,
            emailtouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            emailtouched: true,
          });
        break;
      }
      case "password": {
        if (value === "" || value.length < 8 || value.length > 36)
          setErrors({
            ...Errors,
            [field]: true,
            passwordtouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            passwordtouched: true,
          });
        break;
      }
      default:
        break;
    }
  };

  const asf = "#00df9a";
  return (
    <div className="flex justify-center items-start h-screen w-screen overflow-hidden lg:items-center ">
      <Tilt
        tiltEnable={false}
        scale={1.02}
        perspective={3000}
        glareEnable={true}
        glareMaxOpacity={0.2}
        tiltMaxAngleY={8}
        tiltMaxAngleX={8}
        className="flex flex-col flex-wrap justify-evenly mt-20
         items-center rounded-3xl h-[78%] w-5/6 top-2 lg:h-5/6 lg:w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex-row overflow-hidden md:overflow-auto scrollbar-hide"
      >
        <Tilt
          scale={1.02}
          perspective={3000}
          className="w-full mt-6 h-1/5 lg:h-full lg:w-2/6 flex justify-center lg:flex-col lg:justify-center items-center gap-4 overflow-hidden"
        >
          <svg
            width="120"
            height="150"
            viewBox="0 0 197 227"
            fill="linear-gradient(to top, #c31432, #240b36);"
            xmlns="http://www.w3.org/2000/svg"
            className=" w-1/3 lg:w-1/2 "
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 75.5V151H41.643H83.287L98.143 142.922L113 134.844V118.422V102H139H165V116.5V131H181H197V105.434C197 89.723 196.601 79.123 195.965 77.934C194.96 76.057 193.274 76 139.092 76H83.255L82.522 98.017L81.789 120.034L56.645 119.767L31.5 119.5L31.242 59.75L30.984 0H15.492H0V75.5ZM98.336 163.391C91.096 167.363 84.459 171.204 83.586 171.928C82.243 173.043 82 176.058 82 191.573C82 213.441 82.989 219.189 87.533 223.733L90.8 227H132.327H173.854L184.927 214.041C191.017 206.913 196 200.613 196 200.041C196 199.336 182.587 199 154.5 199H113V177.5C113 165.675 112.662 156.038 112.25 156.085C111.838 156.132 105.576 159.42 98.336 163.391Z"
              fill={asf}
              stroke="black"
              strokeWidth={2}
            />
          </svg>
          <div className="flex flex-col w-1/2 items-center justify-center ">
            <div className="font-light lg:text-5xl text-white text-4xl">
              Let's Collab
            </div>
            {/* <div className="flex justify-center gap-1 w-full"> */}
            <div className="font-extralight text-white text-2xl pt-4">
              <div>A Platform made </div>
              <Typed
                className="text-white font-extralight text-2xl pt-2"
                strings={["By the Devs", "For the Devs"]}
                typeSpeed={50}
                backSpeed={80}
                loop
              />
            </div>
          </div>
        </Tilt>
        <div className="font-normal text-4xl flex flex-col items-center overflow-hidden w-full h-3/4 lg:justify-center lg:items-center lg:flex-row lg:w-3/6 lg:h-full ">
          <div className="h-4/5 w-4/5 mt-4 flex flex-col justify-center">
            <form>
              <div className="flex flex-col items-center justify-center">
                <label className="text-white font-light text-2xl pl-6 pb-2 self-start">
                  Email:
                </label>
                <input
                  type="text"
                  className={`bg-transparent border border-white rounded-full w-11/12 h-10 shrink text-white text-xl font-extralight pl-4  focus:outline-none focus:ring focus:border-blue-500 focus:border-0  pb-1 overflow-scroll
                  ${
                    Errors.email &&
                    (Errors.email
                      ? "ring ring-red-800 border-0 outline-none "
                      : "ring ring-green-500 border-0 outline-none ")
                  }}`}
                  placeholder={`${
                    Errors.email && Errors.email === "" ? "Required" : ""
                  }`}
                  name="email"
                  onChange={handleChange}
                  value={LoginUser.email}
                  onBlur={validate}
                ></input>
              </div>
              <div className="flex flex-col items-center py-2">
                <label className="text-white font-light text-2xl pl-6 pb-2 self-start">
                  Password:
                </label>
                <input
                  type="Password"
                  className={`bg-transparent border border-white rounded-full w-11/12 h-10 shrink text-white text-xl font-extralight pl-4 focus:outline-none focus:ring focus:border-blue-500 focus:border-0 pb-1
                  ${
                    Errors.password &&
                    (Errors.password
                      ? "ring ring-red-800 border-0 outline-none "
                      : "ring ring-green-500 border-0 outline-none ")
                  }}`}
                  placeholder={`${
                    Errors.password && Errors.password === "" ? "Required" : ""
                  }`}
                  name="password"
                  onChange={handleChange}
                  value={LoginUser.password}
                  onBlur={validate}
                ></input>
              </div>

              <div className="flex flex-col ml-6 md:flex-row justify-evenly gap-2">
                <div>
                  <input
                    type="checkbox"
                    onClick={() => {
                      setRememberMe(!RememberMe);
                      handleRememberMe();
                    }}
                    checked={LoginUser.rememberMe ? "checked" : ""}
                    className="checkbox checkbox-primary"
                    onChange={() => {
                      console.log(LoginUser.rememberMe);
                    }}
                  ></input>
                  <label className="text-white font-extralight text-2xl pl-2 pb-4 self-start">
                    Remember Me.
                  </label>
                </div>
                <div>
                  <input
                    type={"checkbox"}
                    onClick={handleAdmin}
                    checked={LoginUser.admin ? "checked" : ""}
                    className="checkbox checkbox-primary"
                    onChange={() => {
                      console.log(LoginUser.admin);
                    }}
                  ></input>
                  <label className="text-white font-extralight text-2xl pl-2 pb-4 self-start">
                    Admin.
                  </label>
                </div>
              </div>
              <div className="flex flex-col items-center justify-evenly">
                <button
                  type="button"
                  className="btn btn-outline btn-success rounded-full mt-4 w-11/12  text-white font-extralight text-2xl py-1 px-5 pb-2"
                  // className="btn btn-outline btn-success rounded-full w-36 mt-4"
                  disabled={
                    Errors.email || Errors.password
                      ? true
                      : Errors.emailtouched || Errors.passwordtouched
                      ? false
                      : true
                  }
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Log In
                </button>
                <div className="flex justify-evenly flex-wrap text-white font-extralight text-2xl pl-2 pb-3 pt-4">
                  <div className="pb-1 pr-4 mt-2">Don't have an Account.</div>
                  <Link
                    to={"/register"}
                    className="btn btn-outline btn-success rounded-full  text-white font-extralight xs:py-2 sm:py-2 md:py-2 text-2xl lg:py-2 px-5 lg:pb-2"
                  >
                    SignUp
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default Login;
