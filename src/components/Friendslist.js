import React, { useContext } from "react";
import { UserContext } from "../App";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { ImProfile } from "react-icons/im";

export default function Friendslist() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  return (
    <>
      {User.friends !== 0
        ? User.friends.map((friend, index) => {
            return (
              <div
                className=" w-[93%] bg-transparent border text-neutral-content h-[20%] felx justify-center items-center cursor-pointer rounded-2xl"
                key={index}
              >
                <div className=" flex flex-row w-full h-full">
                  <div
                    className="w-[58%] h-full flex flex-col justify-center"
                    onClick={() => {
                      console.log("body");
                    }}
                  >
                    <div>
                      <h2 className="card-title justify-start pl-8 text-white font-extralight ">
                        {friend.firstname + " " + friend.lastname}
                      </h2>
                    </div>
                    <div>
                      <p className="text-white font-extralight justify-center items-center text-start pl-8">
                        {friend.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex-row flex justify-end items-center gap-2 w-[42%] h-full">
                    <label
                      htmlFor="my-modal-4"
                      className="btn modal-button btn-md btn-outline btn-success mr-6"
                    >
                      <ImProfile size="28" />
                    </label>

                    <input
                      type="checkbox"
                      id="my-modal-4"
                      className="modal-toggle"
                    />
                    <label
                      htmlFor="my-modal-4"
                      className="modal cursor-pointer"
                    >
                      <label className="modal-box relative" for="">
                        <h3 className="text-lg font-bold"></h3>
                        <p className="py-4">
                          You've been selected for a chance to get one year of
                          subscription to use Wikipedia for free!
                        </p>
                      </label>
                    </label>
                    {/* <button
                      className="btn btn-ghost z-10"
                      onClick={() => {
                        console.log("button 2");
                      }}
                    >
                      <IoIosCloseCircleOutline size="30" />
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </>
  );
}
