import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default function Friendreq() {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [value, setValue] = useLocalStorage("User");

  const handleAcceptReq = async (friend) => {
    const user = User;
    console.log("frnds:" + user);
    console.log(user);
    const frnds = user.friends;
    frnds.push({
      lastname: friend.lastname,
      firstname: friend.firstname,
      skillsets: friend.skillsets,
      email: friend.email,
      userid: friend.userid,
    });
    console.log(frnds);
    const frndsreq = user.friendsreq.filter((ele) => {
      return ele !== friend;
    });

    await axios
      .patch(`http://localhost:3000/users/acceptreq`, {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          user,
          frnds,
          frndsreq,
        },
      })
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        setValue(user);
        setUser(user);
        // const users = response.data;
        // setUser(users);
        // console.log(users);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("User");
    console.log(User);
  }, [User.friendsreq]);
  return (
    <>
      {User.friends !== 0
        ? User.friendsreq.map((friend, index) => {
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
                      }}
                    >
                      <IoIosCheckmarkCircleOutline size="30" />
                    </button>
                    <button
                      className="btn btn-ghost z-10"
                      onClick={() => {
                        console.log("button 2");
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
