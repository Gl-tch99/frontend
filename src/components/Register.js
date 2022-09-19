import React, { useState } from "react";
import { Skill, list } from "./Skill";

export default function Register() {
  const handleSubmit = () => {};
  const [SkillInput, setSkillInput] = useState("");
  const [Skills, setSkills] = useState(["asd", "asdfg", "asfghg"]);

  const removeSkill = (skill) => {
    setSkills((Skills) => {
      const newskills = Skills.filter((ele, index) => {
        return ele !== skill ? skill : null;
      });
      return { skills: newskills };
    });
  };

  const addSkill = () => {
    setSkills(() => {
      console.log("asdf");
      setSkills((Skills, SkillInput) => Skills.push(SkillInput));
    });
  };

  const handleSkillChange = (event) => {
    setSkillInput(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div
        className="flex-col flex-wrap justify-around
       items-center rounded-3xl h-5/6 w-5/6 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border lg:flex"
      >
        <form method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mt-8 h-full w-full">
            <div className="row flex flex-col lg:flex-row items-center justify-around lg:gap-4 lg:w-full w-3/4">
              <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                  First Name:
                </label>
                <input
                  type="text"
                  className="bg-transparent border rounded-full w-full h-8 shrink "
                ></input>
              </div>
              <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="bg-transparent border rounded-full w-full h-8 shrink "
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
                  className="bg-transparent border rounded-full w-full h-8 shrink "
                ></input>
              </div>
              <div className="col w-full lg:w-2/5 mt-2 lg:mt-0">
                <label className="text-white font-extralight text-2xl pl-4 py-4 self-start ">
                  Mobile:
                </label>
                <input
                  type="text"
                  className="bg-transparent border rounded-full w-full h-8 shrink "
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
                  className="bg-transparent border rounded-full w-full h-8 shrink "
                ></input>
              </div>
              <div className="col w-full lg:w-1/2 mt-2 lg:mt-0">
                <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                  Confirm Password:
                </label>
                <input
                  type="text"
                  className="bg-transparent border rounded-full w-full h-8 shrink "
                ></input>
              </div>
            </div>
            {/*------------------------------------------------------------------------------------------------------------*/}
            <div className="row flex flex-col lg:flex-row items-center justify-start lg:gap-4 lg:w-full lg:mt-4 w-3/4">
              <div className="col w-full lg:w-1/3 self-start mt-2 lg:mt-0">
                <label className="text-white font-extralight text-2xl pl-4 py-4 self-start">
                  Skills:
                </label>
                <input
                  type="text"
                  className="bg-transparent border rounded-full w-full h-8 shrink text-white text-2xl font-extralight pl-4"
                  name="skill"
                  value={SkillInput}
                  onChange={handleSkillChange}
                  onKeyDown={(event) => {
                    if (event.nativeEvent.key === "Enter") {
                      addSkill(Skills, SkillInput);
                    } else console.log(event.nativeEvent.key);
                  }}
                ></input>
              </div>
              <div className="col w-full lg:w-2/3">
                <div>
                  {Skills &&
                    Skills.map((skill, index) => {
                      return (
                        <div className="text-white font-extralight text-2xl">
                          {skill}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {/*------------------------------------------------------------------------------------------------------------*/}
          </div>
        </form>
      </div>
    </div>
  );
}
