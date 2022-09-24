import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

export default function Projects() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [Projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/projects/fetchdata", {
        headers: {
          authorization: " Bearer " + localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  }, []);

  const handleJoin = (project) => {
    axios
      .put("http://localhost:3000/projects/fetchdata", {
        headers: {
          authorization: " Bearer " + localStorage.token,
        },
        data: {
          project,
        },
      })
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  return (
    <>
      {Projects.length !== 0
        ? Projects.map((project, index) => {
            if (project.status === "Listed")
              return (
                <div
                  className="card w-full h-[24%] bg-transparent shadow-xl shrink-0 border "
                  key={index}
                >
                  <div className=" flex justify-evenly h-full ">
                    <div className=" w-[70%] mt-4">
                      <h2 className="card-title text-white ml-4 text-3xl font-extralight ">
                        {project.name}
                      </h2>
                      <p className="card-title text-white ml-4 text-lg font-extralight ">
                        Description: {project.description}
                      </p>
                      <p className="card-title text-white ml-4 text-lg font-extralight ">
                        Technologies Reqired: {project.technologies}
                      </p>
                    </div>
                    <div className="self-end w-[25%] flex justify-end ">
                      <button
                        className="btn btn-outline btn-success rounded-full w-36 mt-4 text-xl font-extralight self-end mb-4 mr-2"
                        onClick={() => {
                          handleJoin(project);
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              );
          })
        : ""}
    </>
  );
}
