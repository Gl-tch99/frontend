import React from "react";

export default function Skill(props) {
  return (
    <>
      <div
        className="flex-auto grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md  rounded-full mt-1 py-1 px-4 bg-blue-700 hover:bg-red-800 cursor-pointer"
        onClick={props.remove(props.ele)}
      >
        {props.ele}
      </div>
    </>
  );
}
