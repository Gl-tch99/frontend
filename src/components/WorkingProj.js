import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../App";
import Tilt from "react-parallax-tilt";

export default function WorkingProj() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [WorkingProj, setWorkingProj] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(User.projects.length);
  }, [User]);

  const handleChangeStatus = async (value, project) => {
    // if (value === "Completed") {
    //   await axios.put("http://localhost:3000/projects/changestatus", {
    //     headers: {
    //       authorization: "Bearer " + localStorage.token,
    //     },
    //     data: {
    //       project,
    //       value,
    //     },
    //   }).then((res) => {
    //     console.log
    //   })
    //   // navigate("");
    // } else {
    //   await axios.put("http://localhost:3000/projects/changestatus", {
    //     headers: {
    //       authorization: "Bearer " + localStorage.token,
    //     },
    //     data: {
    //       project,
    //       value,
    //     },
    //   });
    // }
  };

  return (
    <>
      {User.projects !== 0 &&
        User.projects.map((project, index) => {
          if (project.status === "Working" || project.status === "Listed") {
            return (
              <div
                className="flex w-[93%] bg-transparent border text-neutral-content h-[20%] felx justify-evenly items-center cursor-pointer rounded-2xl py-3 "
                key={index}
              >
                <div className="flex flex-col w-[80%] ml-2">
                  <div className="text-white font-extralight text-2xl">
                    {project.name}
                  </div>
                  <div className="text-white font-extralight text-md">
                    Description: {project.status}
                  </div>
                </div>
                <div>
                  {/* <select className="select select-accent w-[93%] ">
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
                  </select> */}
                  <div className="dropdown dropdown-hover dropdown-end pr-2">
                    <label tabIndex={0} className="btn m-1 text-xs">
                      Change Status
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {project.status !== "Working" ? (
                        <li>
                          <button
                            onClick={(event) => {
                              handleChangeStatus(event.target.value, project);
                            }}
                            value="Working"
                          >
                            Working
                          </button>
                        </li>
                      ) : (
                        ""
                      )}
                      {project.status !== "Completed" ? (
                        <li>
                          <button
                            onClick={(event) => {
                              handleChangeStatus(event.target.value, project);
                            }}
                            value="Completed"
                          >
                            Completed
                          </button>
                        </li>
                      ) : (
                        ""
                      )}
                      {project.status !== "Listed" ? (
                        <li>
                          <button
                            onClick={(event) => {
                              handleChangeStatus(event.target.value, project);
                            }}
                            value="Listed"
                          >
                            Listed
                          </button>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          } else return <div></div>;
        })}
    </>
  );
}
