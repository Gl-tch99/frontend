import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import uuid from "react-uuid";
import { io } from "socket.io-client";

export default function Chat({ CurrFriend }) {
  const { LoggedIn, setLoggedIn, User, setUser } = useContext(UserContext);
  const [Messages, setMessages] = useState([]);
  const [Msg, setMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("ws://localhost:8900"));
  // }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3000/messages/getmsg", {
        from: User.userid,
        to: CurrFriend.userid,
      })
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      });
  }, [CurrFriend]);

  const handleSendMessage = async (message) => {
    if (Msg.length > 0) {
      // socket.current.emit("send-msg", {
      //   to: CurrFriend.userid,
      //   from: User.userid,
      //   Msg,
      // });
      await axios.post("http://localhost:3000/messages/addmsg", {
        from: User.userid,
        to: CurrFriend.userid,
        message: Msg,
      });
      const msgs = [...Messages];
      msgs.push({ fromSelf: true, message: Msg });
      setMessages(msgs);
      setMsg("");
    } else {
    }
  };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  return (
    <div>
      <div className="flex flex-col h-96 w-full rounded-2xl gap-2">
        <div className="h-[10%] w-full text-white capitalize ml-4 text-3xl font-extralight">
          {CurrFriend.firstname}
        </div>
        <div className="min-h-[78%] w-full border rounded-2xl overflow-scroll scrollbar-hide flex flex-col gap-2 p-3">
          {Messages.map((message) => {
            return (
              <div
                key={uuid()}
                className={`${
                  message.fromSelf
                    ? "flex justify-end w-full "
                    : "flex justify-start w-full "
                }`}
              >
                <div
                  className={`${
                    message.fromSelf
                      ? "mr-2 bg-green-800 w-max text-white p-2 rounded-xl font-extralight px-3"
                      : "ml-2 bg-black w-max text-white p-2 rounded-xl font-extralight px-3"
                  }`}
                >
                  <div className="content ">
                    <p>
                      {message.message}
                      {message.fromSelf}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full border rounded-full flex min-h-[10%] grow">
          <textarea
            className="w-[80%] border-none rounded-2xl pl-4 bg-transparent min-h-fit outline-none grow pt-1 scrollbar-hide pr-2"
            name="message"
            value={Msg}
            onChange={(event) => {
              setMsg(event.target.value);
            }}
          />
          <button
            className="border btn-outline btn-success rounded-full w-[20%] h-full"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
