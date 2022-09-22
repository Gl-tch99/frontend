import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

import Friendslist from "../components/Friendslist";
import Friendreq from "../components/Friendreq";
import Friendadd from "../components/Friendadd";

export default function Home() {
  const navigate = useNavigate();
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [FriendDiv, setFriendDiv] = useState("Friendslist");

  useEffect(() => {
    console.log(User);
  }, [User, LoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser({});
    navigate("/");
  };

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
            className="flex flex-col justify-evenly items-center rounded-3xl w-full h-[60%] border overflow-scroll md:overflow-auto scrollbar-hide "
          >
            <div className=" w-full flex justify-evenly ">
              {/* <input
                type="text"
                className=" flex justify-start items-center h-[10%] w-[93%] border rounded-3xl mt-2"
                className="bg-transparent text-2xl font-extralight ml-4 focus:outline-none w-full pb-1"
                placeholder="Search for Friends?"
              ></input> */}

              <div className="tabs w-full justify-center h-10">
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
            <div className="h-[85%] w-[98%] rounded-3xl overflow-scroll scrollbar-hide">
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
          ></div>
        </div>
        <div
          id="middle"
          className="rounded-3xl w-[45%] h-[93%] border overflow-scroll md:overflow-auto scrollbar-hide"
        >
          <Link
            to={"/addproj"}
            className="bg-green-900 rounded-full  text-white font-extralight xs:py-2 sm:py-2 md:py-2 text-2xl lg:py-2 px-5 lg:pb-2"
          >
            Add Project
          </Link>
        </div>
        <div
          id="right"
          className=" flex flex-col justify-start items-center rounded-3xl w-[25%] h-[93%] border overflow-scroll md:overflow-auto scrollbar-hide"
        >
          <div>
            <button
              className="bg-green-900 rounded-full mt-4 text-white font-extralight text-2xl py-2 px-5 pb-3 self-end"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
