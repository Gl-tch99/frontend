import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import useLocalStorage from "./useLocalStorage";
import Tilt from "react-parallax-tilt";

export default function Projects({ handleRerender }) {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [Projects, setProjects] = useState([]);
  const [Local, setLocal] = useLocalStorage("User");

  useEffect(() => {
    console.log("rerender");
  }, [User]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/projects/fetchdata", {
        headers: {
          authorization: "Bearer " + localStorage.token,
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

  const handleJoin = async (project) => {
    await axios
      .put("http://localhost:3000/users/joinproj", {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          project,
        },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data._doc);
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  return (
    <>
      {Projects.length !== 0
        ? Projects.map((project, index) => {
            if (project.status === "Listed" || project.status === "Working")
              return (
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={1}
                  scale={0.95}
                  perspective={3000}
                  tiltMaxAngleY={8}
                  tiltMaxAngleX={8}
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
                      <p className="card-title text-white ml-4 text-lg font-extralight ">
                        Status: {project.status}
                      </p>
                    </div>
                    <div className="self-end w-[25%] flex justify-end ">
                      <button
                        className="btn btn-outline btn-success rounded-full w-36 mt-4 text-xl font-extralight self-end mb-4 mr-2"
                        onClick={() => {
                          handleJoin(project);
                          handleRerender();
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </Tilt>
              );
          })
        : ""}
    </>
  );
}
