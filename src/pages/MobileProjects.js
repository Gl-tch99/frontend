import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import CompletedProj from "../components/CompletedProj";
import WorkingProj from "../components/WorkingProj";

export default function MobileProjects() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [ProjectDiv, setProjectDiv] = useState("Working");

  return (
    <div className="flex justify-center items-start h-screen w-screen scrollbar-hide lg:items-center overflow-x-clip">
      <div
        className="flex flex-col flex-wrap justify-evenly mt-4
         items-center rounded-3xl h-[85%] w-[90%] top-2 lg:h-5/6 lg:w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex-row overflow-scroll md:overflow-auto gap-2 "
      >
        <div className="tabs w-full justify-center relative ">
          <button
            className={`tab tab-md tab-lifted text-md h-10 w-1/2 flex gap-1  ${
              ProjectDiv === "Working" ? "tab-active" : ""
            }`}
            onClick={() => {
              setProjectDiv("Working");
            }}
          >
            <div>Working</div>
            <div>Projects</div>
          </button>
          <button
            className={`tab tab-md tab-lifted text-md h-10 w-1/2 flex gap-1 ${
              ProjectDiv === "Completed" ? "tab-active" : ""
            }`}
            onClick={() => {
              setProjectDiv("Completed");
            }}
          >
            <div>Completed</div>
            <div>Projects</div>
          </button>
        </div>
        <div className="h-[85%] w-[98%] rounded-3xl overflow-scroll scrollbar-hide justify-self-end ">
          <div className="flex flex-col items-center h-full mt-4 gap-3 overflow-scroll scrollbar-hide">
            {/* ------------------------------------------------------------------------ */}
            {ProjectDiv === "Working" ? <WorkingProj /> : <CompletedProj />}
            {/* ------------------------------------------------------------------------ */}
          </div>
        </div>
      </div>
    </div>
  );
}
