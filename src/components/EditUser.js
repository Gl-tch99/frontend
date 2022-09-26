import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export default function EditUser() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [Edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [SkillInput, setSkillInput] = useState("");
  const [checkPass, setcheckPass] = useState("");
  const [ExpInput, setExpInput] = useState("");
  const [Cpass, setCpass] = useState("");
  const [EditedUser, setEditedUser] = useState({
    firstname: User.firstname,
    lastname: User.lastname,
    email: User.email,
    password: "",
    mobile: User.mobile,
    skillsets: User.skillsets,
    experience: User.experience,
    description: User.description,
  });
  const [Errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    confirmpassword: false,
    mobile: false,
    description: false,
    firstnametouched: false,
    lastnametouched: false,
    emailtouched: false,
    passwordtouched: false,
    confirmpasswordtouched: false,
    mobiletouched: false,
    descriptiontouched: false,
  });

  const handleChange = (event) => {
    setEditedUser((User) => ({
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
            firstnametouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            firstnametouched: true,
          });
        break;
      }
      case "lastname": {
        if (value === "")
          setErrors({
            ...Errors,
            [field]: true,
            lastnametouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            lastnametouched: true,
          });
        break;
      }
      case "email": {
        if (
          value === "" ||
          !value.match(/^([A-z0-9]+)*(@\w+)*([.com, .org])+$/)
        )
          setErrors({
            ...Errors,
            [field]: true,
            emailtouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            emailtouched: true,
          });
        break;
      }
      case "password": {
        if (value === "" || value.length < 8 || value.length > 36)
          setErrors({
            ...Errors,
            [field]: true,
            passwordtouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            passwordtouched: true,
          });
        break;
      }
      case "confirmpassword": {
        if (value !== EditedUser.password)
          setErrors({
            ...Errors,
            [field]: true,
            confirmpasswordtouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            confirmpasswordtouched: true,
          });
        break;
      }
      case "mobile": {
        if (value === "" || !value.match(/^([987])(\d{9})$/))
          setErrors({
            ...Errors,
            [field]: true,
            mobiletouched: true,
          });
        else
          setErrors({
            ...Errors,
            [field]: false,
            mobiletouched: true,
          });
        break;
      }
      case "description": {
        if (value === "" || value < 5)
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
      default:
        break;
    }
  };

  const handleSubmitData = async (event) => {
    // alert(User);
    event.preventDefault();
    // console.log(User);
    await axios
      .put(`http://localhost:3000/users/update/${User.userid}`, {
        data: {
          EditedUser,
        },
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        setUser(res.data.data);
        console.log(res.data.token);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeSkill = (skill) => {
    const newskills = EditedUser.skillsets.filter((ele, index) => {
      return ele !== skill;
    });
    setEditedUser({
      ...EditedUser,
      skillsets: newskills,
    });
  };

  const removeExp = (exp) => {
    const newexp = EditedUser.experience.filter((ele, index) => {
      return ele !== exp;
    });
    setEditedUser({
      ...EditedUser,
      experience: newexp,
    });
  };

  const handleExpChange = (event) => {
    if (event.nativeEvent.key === "Enter" && ExpInput !== "") {
      event.preventDefault();
      const data = event.target.value.toString().split("-");
      if (data.length === 3) {
        setEditedUser({
          ...EditedUser,
          experience: [
            ...EditedUser.experience,
            {
              experience: data[0],
              duration:
                data[2] === "y" || data[2] === "Y"
                  ? data[1] + " Years"
                  : data[2] === "m" || data[2] === "M"
                  ? data[1] + " Months"
                  : "Invalid Duration.",
            },
          ],
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
      setEditedUser({
        ...EditedUser,
        skillsets: [...EditedUser.skillsets, SkillInput],
      });
      setSkillInput("");
      // console.log(User);
    } else if (event.nativeEvent.key === "Enter" && SkillInput === "")
      event.preventDefault();
  };

  return (
    <div className="flex justify-center items-start h-screen w-screen lg:items-center">
      <div
        className="flex flex-col flex-wrap 
       items-center rounded-3xl h-[78%] w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex overflow-x-hidden md:overflow-x-hidden scrollbar-hide lg:h-5/6 lg:mt-20 md:h-4/5 sm:mt-10 md:mt-10 relative "
      >
        <div className="absolute top-0 right-0 m-8">
          <Link to={"/"} className="btn btn-circle btn-outline ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        <div className="h-3/4 w-3/4 mt-2 items-center ">
          <form>
            <div className="flex flex-col items-center justify-center h-full w-full mt-12">
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
                    value={EditedUser.firstname}
                    onBlur={validate}
                    disabled={Edit ? "" : "disabled"}
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
                      Errors.lastname && EditedUser.lastname === ""
                        ? "Required"
                        : ""
                    }`}
                    name="lastname"
                    onChange={handleChange}
                    value={EditedUser.lastname}
                    onBlur={validate}
                    disabled={Edit ? "" : "disabled"}
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
                      Errors.email && EditedUser.email === "" ? "Required" : ""
                    }`}
                    name="email"
                    onChange={handleChange}
                    value={EditedUser.email}
                    onBlur={validate}
                    disabled={Edit ? "" : "disabled"}
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
                      Errors.mobile && EditedUser.mobile === ""
                        ? "Required"
                        : ""
                    }`}
                    name="mobile"
                    onChange={handleChange}
                    value={EditedUser.mobile}
                    onBlur={validate}
                    disabled={Edit ? "" : "disabled"}
                  ></input>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full lg:mt-4 w-3/4">
                <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                  <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                    Password:
                    {`${
                      Errors.password && EditedUser.password !== ""
                        ? EditedUser.password.length < 8 ||
                          EditedUser.password.length > 36
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
                    }`}
                    placeholder={`${
                      Errors.password && EditedUser.password === ""
                        ? "Required"
                        : ""
                    }`}
                    name="password"
                    onChange={handleChange}
                    value={EditedUser.password}
                    onBlur={validate}
                    disabled={Edit ? "" : "disabled"}
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
                      Errors.confirmpassword &&
                      EditedUser.confirmpassword === ""
                        ? "Required"
                        : ""
                    }`}
                    name="confirmpassword"
                    onChange={(event) => {
                      setCpass(event.target.value);
                    }}
                    value={Cpass}
                    onBlur={validate}
                    disabled={Edit ? "" : "disabled"}
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
                      Errors.description && EditedUser.description === ""
                        ? "Required"
                        : ""
                    }`}
                    name="description"
                    onChange={handleChange}
                    value={EditedUser.description}
                    onBlur={validate}
                    disabled={Edit ? "" : "disabled"}
                  ></textarea>
                </div>
              </div>
              {/*------------------------------------------------------------------------------------------------------------*/}
              <div className="row flex flex-col lg:flex-row items-center justify-start lg:gap-4 lg:w-full lg:mt-4 w-3/4 ">
                <div className="col w-full md:w-full lg:w-1/3 self-start mt-2 lg:mt-0 ">
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
                    disabled={Edit ? "" : "disabled"}
                  ></input>
                </div>
                <div className="col flex w-full md:w-full lg:w-2/3 mt-2 lg:mt-0 self-start grow-0 max-w-full md:mb-2">
                  <div className="flex flex-wrap  lg:pt-6 pl-4 gap-2 w-full grow-0 flex-auto md:self-start">
                    {EditedUser.skillsets &&
                      EditedUser.skillsets.map((skill, index) => {
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
                <div className="col w-full md:w-full lg:w-1/3 self-start mt-2 lg:mt-0 ">
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
                    disabled={Edit ? "" : "disabled"}
                  ></input>
                </div>
                <div className="col flex w-full md:w-2/3 lg:w-2/3 mt-2 lg:mt-0 self-start grow-0 max-w-full">
                  <div className="flex flex-wrap py-6 pl-4 gap-2 w-full grow-0 flex-auto">
                    {EditedUser.experience &&
                      EditedUser.experience.map((Exp, index) => {
                        return (
                          <div
                            className="flex justify-center items-center grow-0 text-white font-extralight text-2xl bg-clip-padding backdrop-filter backdrop-blur-md border rounded-full  lg:mt-3 md:mt-1 pb-1 px-4 py-1 bg-transparent hover:bg-red-800 cursor-pointer relative"
                            key={index}
                            onClick={() => {
                              removeExp();
                            }}
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
                  {Edit ? (
                    <button
                      type="submit"
                      className="btn btn-outline btn-success rounded-full mt-4 text-white font-extralight text-2xl py-2 px-5 pb-3"
                      disabled={
                        Errors.firstname ||
                        Errors.lastname ||
                        Errors.email ||
                        Errors.mobile ||
                        Errors.password ||
                        Errors.description
                          ? true
                          : Errors.firstnametouched ||
                            Errors.lastnametouched ||
                            Errors.emailtouched ||
                            Errors.passwordtouched ||
                            Errors.confirmpasswordtouched ||
                            Errors.mobiletouched ||
                            Errors.descriptiontouched
                          ? false
                          : true
                      }
                      onClick={handleSubmitData}
                    >
                      Update
                    </button>
                  ) : (
                    <div className="flex justify-start gap-4">
                      <button
                        onClick={() => {
                          setEdit(true);
                        }}
                        className="btn btn-outline btn-success rounded-full mt-4 text-white font-extralight text-2xl py-2 px-5 pb-3"
                      >
                        Edit
                      </button>
                    </div>
                  )}
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
