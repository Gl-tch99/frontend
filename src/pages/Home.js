import React from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div
        className="flex flex-wrap justify-evenly gap- 
       items-center rounded-3xl h-[95%] w-[95%] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border overflow-scroll md:overflow-auto scrollbar-hide"
      >
        <div
          id="left"
          className="flex flex-col justify-between items-center rounded-3xl w-[25%] h-[93%] overflow-scroll md:overflow-auto scrollbar-hide shadow-custom1 shadow-custom2 shadow-custom3 shadow-custom4"
        >
          <div
            id="left-1"
            className="flex flex-col justify-evenly items-center rounded-3xl w-full h-[60%] border overflow-scroll md:overflow-auto scrollbar-hide"
          >
            <div className="h-[10%] w-[98%] border rounded-3xl"></div>
            <div className="h-[85%] w-[98%] rounded-3xl overflow-scroll scrollbar-hide">
              <div></div>
            </div>
          </div>
          <div
            id="left-2"
            className="rounded-3xl w-full h-[38%] border overflow-scroll md:overflow-auto scrollbar-hide"
          >
            Projects
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
          className="rounded-3xl w-[25%] h-[93%] border overflow-scroll md:overflow-auto scrollbar-hide"
        >
          Profile
        </div>
      </div>
    </div>
  );
}
