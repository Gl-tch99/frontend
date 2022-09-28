import React, { useContext } from "react";
import { UserContext } from "../App";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { ImProfile } from "react-icons/im";
import Tilt from "react-parallax-tilt";
import uuid from "react-uuid";

export default function Friendslist() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  return (
    <>
      {User.friends !== 0
        ? User.friends.map((friend, index) => {
            return (
              <React.Fragment key={uuid()}>
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={1}
                  perspective={2500}
                  tiltMaxAngleY={15}
                  tiltMaxAngleX={15}
                  className=" w-[93%] bg-transparent border text-neutral-content h-[20%] felx justify-center items-center cursor-pointer rounded-2xl min-h-[20%] overflow-hidden"
                >
                  <div className=" flex flex-row w-full h-full mb-4">
                    <div
                      className="w-[58%] h-full flex flex-col justify-center"
                      onClick={() => {
                        console.log(friend);
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
                    <div className="flex-row flex justify-end items-center gap-2 w-[42%] h-full mr-4">
                      <label
                        htmlFor="my-modal-4"
                        className="btn modal-button"
                        value={friend}
                      >
                        <ImProfile size={20} />
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
                </Tilt>
                <input
                  type="checkbox"
                  id="my-modal-4"
                  className="modal-toggle"
                />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <h3 className="text-lg font-bold capitalize">
                      {friend.firstname}'s Profile
                    </h3>
                    <div>
                      <p className="py-4">First name: {friend.firstname}</p>
                    </div>
                    <div>
                      <p className="py-4">Last name: {friend.lastname}</p>
                    </div>
                    <div>
                      <p className="py-4">Email: {friend.email}</p>
                    </div>
                    <div className="capitalize py-4">
                      Contact {friend.firstname}
                    </div>
                    <form>
                      <div className="flex flex-col w-full ">
                        <div>Message:</div>
                        <div>
                          <textarea
                            rows={4}
                            className="w-3/4 text-lg text-white bg-transparent border rounded-2xl overflow-hidden font-extralight pl-2 pt-2 mt-2 mb-2"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="py-4 btn btn-outline btn-success w-1/4 pl-4"
                        >
                          Send Email
                        </button>
                      </div>
                    </form>
                  </label>
                </label>
              </React.Fragment>
            );
          })
        : ""}
    </>
  );
}
