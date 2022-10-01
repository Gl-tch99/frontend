import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { ImProfile } from "react-icons/im";
import Tilt from "react-parallax-tilt";
import uuid from "react-uuid";
import emailjs from "@emailjs/browser";
import Chat from "./Chat";
import { io } from "socket.io-client";

export default function Friendslist({ setChatProp }) {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [CurrentFriend, setCurrentFriend] = useState("");
  // const socket = useRef(io("ws://localhost:8900"));

  const handleSendEmail = async (event, friend) => {
    const templateparams = {
      to_email: event.target.form.email.value,
      // to_email: "varshil.17beecg023@gmail.com",
      to_name: event.target.form.firstname.value,
      from_email: User.email,
      from_name: User.firstname,
      // from_name: "varshil17beecg023@gmail.com",
      message: event.target.form.message.value,
    };

    emailjs.send(
      "service_6pkahbc",
      "template_o6ve4qe",
      templateparams,
      "LClGq2_ZXA4r4pyoM"
    );
    console.log(templateparams);
  };

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  //   });
  // }, []);

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
                    <label
                      htmlFor="my-modal-3"
                      className="modal-button w-[58%] h-full flex flex-col justify-center"
                      // className="w-[58%] h-full flex flex-col justify-center"
                      onClick={() => {
                        console.log(friend);
                        setCurrentFriend(friend);
                        // setChatProp(false);
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
                    </label>

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
                {/* ------------------------------------------------------------------------------------- */}
                <input
                  type="checkbox"
                  id="my-modal-3"
                  className="modal-toggle"
                />
                <div className="modal ">
                  <div className="modal-box relative bg-opacity-90 border">
                    <label
                      htmlFor="my-modal-3"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    {/* <div className="flex flex-col h-96 w-full rounded-2xl gap-2">
                      <div className="min-h-[90%] w-full border rounded-2xl overflow-scroll scrollbar-hide">
                        <div>asdadafsd</div>
                        <div>asdadafsd</div>
                        <div>asdadafsd</div>
                        <div>asdadafsd</div>
                        <div>asdadafsd</div>
                        <div>asdadafsd</div>
                        <div>asdadafsd</div>
                      </div>
                      <div className="w-full border rounded-2xl flex ">
                        <input className="w-3/4 border rounded-2xl m-2" />
                        <button className="border btn btn-outline btn-success rounded-full w-40 h-10">
                          Send
                        </button>
                      </div>
                    </div> */}
                    <Chat CurrFriend={CurrentFriend} />
                  </div>
                </div>
                {/* ------------------------------------------------------------------------------------- */}
                <input
                  type="checkbox"
                  id="my-modal-4"
                  className="modal-toggle"
                />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <form onSubmit={handleSendEmail}>
                      <h3 className="text-lg font-bold capitalize">
                        {friend.firstname}'s Profile
                      </h3>
                      <div>
                        <input
                          className="py-4 bg-transparent"
                          disabled="disabled"
                          value={friend.firstname}
                          name="firstname"
                        >
                          {/* First name: {friend.firstname} */}
                        </input>
                      </div>
                      <div>
                        <input
                          className="py-4 bg-transparent"
                          disabled="disabled"
                          value={friend.lastname}
                          name="lastname"
                        >
                          {/* Last name: {friend.lastname} */}
                        </input>
                      </div>
                      <div>
                        <input
                          type="text"
                          disabled="disabled"
                          className="py-2 bg-transparent"
                          value={friend.email}
                          name="email"
                        >
                          {/* Email: {friend.email} */}
                        </input>
                      </div>
                      <div className="capitalize py-4">
                        Contact {friend.firstname}
                      </div>
                      <div className="flex flex-col w-full">
                        <div>Message:</div>
                        <div>
                          <textarea
                            name="message"
                            rows={4}
                            className="w-3/4 text-lg text-white bg-transparent border rounded-2xl overflow-hidden font-extralight pl-2 pt-2 mt-2 mb-2"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="py-4 btn btn-outline btn-success w-1/4 pl-4"
                          onClick={(event) => {
                            event.preventDefault();
                            handleSendEmail(event);
                          }}
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
