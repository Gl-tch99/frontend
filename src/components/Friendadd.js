import React, { useContext, useEffect, useState } from "react";

import {
  IoIosSearch,
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import axios from "axios";

export default function () {
  const [Search, setSearch] = useState();
  const [SearchResult, setSearchResult] = useState([]);

  useEffect(() => {
    console.log(SearchResult);
  }, [SearchResult]);

  const handleSearch = async () => {
    console.log(Search);
    await axios
      .post("http://localhost:3000/users/search", {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          Search,
        },
      })
      .then((response) => {
        console.log(response.data);
        const users = response.data;
        console.log(users);
        setSearchResult(users);
      })
      .catch((error) => console.log(error));
  };

  const handleRequest = async (friend) => {
    console.log(Search);
    await axios
      .put(`http://localhost:3000/users/sendreq`, {
        headers: {
          authorization: "Bearer " + localStorage.token,
        },
        data: {
          friend,
        },
      })
      .then((response) => {
        console.log(response.data);
        const users = response.data;
        console.log(users);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="h-full w-full flex flex-col justify-start items-center gap-2">
      <div className=" flex h-[8%]  lg:h-[12%] w-[98%] border rounded-3xl mt-2 ">
        <input
          type="text"
          className="bg-transparent text-xl font-extralight ml-4 focus:outline-none w-[75%] pb-1"
          placeholder="Search for Friends?"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        ></input>
        <button
          className=" border rounded-3xl  lg:pt-4  md:pt-6 w-40 md:w-52 lg:w-40 bg-green-900 flex justify-center"
          onClick={() => {
            handleSearch();
          }}
        >
          <IoIosSearch size="30" />
        </button>
      </div>
      <div className="h-[83%] w-[98%] rounded-3xl overflow-scroll scrollbar-hide justify-center flex">
        {SearchResult !== 0
          ? SearchResult.map((sres, index) => {
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
                          {sres.firstname}
                        </h2>
                      </div>
                      <div>
                        <p className="text-white font-extralight justify-center items-center text-start pl-8">
                          {sres.lastname}
                        </p>
                      </div>
                    </div>
                    <div className="flex-row flex justify-center items-center gap-2 w-[42%] h-full">
                      <button
                        className="btn btn-primary z-10"
                        onClick={() => {
                          handleRequest(sres);
                        }}
                      >
                        <IoIosAddCircleOutline size="30" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
