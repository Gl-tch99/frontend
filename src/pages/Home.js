import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Friends from "./Friends";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

export default function Home() {
  const navigate = useNavigate();
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
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
            <div className="h-[10%] w-[93%] border rounded-3xl mt-2"></div>
            <div className="h-[85%] w-[98%] rounded-3xl overflow-scroll scrollbar-hide">
              <div className="flex flex-col items-center h-full mt-4">
                {/* ------------------------------------------------------------------------ */}
                {
                  <div className="card w-[93%] bg-transparent border text-neutral-content h-[20%] felx justify-center items-center">
                    <div className="card-body flex flex-row w-full h-full">
                      <div className="w-3/5 h-full flex flex-col justify-center">
                        <div>
                          <h2 className="card-title text-white font-extralight ">
                            Asdfsa asdfsad
                          </h2>
                        </div>
                        <div>
                          <p className="text-white font-extralight ">
                            Accept / Deny?
                          </p>
                        </div>
                      </div>
                      <div className="flex-row flex justify-end items-center gap-2 w-2/5 h-full">
                        <button className="btn btn-primary ">
                          <IoIosCheckmarkCircleOutline size="30" />
                        </button>
                        <button className="btn btn-ghost">
                          <IoIosCloseCircleOutline size="30" />
                        </button>
                      </div>
                    </div>
                  </div>
                }
                {/* ------------------------------------------------------------------------ */}
              </div>
            </div>
          </div>
          <div
            id="left-2"
            className="rounded-3xl w-full h-[38%] border overflow-scroll md:overflow-auto scrollbar-hide"
          >
            <Link
              to={"/addproj"}
              className="bg-green-900 rounded-full  text-white font-extralight xs:py-2 sm:py-2 md:py-2 text-2xl lg:py-2 px-5 lg:pb-2"
            >
              Add Project
            </Link>
          </div>
        </div>
        <div
          id="middle"
          className="rounded-3xl w-[45%] h-[93%] border overflow-scroll md:overflow-auto scrollbar-hide"
        >
          Projects List
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
