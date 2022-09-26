import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import Tilt from "react-parallax-tilt";

export default function Profile() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    setLoggedIn(false);
    setUser({});
    navigate("/");
  };
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="">
          <button
            className="btn btn-outline btn-success rounded-full mr-2 mt-2"
            onClick={() => {
              navigate("/edituser");
            }}
          >
            Edit
          </button>
        </div>
        <div className="">
          <button
            className="btn btn-outline btn-success rounded-full mr-2 mt-2"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.5}
        className="h-full w-[47%] flex flex-col justify-center rounded-box items-center m-2 mask mask-hexagon"
      >
        <img
          className="mask mask-hexagon outline-offset-2 outline-success"
          src="https://placeimg.com/160/160/arch"
        />
      </Tilt>
      <div>
        <div className="text-white text-3xl text-center font-extralight capitalize">
          {User.firstname}
        </div>
        <div className="text-white mt-1 text-2xl text-center font-extralight capitalize">
          {User.lastname}
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex-row justify-center w-full">
        <div className="flex-row justify-center w-full">
          <div className="self-start text-white mt-1 text-2xl font-extralight capitalize ml-4">
            About Me:
          </div>
          <div className="text-white mt-1 text-xl ml-4 font-extralight">
            {User.description}
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex-row justify-center w-full">
          <div className="self-start text-right pr-12 w-full text-white mt-2 text-2xl font-extralight capitalize ml-4">
            Email:
          </div>
          <div className="text-white mt-2 text-right pr-8 text-xl ml-4 font-extralight">
            {User.email}
          </div>
        </div>
        <div className="divider"></div>
        <div className="self-start w-full text-white mt-1 text-2xl font-extralight capitalize ml-4">
          Skillset:
        </div>
        <div className="flex gap-2 w-3/4 flex-wrap mt-2">
          {User.skillsets.map((skill, index) => {
            return (
              <div
                className="border rounded-full text-center py-2 px-6 text-white mt-1 text-xl font-extralight capitalize ml-4"
                key={index}
              >
                {skill}
              </div>
            );
          })}
        </div>
        <div className="divider"></div>
        <div className="self-end text-end pr-8 text-white mt-1 text-2xl font-extralight capitalize ml-4">
          Experience:
        </div>
        <div className="flex gap-2 w-full flex-wrap mt-2 items-center justify-end">
          <div className="mr-6 ">
            {User.experience.map((exp, index) => {
              return (
                <div
                  className="border rounded-full text-center py-2 px-6 text-white mt-1 text-xl font-extralight capitalize ml-4"
                  key={index}
                >
                  {`${exp.experience} - ${exp.duration}`}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
