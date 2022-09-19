import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Register() {
  const [SkillInput, setSkillInput] = useState("");
  const [Skills, setSkills] = useState([]);
  const [ExpInput, setExpInput] = useState("");
  const [Experience, setExperience] = useState([]);
  const [User, setUser] = useState({
    userid: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    mobile: "",
    skillsets: [],
    experience: [],
    description: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleChange = (event) => {
    setUser((User) => ({
      ...User,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitData = (event) => {
    alert(User);
    event.preventDefault();
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

  // const removeSkill = (skill) => {
  //   setSkills((Skills) => {
  //     [...Skills].filter((ele) => ele !== skill);
  //     // console.log(newskills);
  //   });
  //   console.log(Skills);
  // };

  const handleSkillChange = (event) => {
    setSkillInput(event.target.value);
  };

  const handleExpChange = (event) => {
    if (event.nativeEvent.key === "Enter") {
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
      } else setExpInput("");
      setExpInput("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div
        className="flex flex-col flex-wrap 
       items-center rounded-3xl h-5/6 w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex overflow-scroll md:overflow-auto scrollbar-hide"
      >
        <div className="h-3/4 w-3/4 mt-2 ">
          <form onSubmit={handleSubmit(handleSubmitData)}>
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
                      errors.firstName &&
                      (errors.firstName
                        ? "ring ring-red-800 border-0 outline-none border-red-800"
                        : "ring ring-green-500 border-0 outline-none border-red-800")
                    }}`}
                    placeholder={`${
                      errors.firstName && errors.firstName
                        ? errors.firstName.type === "required"
                          ? "Required"
                          : ""
                        : ""
                    }`}
                    name="firstname"
                    {...register("firstName", { required: true })}
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
                      errors.lastName &&
                      (errors.lastName
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      errors.lastName && errors.lastName
                        ? errors.lastName.type === "required"
                          ? "Required"
                          : ""
                        : ""
                    }`}
                    name="lastname"
                    {...register("lastName", { required: true })}
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
                      errors.email &&
                      (errors.email
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      errors.email && errors.email
                        ? errors.email.type === "required"
                          ? "Required"
                          : ""
                        : ""
                    }`}
                    name="email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
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
                      errors.email &&
                      (errors.email
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      errors.email && errors.email
                        ? errors.email.type === "required"
                          ? "Required"
                          : ""
                        : ""
                    }`}
                    name="mobile"
                    {...register("mobile", {
                      required: true,
                      pattern: /^([987]{1})(\d{9})$/,
                    })}
                  ></input>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Password:
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1 text-white text-xl font-extralight pl-4 
                    ${
                      errors.password &&
                      (errors.password
                        ? "ring ring-red-800 border-0 outline-none "
                        : "ring ring-green-500 border-0 outline-none ")
                    }}`}
                    placeholder={`${
                      errors.password && errors.password
                        ? errors.password.type === "required"
                          ? "Required"
                          : ""
                        : ""
                    }`}
                    name="password"
                    {...register("password", { required: true })}
                  ></input>
                </div>
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                    Confirm Password:
                  </label>
                  <input
                    type="text"
                    className="bg-transparent border rounded-full w-full h-8 shrink focus:outline-none focus:ring focus:border-blue-500 focus:border-0 mt-2 pb-1"
                    name="confirmpassword"
                    {...register("confirmpassword", { required: true })}
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
                    className="block p-2 w-full bg-transparent border border-white rounded-xl mt-2 text-white text-xl font-extralight pb-1"
                    name="description"
                    {...register("description", { required: true })}
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
                    onChange={handleSkillChange}
                    onKeyDown={(event) => {
                      if (event.nativeEvent.key === "Enter") {
                        setSkills([...Skills, SkillInput]);
                        setSkillInput("");
                      }
                    }}
                  ></input>
                </div>
                <div className="col flex w-full md:w-2/3 lg:w-2/3 mt-2 lg:mt-0 self-start grow-0 max-w-full">
                  <div className="flex flex-wrap py-6 pl-4 gap-2 w-full grow-0 flex-auto">
                    {Skills &&
                      Skills.map((skill, index) => {
                        return (
                          <div
                            className="flex-auto grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md border rounded-full mt-3 py-0.5 px-4 bg-blue-700 hover:bg-red-800 cursor-pointer"
                            key={index}
                            // onClick={removeSkill(skill)}
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
                    name="skill"
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
                            className="flex-auto grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md border rounded-full mt-3 py-0.5 px-4 bg-blue-700 hover:bg-red-800 cursor-pointer"
                            key={index}
                            // onClick={removeSkill(skill)}
                            value={Exp}
                          >
                            {Exp.experience + "-" + Exp.duration}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-full mt-2 lg:mt-0">
                  <button
                    type="submit"
                    className="bg-green-900 rounded-full mt-4 text-white font-extralight text-2xl py-2 px-5 pb-3"
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
