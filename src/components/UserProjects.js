import React, { useState } from "react";
import CompletedProj from "./CompletedProj";
import WorkingProj from "./WorkingProj";

export default function UserProjects({ handleRerender }) {
  const [ProjectDiv, setProjectDiv] = useState("Working");
  return (
    <div>
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
          {ProjectDiv === "Working" ? (
            <WorkingProj handleRerender={handleRerender} />
          ) : (
            <CompletedProj />
          )}
          {/* ------------------------------------------------------------------------ */}
        </div>
      </div>
    </div>
  );
}
