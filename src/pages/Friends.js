import React, { useState } from "react";
import Friendadd from "../components/Friendadd";
import Friendreq from "../components/Friendreq";
import Friendslist from "../components/Friendslist";

export default function Friends() {
  const [FriendDiv, setFriendDiv] = useState("Friendslist");
  return (
    <div className="flex justify-center items-start h-screen w-screen scrollbar-hide lg:items-center overflow-x-clip z-20">
      <div
        className="flex flex-wrap justify-evenly mt-4
         items-center rounded-3xl h-[85%] w-[90%] top-2 lg:h-5/6 lg:w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex-row overflow-scroll md:overflow-auto gap-2 "
      >
        <div
          id="left-1"
          className="flex flex-col justify-evenly items-center rounded-3xl w-full h-full border overflow-scroll md:overflow-auto scrollbar-hide gap-8"
        >
          <div className=" w-full flex justify-evenly items-center overflow-visible">
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
      </div>
    </div>
  );
}
