import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import internals from "kute.js/src/core/internals";

export default function Register() {
  const [SkillInput, setSkillInput] = useState("");
  const [Skills, setSkills] = useState([]);
  const [ExpInput, setExpInput] = useState("");
  const [Experience, setExperience] = useState([]);
  const [Cpass, setCpass] = useState("");
  const [User, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    skillsets: [],
    experience: [],
    description: "",
  });
  const [Errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    confirmpassword: false,
    mobile: false,
    description: false,
  });
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   watch,
  // } = useForm();

  // useEffect(() => {
  //   console.log(User);
  // }, [User]);

  const handleChange = (event) => {
    setUser((User) => ({
      ...User,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    switch (field) {
      case "firstname": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
          });
        break;
      }
      case "lastname": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
          });
        break;
      }
      case "email": {
        if (value === "" || !value.match(/^([A-z]+)*(@\w+)*([.com, .org])+$/))
          setErrors({
            ...Errors,
            [field]: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
          });
        break;
      }
      case "password": {
        if (value === "" || value.length < 8 || value.length > 36)
          setErrors({
            ...Errors,
            [field]: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
          });
        break;
      }
      case "confirmpassword": {
        if (value !== User.password)
          setErrors({
            ...Errors,
            [field]: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
          });
        break;
      }
      case "mobile": {
        let pattern = /^([9]{1})([234789]{1})([0-9]{8})$/;
        if (value.toString() === "" || pattern.test(parseInt(value)))
          setErrors({
            ...Errors,
            [field]: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
          });
        break;
      }
      case "description": {
        if (value === "" || value < 5)
          setErrors({
            ...Errors,
            [field]: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
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
    console.log(User);
    axios({
      method: "post",
      url: "http://localhost:3000/users/submit",
      data: {
        User,
      },
    }).then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(response.data.token);
    });
  };

  const removeSkill = (skill) => {
    const newskills = Skills.filter((ele, index) => {
      return ele !== skill;
    });
    setSkills(newskills);
  };

  const handleExpChange = (event) => {
    if (event.nativeEvent.key === "Enter" && ExpInput !== "") {
      event.preventDefault();
      const data = event.target.value.toString().split("-");
      if (data.length === 3) {
        console.log(data);
        setExperience([
          ...Experience,
          {
            experience: data[0],
            duration:
              data[2] === "y" || data[2] === "Y"
                ? data[1] + " Years"
                : data[2] === "m" || data[2] === "M"
                ? data[1] + " Months"
                : "Invalid Duration.",
          },
        ]);
        setUser({
          ...User,
          experience: Experience,
        });
      } else {
        event.preventDefault();
        setExpInput("");
      }
      setExpInput("");
    }
  };
  const handleSkillsChange = (event) => {
    if (event.nativeEvent.key === "Enter" && SkillInput !== "") {
      event.preventDefault();
      setSkills([...Skills, SkillInput]);
      setSkillInput("");
      setUser({
        ...User,
        skillsets: Skills,
      });
    } else if (event.nativeEvent.key === "Enter" && SkillInput === "")
      event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div
        className="flex flex-col flex-wrap 
       items-center rounded-3xl h-5/6 w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex overflow-scroll md:overflow-auto scrollbar-hide"
      >
        <div className="h-3/4 w-3/4 mt-2 ">
          <form>
            <div className="flex flex-col items-center justify-center mt-8 h-full w-full">
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full w-3/4">
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4 
                    ${
                      Errors.firstname &&
                      (Errors.firstname
                        ? "ring ring-red-800 border-0 outline-none border-red-800"
                        : "ring ring-green-500 border-0 outline-none border-red-800")
                    }}`}
                    placeholder={`${
                      Errors.firstname && Errors.firstname ? "Required" : ""
                    }`}
                    name="firstname"
                    onChange={handleChange}
                    value={User.firstname}
                    onBlur={validate}
                  ></input>
                </div>
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4 
                    ${
                      Errors.lastname &&
                      (Errors.lastname
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.lastname && Errors.lastname ? "Required" : ""
                    }`}
                    name="lastname"
                    onChange={handleChange}
                    value={User.lastname}
                    onBlur={validate}
                  ></input>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-3/5 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Email Id:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4 
                    ${
                      Errors.email &&
                      (Errors.email
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.email && Errors.email === "" ? "Required" : ""
                    }`}
                    name="email"
                    // {...register("email", {
                    //   required: true,
                    //   pattern:
                    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    // })}
                    onChange={handleChange}
                    value={User.email}
                    onBlur={validate}
                  ></input>
                </div>
                <div className="col w-full lg:w-2/5 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Mobile:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4 
                    ${
                      Errors.mobile &&
                      (Errors.mobile
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.mobile && User.mobile === "" ? "Required" : ""
                    }`}
                    name="mobile"
                    onChange={handleChange}
                    value={User.mobile}
                    onBlur={validate}
                  ></input>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Password:
                    {`${
                      Errors.password && User.password !== ""
                        ? User.password.length < 8 || User.password.length > 36
                          ? " Must be 8-36 characters"
                          : ""
                        : ""
                    }`}
                  </label>
                  <input
                    type="password"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4 
                    ${
                      Errors.password &&
                      (Errors.password
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.password && User.password === "" ? "Required" : ""
                    }`}
                    name="password"
                    onChange={handleChange}
                    value={User.password}
                    onBlur={validate}
                  ></input>
                </div>
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4 
                    ${
                      Errors.confirmpassword &&
                      (Errors.confirmpassword
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      Errors.confirmpassword && Errors.confirmpassword === ""
                        ? "Required"
                        : ""
                    }`}
                    name="confirmpassword"
                    onChange={(event) => {
                      setCpass(event.target.value);
                    }}
                    value={Cpass}
                    onBlur={validate}
                  ></input>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-full mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    About Me:
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
                      Errors.description && Errors.description === ""
                        ? "Required"
                        : ""
                    }`}
                    name="description"
                    onChange={handleChange}
                    value={User.description}
                    onBlur={validate}
                  ></textarea>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-start lg:gap-4 lg:w-full lg:mt-4 w-3/4 ">
                <div className="col w-full md:w-1/3 lg:w-1/3 self-start mt-2 lg:mt-0 ">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Skills:
                  </label>

                  <input
                    type="text"
                    className="bg-transparent border border-white rounded-full w-full h-8 shrink text-white text-xl font-extralight pl-4  focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1"
                    name="skill"
                    value={SkillInput}
                    onChange={(event) => {
                      setSkillInput(event.target.value);
                    }}
                    onKeyDown={handleSkillsChange}
                  ></input>
                </div>
                <div className="col flex w-full md:w-2/3 lg:w-2/3 mt-2 lg:mt-0 self-start grow-0 max-w-full">
                  <div className="flex flex-wrap pt-6 pl-4 gap-2 w-full grow-0 flex-auto">
                    {Skills &&
                      Skills.map((skill, index) => {
                        return (
                          <div
                            className="flex-auto grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md border rounded-full mt-3 pb-1 px-4 bg-transparent hover:bg-red-800 cursor-pointer"
                            key={index}
                            onClick={() => {
                              removeSkill(skill);
                            }}
                            value={skill}
                          >
                            {skill}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-start lg:gap-4 lg:w-full lg:mt-4 w-3/4 ">
                <div className="col w-full md:w-1/3 lg:w-1/3 self-start mt-2 lg:mt-0 ">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Experience:
                  </label>
                  <input
                    type="text"
                    className="bg-transparent border border-white rounded-full w-full h-8 shrink text-white text-xl font-extralight pl-4  focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1"
                    name="experience"
                    value={ExpInput}
                    onChange={(event) => {
                      setExpInput(event.target.value);
                    }}
                    onKeyDown={handleExpChange}
                    placeholder="Ex: Abc-2-y or Abc-3-M"
                  ></input>
                </div>
                <div className="col flex w-full md:w-2/3 lg:w-2/3 mt-2 lg:mt-0 self-start grow-0 max-w-full">
                  <div className="flex flex-wrap py-6 pl-4 gap-2 w-full grow-0 flex-auto">
                    {Experience &&
                      Experience.map((Exp, index) => {
                        return (
                          <div
                            className="flex justify-center items-center grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md border rounded-full mt-3 pb-1 px-4 bg-transparent hover:bg-red-800 cursor-pointer"
                            key={index}
                            onClick={() => removeSkill(Exp)}
                            value={Exp}
                          >
                            <div className="">
                              <IoMdRemoveCircleOutline className="hidden" />
                              <span>
                                {Exp.experience + " - " + Exp.duration}
                              </span>
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
