import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

import Friendslist from "../components/Friendslist";
import Friendreq from "../components/Friendreq";
import Friendadd from "../components/Friendadd";
import Projects from "../components/Projects";
import UserProjects from "../components/UserProjects";
import Profile from "./Profile";

export default function Home() {
  const navigate = useNavigate();
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [FriendDiv, setFriendDiv] = useState("Friendslist");

  useEffect(() => {
    console.log(User);
  }, [User, LoggedIn]);

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div
        className="flex flex-wrap justify-evenly gap- 
       items-center rounded-3xl h-[95%] w-[95%] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border overflow-scroll md:overflow-auto scrollbar-hide"
      >
        <div
          id="left"
          className="flex flex-col justify-between items-center rounded-3xl w-[25%] h-[93%] overflow-scroll md:overflow-auto scrollbar-hide shadow-custom1 shadow-custom2 shadow-custom3 shadow-custom4 "
        >
          <div
            id="left-1"
            className="flex flex-col justify-evenly items-center rounded-3xl w-full h-[60%] border overflow-scroll md:overflow-auto scrollbar-hide gap-8"
          >
            <div className=" w-full flex justify-evenly items-center overflow-visible">
              {/* <input
                type="text"
                className=" flex justify-start items-center h-[10%] w-[93%] border rounded-3xl mt-2"
                className="bg-transparent text-2xl font-extralight ml-4 focus:outline-none w-full pb-1"
                placeholder="Search for Friends?"
              ></input> */}

              <div className="tabs w-full justify-center ">
                <button
                  className={`tab tab-md tab-lifted text-lg h-10 ${
                    FriendDiv === "Friendslist" ? "tab-active" : ""
                  }`}
                  onClick={() => {
                    setFriendDiv("Friendslist");
                  }}
                >
                  Friends List
                </button>
                <button
                  className={`tab tab-md tab-lifted text-lg h-10 ${
                    FriendDiv === "Friendreq" ? "tab-active" : ""
                  }`}
                  onClick={() => {
                    setFriendDiv("Friendreq");
                  }}
                >
                  Friend Req
                </button>
                <button
                  className={`tab tab-md tab-lifted text-lg h-10 ${
                    FriendDiv === "Friendadd" ? "tab-active" : ""
                  }`}
                  onClick={() => {
                    setFriendDiv("Friendadd");
                  }}
                >
                  Add Friend
                </button>
              </div>
            </div>
            <div className="h-[85%] w-[98%] rounded-3xl overflow-scroll scrollbar-hide justify-self-end ">
              <div className="flex flex-col items-center h-full mt-4 gap-3">
                {/* ------------------------------------------------------------------------ */}
                {FriendDiv === "Friendslist" ? (
                  <Friendslist />
                ) : FriendDiv === "Friendreq" ? (
                  <Friendreq />
                ) : (
                  <Friendadd />
                )}
                {/* ------------------------------------------------------------------------ */}
              </div>
            </div>
          </div>
          <div
            id="left-2"
            className="rounded-3xl w-full h-[38%] border overflow-scroll md:overflow-auto scrollbar-hide"
          >
            <UserProjects />
          </div>
        </div>
        <div
          id="middle"
          className="rounded-3xl w-[45%] h-[93%]  justify-between items-center flex flex-col overflow-scroll md:overflow-auto scrollbar-hide"
        >
          {/* --------------------------------------------------------------------------------------------------------------- */}
          <div className="flex h-[20%] w-[100%] flex-row mt-1 ">
            <div className="h-full w-[47%] flex justify-center border rounded-box items-center bg-transparent">
              <div className="text-white text-2xl  font-extralight flex flex-col ">
                <div className="text-center text-xl">Add Project.</div>
                <div className="text-white text-lg font-extralight">
                  Create or Join a Project.
                </div>
                <button
                  className="btn btn-outline btn-success btn-sm rounded-full  mt-4"
                  onClick={() => {
                    navigate("/addproj");
                  }}
                >
                  Add Project
                </button>
              </div>
              <div></div>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="h-full w-[47%] flex flex-col justify-center border rounded-box items-center bg-transparent">
              <input
                className="bg-transparent border w-[80%] rounded-full text-white text-2xl font-extralight pb-1 pl-4"
                placeholder="Search Project"
              ></input>
              <button className="btn btn-outline btn-success btn-sm rounded-full w-36 mt-4">
                Search
              </button>
            </div>
          </div>
          <div className="border w-full h-[77%] rounded-3xl flex flex-col justify-start items-center">
            {/* --------------------------------------------------------------------------------------------------------------------- */}

            {/* <div className="w-[98%] h-[98%] rounded-3xl flex flex-col shrink-0 justify-start gap-2 items-center mt-2 pt-2 py-2 overflow-scroll scrollbar-hide">
              <div className="card w-full bg-transparent shadow-xl shrink-0 border">
                <div className="card-body">
                  <h2 className="card-title"></h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="w-[96%] h-[98%] rounded-3xl flex flex-col shrink-0 justify-start gap-2 items-center mt-2 pt-2 py-2 overflow-scroll scrollbar-hide">
              <Projects />
            </div>
            {/* --------------------------------------------------------------------------------------------------------------------- */}
          </div>
          {/* --------------------------------------------------------------------------------------------------------------- */}
        </div>
        <div
          id="right"
          className=" flex flex-col justify-start items-center rounded-3xl w-[25%] h-[93%] border overflow-scroll md:overflow-auto scrollbar-hide gap-4"
        >
          {/* <div>
            <button
              className="bg-green-900 rounded-full mt-4 text-white font-extralight text-2xl py-2 px-5 pb-3 self-end"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div> */}
          <Profile />
        </div>
      </div>
    </div>
  );
}
