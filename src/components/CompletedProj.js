import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
export default function CompletedProj() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  return (
    <>
      {User.projects !== 0 &&
        User.projects.map((project, index) => {
          if (project.status === "Completed") {
            return (
              <div
                className="flex w-[93%] bg-transparent border text-neutral-content h-[20%] felx justify-evenly items-center cursor-pointer rounded-2xl py-3"
                key={index}
              >
                <div className="flex flex-col w-[80%] ml-2">
                  <div className="text-white font-extralight text-2xl">
                    {project.name}
                  </div>
                  <div className="text-white font-extralight text-md">
                    Description: {project.description}
                  </div>
                </div>
                <div>
                  <select className="select select-accent w-[93%] ">
                    <option disabled selected>
                      Change status
                    </option>
                    {project.status !== "Working" ? (
                      <option>Working</option>
                    ) : (
                      ""
                    )}
                    {project.status !== "Comleted" ? (
                      <option>Completed</option>
                    ) : (
                      ""
                    )}
                  </select>
                </div>
              </div>
            );
          }
        })}
    </>
  );
}
