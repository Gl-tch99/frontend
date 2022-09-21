import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../App";

function Login() {
  const { LoggedIn, setLoggedIn } = useContext(UserContext);
  const [User, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    admin: false,
  });
  const handleChange = (event) => {
    setUser({
      ...User,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(User);
    axios({
      method: "post",
      url: "http://localhost:3000/users/login",
      data: {
        User,
      },
    })
      .then((res) => {
        console.log("success");
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const handleRememberMe = (event) => {
    // console.log(event.target);
    setUser((User) => ({
      ...User,
      rememberMe: !User.rememberMe,
    }));
  };

  const handleAdmin = (event) => {
    // console.log(event.target);
    setUser((User) => ({
      ...User,
      admin: !User.admin,
    }));
  };

  const asf = "white";
  return (
    <div className="flex justify-center items-start h-screen w-screen overflow-hidden">
      <div
        className="flex flex-col flex-wrap justify-evenly mt-20
       items-center rounded-3xl h-[78%] w-5/6 top-2 lg:h-5/6 lg:w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex-row overflow-hidden md:overflow-auto"
      >
        <div className="w-full h-1/4 lg:h-full lg:w-2/6 flex justify-center items-center">
          <svg
            width="120"
            height="150"
            viewBox="0 0 197 227"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 75.5V151H41.643H83.287L98.143 142.922L113 134.844V118.422V102H139H165V116.5V131H181H197V105.434C197 89.723 196.601 79.123 195.965 77.934C194.96 76.057 193.274 76 139.092 76H83.255L82.522 98.017L81.789 120.034L56.645 119.767L31.5 119.5L31.242 59.75L30.984 0H15.492H0V75.5ZM98.336 163.391C91.096 167.363 84.459 171.204 83.586 171.928C82.243 173.043 82 176.058 82 191.573C82 213.441 82.989 219.189 87.533 223.733L90.8 227H132.327H173.854L184.927 214.041C191.017 206.913 196 200.613 196 200.041C196 199.336 182.587 199 154.5 199H113V177.5C113 165.675 112.662 156.038 112.25 156.085C111.838 156.132 105.576 159.42 98.336 163.391Z"
              fill={`${asf}`}
            />
          </svg>
        </div>
        <div className="font-normal text-4xl flex flex-col items-center overflow-hidden w-full h-3/4 lg:justify-center lg:items-center lg:flex-row lg:w-3/6 lg:h-full ">
          <div className="h-4/5 w-4/5 mt-4 flex flex-col justify-center">
            <form>
              <div className="flex flex-col items-center justify-center">
                <label className="text-white font-extralight text-2xl pl-6 pb-2 self-start">
                  Email:
                </label>
                <input
                  type="text"
                  className="bg-transparent border border-white rounded-full w-11/12 h-10 shrink text-white text-xl font-extralight pl-4  focus:outline-none focus:ring focus:border-blue-500 focus:border-0  pb-1 "
                  name="email"
                  onChange={handleChange}
                  value={User.email}
                ></input>
              </div>
              <div className="flex flex-col items-center py-2">
                <label className="text-white font-extralight text-2xl pl-6 pb-2 self-start">
                  Password:
                </label>
                <input
                  type="Password"
                  className="bg-transparent border border-white rounded-full w-11/12 h-10 shrink text-white text-xl font-extralight pl-4 focus:outline-none focus:ring focus:border-blue-500 focus:border-0 pb-1"
                  name="password"
                  onChange={handleChange}
                  value={User.password}
                ></input>
              </div>
              <div className="flex justify-around gap-4">
                <div>
                  <input type={"checkbox"} onClick={handleRememberMe}></input>
                  <label className="text-white font-extralight text-2xl pl-2 pb-3 self-start">
                    Remember Me.
                  </label>
                </div>
                <div>
                  <input type={"checkbox"} onClick={handleAdmin}></input>
                  <label className="text-white font-extralight text-2xl pl-2 pb-3 self-start">
                    Admin.
                  </label>
                </div>
              </div>
              <div className="flex flex-col items-center justify-evenly">
                <button
                  type="button"
                  className="bg-green-900 rounded-full mt-4 w-11/12  text-white font-extralight text-2xl py-1 px-5 pb-2"
                  onClick={handleSubmit}
                >
                  Log In
                </button>
                <div className="text-white font-extralight text-2xl pl-2 pb-3 pt-4">
                  <span className="pb-1 pr-4">Don't have an Account.</span>
                  <button
                    type="button"
                    className="bg-green-900 rounded-full mt-4 text-white font-extralight text-2xl py-1 px-5 pb-2"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
