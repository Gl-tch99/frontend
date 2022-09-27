import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default function Friendreq({ handleRerender }) {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [value, setValue] = useLocalStorage("User");

  const handleAcceptReq = async (friend) => {
    console.log("frnds:");
    console.log(friend);
    await axios
      .put("http://localhost:3000/users/acceptreq", {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          friend,
        },
      })
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
      })
      .catch((error) => console.log(error));
  };

  const handleRejectReq = async (friend) => {
    await axios
      .put("http://localhost:3000/users/rejectreq", {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          friend,
        },
      })
      .then((res) => {
        console.log(res.data);
        const token = res.data.token;
        localStorage.setItem("token", token);
        // setValue(user);
        // setUser(user);
      })
      .catch((error) => console.log(error));
  };

  const addFriend = async (friend) => {
    await axios
      .put("http://localhost:3000/users/addfriend", {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          friend,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("User");
    console.log(User);
  }, [User.friendsreq]);
  return (
    <>
      {User.friendsreq !== 0
        ? User.friendsreq.map((friend, index) => {
            return (
              <div
                className=" w-[93%] bg-transparent border text-neutral-content h-[20%] flex justify-center items-center cursor-pointer rounded-2xl"
                key={index}
              >
                <div className=" flex flex-row w-full h-full">
                  <div className="w-[58%] h-full flex flex-col justify-center">
                    <div>
                      <h2 className="card-title justify-start pl-8 text-white font-extralight ">
                        {friend.lastname}
                      </h2>
                    </div>
                    <div>
                      <p className="text-white font-extralight justify-center items-center text-start pl-8">
                        Accept / Deny?
                      </p>
                    </div>
                  </div>
                  <div className="flex-row flex justify-center items-center gap-2 w-[42%] h-full">
                    <button
                      className="btn btn-primary z-10"
                      onClick={() => {
                        handleAcceptReq(friend);
                        handleRejectReq(friend);
                        addFriend(friend);
                        handleRerender();
                      }}
                    >
                      <IoIosCheckmarkCircleOutline size="30" />
                    </button>
                    <button
                      className="btn btn-ghost z-10"
                      onClick={() => {
                        handleRejectReq(friend);
                        handleRerender();
                      }}
                    >
                      <IoIosCloseCircleOutline size="30" />
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
