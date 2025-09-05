"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCogs,
  faList,
  faSearch,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function SearchBar() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    const profiles = document.querySelector("#profiles");
    const hideMenu = document.querySelector("#hide-menu");
    const logout = document.querySelector("#logout");
    const modal = document.querySelector("#logoutModal");

    const handleProfileClick = (event: Event) => {
      event.stopPropagation();
      setIsShowMenu((prev) => !prev);
    };

    const handleClickOutside = (event: Event) => {
      if (
        isShowMenu &&
        !hideMenu?.contains(event.target as Node) &&
        !profiles?.contains(event.target as Node)
      ) {
        setIsShowMenu(false);
      }
    };

    const handleLogout = (event: Event) => {
      event.stopPropagation();
      setIsShowModal(true);
    };

    profiles?.addEventListener("click", handleProfileClick);
    document.addEventListener("click", handleClickOutside);
    logout?.addEventListener("click", handleLogout);

    return () => {
      profiles?.removeEventListener("click", handleProfileClick);
      document.removeEventListener("click", handleClickOutside);
      logout?.removeEventListener("click", handleLogout);
    };
  }, []);

  const closeModal = () => {
    setIsShowModal(false);
  };

  const confirmLogout = (event: any) => {
    event.preventDefault();
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="py-3 px-5 flex justify-between h-[9%] fixed w-4/5 bg-white mb-1">
      <section className="w-[35%] bg-white flex justify-between items-center h-[110%]">
        <input
          placeholder="search for..."
          type="text"
          className="bg-slate-200 h-full w-[90%] rounded border-none px-2 "
        />
        <button
          title="search"
          className="h-full w-[10%] border-none bg-blue-600 rounded cursor-pointer "
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{ fontSize: "15px", color: "white" }}
          />
        </button>
      </section>
      <section className="w-auto h-[130%] flex justify-between items-center">
        <div className="flex items-start w-[4vw] cursor-pointer">
          <FontAwesomeIcon
            icon={faBell}
            style={{ fontSize: "150%", color: "#979797", position: "relative" }}
          />
          <span className="absolute ml-3 bg-red-500 text-white text-xs py-0.5 px-1 rounded ">
            3+
          </span>
        </div>
        <div className="text-gray-300 h-[130%] my-2.5 text-4xl w-[3vw] text-center">
          <p>|</p>
        </div>
        <div className="items-center cursor-pointer flex" id="profiles">
          <p className="text-xl font-medium text-gray-500 relative">
            Rubi Henjaya
          </p>
          <img
            className="object-cover rounded-full max-w-10 max-h-10 ml-4 relative "
            src="/images/Defaultavatar.png"
            alt="not source"
          />

          {/* HIDE MENU START */}
          <div
            className={`bg-white absolute mt-[35vh] mr-[1vw] h-auto w-[13vw] flex-col items-center justify-between rounded cursor-default transition  ${
              isShowMenu ? "flex visible" : "hidden invisible"
            }`}
            id="hide-menu"
          >
            <div className="flex flex-col items-center justify-center h-full w-full pb-2 border-b border-slate-100">
              <div className="flex w-full h-1/2 text-lg items-center cursor-pointer py-1.5 px-5 hover:bg-slate-100 justify-start">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ fontSize: 18, color: "#ccc" }}
                />
                <span className="ml-[13%] font-medium text-gray-500">
                  Profile
                </span>
              </div>
              <div className="flex w-full h-1/2 text-lg items-center cursor-pointer py-1.5 px-5 justify-start hover:bg-slate-100">
                <FontAwesomeIcon
                  icon={faCogs}
                  style={{ fontSize: 18, color: "#ccc" }}
                />
                <span className="ml-[13%] font-medium text-gray-500">
                  Settings
                </span>
              </div>
              <div className="flex w-full h-1/2 text-lg items-center cursor-pointer py-1.5 px-5 justify-start hover:bg-slate-100">
                <FontAwesomeIcon
                  icon={faList}
                  style={{ fontSize: 18, color: "#ccc" }}
                />
                <span className="ml-[13%] font-medium text-gray-500">
                  Activity Log
                </span>
              </div>
            </div>
            <div
              className="cursor-pointer flex w-full h-1/2 text-lg items-center py-1.5 px-5 justify-start hover:bg-slate-100"
              id="logout"
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ fontSize: 18, color: "#ccc" }}
              />
              <span className="ml-[13%] font-medium text-gray-500">Logout</span>
            </div>
          </div>

          {/* HIDE MENU END */}
        </div>
      </section>

      {/* MODAL START */}

      <div
        id="logoutModal"
        className={`justify-center absolute inset-0 z-1000 w-screen h-screen overflow-auto bg-black bg-opacity-40 ${
          isShowModal ? "flex visible" : "hidden invisible"
        }`}
      >
        <div className="bg-gray-50 flex flex-col justify-between m-[3%] p-[1%] border border-gray-500 w-2/5 h-[30%] text-gray-600 ">
          <div className="h-[32%]">
            <span
              className="text-gray-400 float-right font-size text-2xl font-bold hover:text-black hover:no-underline hover:cursor-pointer focus:text-black focus:no-underline focus:cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2>Do You Want to leave?</h2>
          </div>
          <h3 className="content-center font-thin h-[32%] border-y border-gray-300 ">
            Select Logout to end your session
          </h3>
          <div className="h-[32%] flex justify-end items-end">
            <div className="flex justify-end items-end w-3/5">
              <button
                className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-blue-600 text-white border-none transition ease hover:bg-blue-700"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL END */}
    </div>
  );
}
