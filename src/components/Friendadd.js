import React from "react";

export default function () {
  return (
    <div className="h-full w-full flex flex-col justify-start items-center bg-black gap-2">
      <div className=" flex h-[10%] w-[98%] border rounded-3xl mt-2 ">
        <input
          type="text"
          className="bg-transparent text-2xl font-extralight ml-4 focus:outline-none w-[75%] pb-1 bg-white"
          placeholder="Search for Friends?"
        ></input>
      </div>
      <div className="h-[83%] w-[98%] rounded-3xl overflow-scroll scrollbar-hide justify-center bg-white flex">
        asdf
      </div>
    </div>
  );
}
