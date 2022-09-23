import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { UserContext } from "../App";

export default function Projectadd() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [TechInput, setTechInput] = useState("");
  const [UserInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const [Project, setProject] = useState({
    name: "",
    creatorid: User.userid,
    leaderid: "",
    technologies: [],
    teamusers: [],
    description: "",
    status: "",
  });

  const [Errors, setErrors] = useState({
    name: false,
    creatorid: false,
    leaderid: false,
    description: false,
    status: false,
    nametouched: false,
    creatoridtouched: false,
    leaderidtouched: false,
    descriptiontouched: false,
    statustouched: false,
  });

  // useEffect(() => {
  //   console.log("add proj");
  // }, []);

  const handleChange = (event) => {
    setUser((Project) => ({
      ...Project,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    switch (field) {
      case "name": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
            nametouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            nametouched: true,
          });
        break;
      }
      case "creatorid": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
            creatoridtouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            creatoridtouched: true,
          });
        break;
      }
      case "leaderid": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
            leaderidtouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            leaderidtouched: true,
          });
        break;
      }
      case "description": {
        if (value === "" || value.length < 8 || value.length > 36)
          setErrors({
            ...Errors,
            [field]: true,
            descriptiontouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            descriptiontouched: true,
          });
        break;
      }
      case "status": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
            statustouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            statustouched: true,
          });
        break;
      }
      case "payment": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
            paymenttouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            paymenttouched: true,
          });
        break;
      }
      default:
        break;
    }
  };

  const handleSubmitData = (event) => {
    // alert(User);
    event.preventDefault();
    console.log("submit");
    axios({
      method: "post",
      url: "http://localhost:3000/projects/submit",
      data: {
        Project,
      },
      headers: {
        authorization: " Bearer " + localStorage.token,
      },
    }).then((response) => {
      // navigate("/home");
      console.log(response);
    });
  };

  const removeTechnology = (tech) => {
    const newtechnologies = Project.technologies.filter((ele, index) => {
      return ele !== tech;
    });
    setProject({
      ...Project,
      technologies: newtechnologies,
    });
  };
  const removeteamuser = (user) => {
    const newteamusers = Project.technologies.filter((ele, index) => {
      return ele !== user;
    });
    setProject({
      ...Project,
      teamusers: newteamusers,
    });
  };

  const handleTechChange = (event) => {
    if (event.nativeEvent.key === "Enter" && TechInput !== "") {
      event.preventDefault();
      setProject({
        ...Project,
        technologies: [...Project.technologies, TechInput],
      });
      setTechInput("");
      // console.log(User);
    } else if (event.nativeEvent.key === "Enter" && TechInput === "")
      event.preventDefault();
  };

  const handleteamuserChange = (event) => {
    if (event.nativeEvent.key === "Enter" && TechInput !== "") {
      event.preventDefault();
      setProject({
        ...Project,
        teamusers: [...Project.teamusers, UserInput],
      });
      setUserInput("");
      // console.log(User);
    } else if (event.nativeEvent.key === "Enter" && UserInput === "")
      event.preventDefault();
  };

  return (
    <div className="flex justify-center items-start h-screen w-screen lg:items-center">
      <div
        className="flex flex-col flex-wrap
       items-center rounded-3xl h-5/6 w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex overflow-x-hidden md:overflow-x-hidden scrollbar-hide bg-black  md:h-4/5 sm:mt-10 md:mt-10 mt-10"
      >
        <div className="h-3/4 w-3/4 mt-2 items-center ">
          <form>
            <div className="flex flex-col items-center justify-center h-full w-full mt-12">
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full w-3/4">
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Project Name:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4
                    ${
                      Errors.name &&
                      (Errors.name
                        ? "ring ring-red-800 border-0 outline-none border-red-800"
                        : "ring ring-green-500 border-0 outline-none border-red-800")
                    }}`}
                    placeholder={`${
                      Errors.name && Project.name ? "Required" : ""
                    }`}
                    name="name"
                    onChange={handleChange}
                    value={Project.name}
                    onBlur={validate}
                  ></input>
                </div>
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Creator Id:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4
                    ${
                      Errors.creatorid &&
                      (Errors.creatorid
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.creatorid && Project.creatorid ? "Required" : ""
                    }`}
                    name="creatorid"
                    onChange={handleChange}
                    value={Project.creatorid}
                    onBlur={validate}
                  ></input>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-3/5 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Leader Id:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4
                    ${
                      Errors.leaderid &&
                      (Errors.leaderid
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.leaderid && Project.leaderid === ""
                        ? "Required"
                        : ""
                    }`}
                    name="leaderid"
                    onChange={handleChange}
                    value={Project.leaderid}
                    onBlur={validate}
                  ></input>
                </div>
                <div className="col w-full lg:w-2/5 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Payment:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4
                    ${
                      Errors.payment &&
                      (Errors.payment
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.payment && Project.payment === "" ? "Required" : ""
                    }`}
                    name="payment"
                    onChange={handleChange}
                    value={Project.payment}
                    onBlur={validate}
                  ></input>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-full mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Project Description:
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className={`block p-2 w-full bg-transparent border border-white rounded-xl mt-2 text-white text-xl font-extralight pb-1"
                    ${
                      Errors.description &&
                      (Errors.description
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.description && Project.description === ""
                        ? "Required"
                        : ""
                    }`}
                    name="description"
                    onChange={handleChange}
                    value={Project.description}
                    onBlur={validate}
                  ></textarea>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-start lg:gap-4 lg:w-full lg:mt-4 w-3/4 ">
                <div className="col w-full md:w-full lg:w-1/3 self-start mt-2 lg:mt-0 ">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Technologies:
                  </label>

                  <input
                    type="text"
                    className="bg-transparent border border-white rounded-full w-full h-8 shrink text-white text-xl font-extralight pl-4  focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1"
                    name="technologies"
                    value={TechInput}
                    onChange={(event) => {
                      setTechInput(event.target.value);
                    }}
                    onKeyDown={handleTechChange}
                  ></input>
                </div>
                <div className="col flex w-full md:w-full lg:w-2/3 mt-2 lg:mt-0 self-start grow-0 max-w-full md:mb-2">
                  <div className="flex flex-wrap  lg:pt-6 pl-4 gap-2 w-full grow-0 flex-auto md:self-start">
                    {Project.technologies &&
                      Project.technologies.map((tech, index) => {
                        return (
                          <div
                            className="flex-auto grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md border rounded-full mt-3 pb-1 px-4 bg-transparent hover:bg-red-800 cursor-pointer"
                            key={index}
                            onClick={() => {
                              removeTechnology(tech);
                            }}
                            value={tech}
                          >
                            {tech}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-start lg:gap-4 lg:w-full lg:mt-4 w-3/4 ">
                <div className="col w-full md:w-full lg:w-1/3 self-start mt-2 lg:mt-0 ">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Team Users:
                  </label>
                  <input
                    type="text"
                    className="bg-transparent border border-white rounded-full w-full h-8 shrink text-white text-xl font-extralight pl-4  focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1"
                    name="teamusers"
                    value={UserInput}
                    onChange={(event) => {
                      setUserInput(event.target.value);
                    }}
                    onKeyDown={handleteamuserChange}
                    placeholder="Ex: Abc-2-y or Abc-3-M"
                  ></input>
                </div>
                <div className="col flex w-full md:w-2/3 lg:w-2/3 mt-2 lg:mt-0 self-start grow-0 max-w-full">
                  <div className="flex flex-wrap py-6 pl-4 gap-2 w-full grow-0 flex-auto">
                    {Project.teamusers &&
                      Project.teamusers.map((user, index) => {
                        return (
                          <div
                            className="flex justify-center items-center grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md border rounded-full lg:mt-3 md:mt-1 pb-1 px-4 bg-transparent hover:bg-red-800 cursor-pointer"
                            key={index}
                            onClick={() => removeteamuser(user)}
                            value={user}
                          >
                            <div className="">
                              <IoMdRemoveCircleOutline className="hidden" />
                              <span>{user}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4 mb-10">
                <div className="col w-full lg:w-full mt-2 lg:mt-0">
                  <button
                    type="submit"
                    className="bg-green-900 rounded-full mt-4 text-white font-extralight text-2xl py-2 px-5 pb-3"
                    disabled={
                      Errors.name ||
                      Errors.creatorid ||
                      Errors.leaderid ||
                      Errors.description ||
                      Errors.payment
                        ? true
                        : Errors.nametouched ||
                          Errors.creatoridtouched ||
                          Errors.leaderidtouched ||
                          Errors.descriptiontouched ||
                          Errors.paymenttouched
                        ? false
                        : true
                    }
                    onClick={handleSubmitData}
                  >
                    Sign-Up
                  </button>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
