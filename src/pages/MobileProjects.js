import React, { useContext } from "react";
import { UserContext } from "../App";

export default function MobileProjects() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  return (
    <div className="flex justify-center items-start h-screen w-screen scrollbar-hide lg:items-center overflow-x-clip">
      <div
        className="flex flex-col flex-wrap justify-evenly mt-4
         items-center rounded-3xl h-[85%] w-[90%] top-2 lg:h-5/6 lg:w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex-row overflow-scroll md:overflow-auto gap-2 "
      ></div>
    </div>
  );
}
