import React from "react";

export default function Chat({ CurrFriend }) {
  return (
    <div>
      <div className="flex flex-col h-96 w-full rounded-2xl gap-2">
        <div className="h-[10%] w-full text-white capitalize ml-4 text-3xl font-extralight">
          {CurrFriend.firstname}
        </div>
        <div className="min-h-[78%] w-full border rounded-2xl overflow-scroll scrollbar-hide">
          <div>asdadafsd</div>
          <div>asdadafsd</div>
          <div>asdadafsd</div>
          <div>asdadafsd</div>
          <div>asdadafsd</div>
          <div>asdadafsd</div>
          <div>asdadafsd</div>
        </div>
        <div className="w-full border rounded-full flex min-h-[10%] grow">
          <textarea className="w-[80%] border-none rounded-2xl pl-4 bg-transparent min-h-fit outline-none grow pt-1" />
          <button className="border btn-outline btn-success rounded-full w-[20%] h-full">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
