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
import Tilt from "react-parallax-tilt";
import useLocalStorage from "../components/useLocalStorage";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [FriendDiv, setFriendDiv] = useState("Friendslist");
  const [Local, setLocal] = useLocalStorage("User");
  const [Search, setSearch] = useState("");
  const [SearchResult, setSearchResult] = useState([]);
  const [ReRender, setReRender] = useState(false);
  const [Chat, setChat] = useState(true);

  const handleRerender = () => {
    console.log("handle rerender ran.");
    setReRender(!ReRender);
  };

  useEffect(() => {
    console.log("refreshed");
    let result = verifytoken();
    console.log(result);
  }, [ReRender]);

  const handleSearch = async () => {
    await axios
      .post("http://localhost:3000/projects/search", {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          Search,
        },
      })
      .then((response) => {
        console.log(response.data);
        const users = response.data;
        console.log(users);
        setSearchResult(users);
      })
      .catch((error) => console.log(error));
  };

  const verifytoken = async () => {
    await axios
      .get("/users/verifytoken", {
        headers: {
          authorization: " Bearer " + localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        const users = res.data;
        setLoggedIn(true);
        setUser(users);
        setLocal(users);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const setChatProp = () => {
    setChat(false);
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
            className="flex flex-col justify-evenly items-center rounded-3xl w-full h-[60%] border overflow-scroll md:overflow-auto scrollbar-hide gap-8"
          >
            {/* {Chat ? (
              <> */}
            <div className=" w-full flex justify-evenly items-center overflow-visible ">
              <div className="tabs w-full justify-center mt-4 ">
                <button
                  className={`tab tab-md tab-lifted text-lg h-14 w-1/3 ${
                    FriendDiv === "Friendslist" ? "tab-active" : ""
                  }`}
                  onClick={() => {
                    setFriendDiv("Friendslist");
                  }}
                >
                  Friends List
                </button>
                <button
                  className={`tab tab-md tab-lifted text-lg h-14 w-1/3 ${
                    FriendDiv === "Friendreq" ? "tab-active" : ""
                  }`}
                  onClick={() => {
                    setFriendDiv("Friendreq");
                  }}
                >
                  Friend Req
                </button>
                <button
                  className={`tab tab-md tab-lifted text-lg h-14 w-1/3 ${
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
            <div className="h-[85%] w-[98%] rounded-3xl justify-self-end">
              <div className="flex flex-col items-center h-full mt-4 gap-3">
                {/* ------------------------------------------------------------------------ */}
                {FriendDiv === "Friendslist" ? (
                  <Friendslist setChatProp={setChatProp} />
                ) : FriendDiv === "Friendreq" ? (
                  <Friendreq handleRerender={handleRerender} />
                ) : FriendDiv === "Friendadd" ? (
                  <Friendadd />
                ) : FriendDiv === "Chat" ? (
                  <div>asd</div>
                ) : (
                  <div>asdas</div>
                )}

                {/* ------------------------------------------------------------------------ */}
              </div>
            </div>
            {/* </>
            ) : (
              <div
                className="text-white"
                onClick={() => {
                  setChat(true);
                }}
              >
                switch
              </div>
            )} */}
          </div>
          <div
            id="left-2"
            className="rounded-3xl w-full h-[38%] border overflow-scroll scrollbar-hide"
          >
            <UserProjects handleRerender={handleRerender} />
          </div>
        </div>
        <div
          id="middle"
          className="rounded-3xl w-[45%] h-[93%]  justify-between items-center flex flex-col overflow-scroll md:overflow-auto scrollbar-hide"
        >
          {/* --------------------------------------------------------------------------------------------------------------- */}
          <div className="flex h-[20%] w-[100%] flex-row mt-1 ">
            {/* <div className="h-full w-[47%] flex justify-center border rounded-box items-center bg-transparent"> */}
            <Tilt
              glareEnable={true}
              glareMaxOpacity={1}
              className="h-full w-[47%] flex flex-col justify-center border rounded-box items-center m-2 overflow-hidden"
            >
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
            </Tilt>
            {/* </div> */}
            <div className="divider divider-horizontal">OR</div>
            <Tilt
              glareEnable={true}
              glareMaxOpacity={1}
              className="h-full w-[47%] flex flex-col justify-center border rounded-box items-center bg-transparent m-2 overflow-hidden"
            >
              <input
                className="bg-transparent border w-[80%] rounded-full text-white text-2xl font-extralight pb-1 pl-4"
                placeholder="Search Project"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                value={Search}
              ></input>
              <button
                className="btn btn-outline btn-success btn-sm rounded-full w-36 mt-4"
                onClick={() => {
                  handleSearch();
                }}
              >
                Search
              </button>
            </Tilt>
          </div>
          <div className="border w-full h-[77%] rounded-3xl flex flex-col justify-start items-center">
            {/* --------------------------------------------------------------------------------------------------------------------- */}
            <div className="w-[96%] h-[98%] rounded-3xl flex flex-col shrink-0 justify-start gap-2 items-center mt-2 pt-2 py-2 overflow-scroll scrollbar-hide">
              <Projects handleRerender={handleRerender} />
            </div>
            {/* --------------------------------------------------------------------------------------------------------------------- */}
          </div>
          {/* --------------------------------------------------------------------------------------------------------------- */}
        </div>
        <div
          id="right"
          className=" flex flex-col justify-start items-center rounded-3xl w-[25%] h-[93%] border overflow-scroll md:overflow-auto scrollbar-hide gap-4"
        >
          <Profile />
        </div>
      </div>
    </div>
  );
}
