import React from "react";
import { HiHome } from "react-icons/hi";
import { AiOutlineCode } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <>
      <nav className="flex absolute bg-black bg-opacity-20 py-3 px-7 border rounded-full bottom-8 gap-7 left-1/2 -translate-x-1/2 backdrop-blur-lg w-max h-max md:gap-20 md:px-9 lg:hidden z-50">
        <Link
          id="/"
          to="/"
          className="bg-transparent p-4 border rounded-full flex text-2xl text-white hover:text-black hover:bg-white duration-200 md:p-6 md:text-2xl"
        >
          <HiHome className="" />
        </Link>
        <Link
          id="projects"
          to="/projects"
          className="bg-transparent p-4 border rounded-full flex text-2xl text-white hover:text-black hover:bg-white duration-200 md:p-6 md:text-2xl"
        >
          <AiOutlineCode className="" />
        </Link>
        <Link
          id="friends"
          to="/friends"
          className="bg-transparent p-4 border rounded-full flex text-2xl text-white hover:text-black hover:bg-white duration-200 md:p-6 md:text-2xl"
        >
          <FaUserFriends className="" />
        </Link>
        <Link
          id="profile"
          to="/profile"
          className="bg-transparent p-4 border rounded-full flex text-2xl text-white hover:text-black hover:bg-white duration-200 md:p-6 md:text-2xl"
        >
          <HiUser className="" />
        </Link>
      </nav>
    </>
  );
}
