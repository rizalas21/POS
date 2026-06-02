"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCogs,
  faList,
  faSearch,
  faSignOutAlt,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { useGoodsStore } from "@/stores/goodsStore";
import Link from "next/link";

export default function Navbar() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const { data, status } = useSession();
  const [isShowNotif, setIsShowNotif] = useState(false);
  const { getGoods, goods } = useGoodsStore();
  const router = useRouter();

  const profileRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  const [isShowSearch, setIsShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [resultSearch, setResultSearch] = useState({});

  useEffect(() => {
    if (status === "authenticated" && data?.user?.email) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/me/${data?.user?.email}`);
          if (!response) return signOut({ redirect: true, callbackUrl: "/" });
          await sessionStorage.setItem("user", response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
      getGoods({ keyword: "", sortBy: "", sort: "asc", page: 1, limit: 3 });
    }
  }, [data, status]);

  useEffect(() => {
    const logout = document.querySelector("#logout");
    const notif = document.querySelector("#notif");
    const search = document.querySelector("#search");

    const handleClickOutside = (event: Event) => {
      if (isShowMenu && !profileRef?.current?.contains(event.target as Node)) {
        setIsShowMenu(false);
      }
      if (isShowNotif && !notif?.contains(event.target as Node)) {
        setIsShowNotif(false);
      }
      if (isShowSearch && !search?.contains(event.target as Node)) {
        setIsShowSearch(false);
      }
    };

    const handleLogout = (event: Event) => {
      event.stopPropagation();
      setIsShowModal(true);
    };

    document.addEventListener("click", handleClickOutside);
    logout?.addEventListener("click", handleLogout);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      logout?.removeEventListener("click", handleLogout);
    };
  }, [isShowMenu, isShowNotif, isShowSearch]);

  useEffect(() => {
    if (!keyword) return;

    const fetchSearch = async () => {
      const { data } = await axios.get("/api/search", { params: { keyword } });
      setResultSearch(data);
    };

    fetchSearch();
  }, [keyword]);

  const closeModal = () => {
    setIsShowModal(false);
  };

  const confirmLogout = (event: any) => {
    event.preventDefault();
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const goodsFiltered = goods.filter((item) => item.stock <= 5);
  const searchFiltered = Object.fromEntries(
    Object.entries(resultSearch).filter(
      ([key, value]) => (value as any)?.item.length > 0,
    ),
  );
  return (
    <section
      className={`flex py-3 px-5 justify-between h-[9%] fixed w-4/5 bg-white`}
    >
      <section
        className="w-[35%] bg-white flex justify-between items-center h-[110%]"
        id="search"
      >
        <input
          placeholder="search for..."
          type="text"
          className="bg-slate-200 text-slate-900 h-full w-[90%] rounded border-none px-2 "
          onChange={(e) => {
            setKeyword(e.target.value);
            setIsShowSearch(true);
          }}
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

        {isShowSearch && keyword?.length > 0 && (
          <div className="p-2 text-slate-900 bg-slate-50 absolute top-full mr-5 left-5 w-[30%]">
            {Object.values(searchFiltered)
              .filter((val: any) => val?.item?.length > 0)
              .map((val: any) => (
                <div
                  key={val.name}
                  className="mb-2 border-b pb-2 last:border-none"
                >
                  <h3 className="text-xs font-bold text-gray-500 uppercase">
                    {val.name}
                  </h3>

                  {val.item.map((item: any, index: number) => (
                    <Link
                      href={`/${val.name}/${val.name === "goods" ? item.barcode : val.name === "customers" ? item.customerid : item.invoice}`}
                      key={`${val.name}-${index}`}
                      className="flex flex-col px-3 py-2 text-sm hover:bg-slate-200 rounded"
                    >
                      {val.name === "goods" && (
                        <>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.barcode}
                          </p>
                        </>
                      )}

                      {val.name === "customers" && (
                        <>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.phone}</p>
                        </>
                      )}

                      {val.name === "sales" && (
                        <p className="font-medium">{item.invoice}</p>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            {!Object.values(searchFiltered)?.length && (
              <p className="text-xs font-bold text-gray-500 uppercase">
                Nothings Founded
              </p>
            )}
          </div>
        )}
      </section>
      <section className="w-auto h-[130%] flex justify-between items-center">
        <div
          className="flex items-start w-[4vw] cursor-pointer relative"
          id="notif"
          onClick={() => setIsShowNotif(!isShowNotif)}
        >
          <FontAwesomeIcon
            icon={faBell}
            style={{ fontSize: "150%", color: "#979797" }}
          />
          {goods.filter((item) => item.stock <= 5).length > 0 ? (
            <span className="absolute ml-3 bg-red-500 text-white text-xs py-0.5 px-1 rounded">
              {goods.filter((item) => item.stock <= 5).length}+
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="text-gray-300 h-[130%] my-2.5 text-4xl w-[3vw] text-center">
          <p>|</p>
        </div>
        <div
          ref={profileRef}
          className="items-center cursor-pointer flex"
          id="profiles"
          onClick={(e) => {
            e.stopPropagation();
            setIsShowMenu((prev) => !prev);
          }}
        >
          <p className="text-xl font-medium text-gray-500 relative">
            {data?.user ? data.user.name : "User"}
          </p>
          <img
            className="object-cover rounded-full max-w-10 max-h-10 ml-4 relative "
            src="/images/Defaultavatar.png"
            alt="not source"
          />

          <div
            className={`bg-white absolute mt-[30vh] mr-5 right-0 h-auto w-[18vw] flex-col items-center justify-between rounded cursor-default transition  ${
              isShowMenu ? "flex visible" : "hidden invisible"
            }`}
            id="hide-menu"
          >
            <div className="flex flex-col items-center justify-center h-full w-full pb-2 border-b border-slate-100">
              <Link
                href={`/profile`}
                className="flex w-full h-1/2 items-center cursor-pointer py-1.5 px-5 hover:bg-slate-100 justify-start"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ fontSize: 18, color: "#ccc" }}
                />
                <span className="ml-[13%] font-medium text-gray-500">
                  Profile
                </span>
              </Link>
              <Link
                href={`/change-password`}
                className="flex w-full h-1/2 items-center cursor-pointer py-1.5 px-5 justify-start hover:bg-slate-100"
              >
                <FontAwesomeIcon
                  icon={faList}
                  style={{ fontSize: 18, color: "#ccc" }}
                />
                <span className="ml-[13%] font-medium text-gray-500">
                  Change Password
                </span>
              </Link>
            </div>
            <div
              className="cursor-pointer flex w-full h-1/2 items-center py-1.5 px-5 justify-start hover:bg-slate-100"
              id="logout"
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ fontSize: 18, color: "#ccc" }}
              />
              <span className="ml-[13%] font-medium text-gray-500">Logout</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL START */}

      <div
        id="logoutModal"
        className={`justify-center fixed inset-0 z-100 w-screen h-screen overflow-auto bg-gray-900/50 ${
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

      {/* NOTIFICATION MODAL START */}

      {isShowNotif && (
        <div className="absolute right-50 top-15 w-[320px] bg-white shadow-lg rounded overflow-hidden z-50 text-slate-900/50">
          <div className="bg-blue-600 text-white px-4 py-2 font-semibold">
            ALERTS CENTER
          </div>

          {!goodsFiltered.length ? (
            <p className="p-2 text-center text-lg">No Alerts</p>
          ) : (
            <div className="max-h-[300px] overflow-y-auto">
              {goodsFiltered.map((item) => (
                <div
                  className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-100 cursor-pointer"
                  key={item.barcode}
                  onClick={() => {
                    router.replace("/purchases/add");
                    setIsShowNotif(false);
                  }}
                >
                  <div className="bg-yellow-400 text-white rounded-full p-3">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      style={{ fontSize: 18, color: "#ffffff" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      Barcode: {item.barcode}
                    </p>
                    <div className="text-sm">
                      <p className="">
                        Stock Alert:{" "}
                        <span className="font-semibold">{item.name}</span>
                      </p>
                      {"  "}
                      <p>
                        only have stock{" "}
                        <span className="font-bold">{item.stock}</span>.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NOTIFICATION MODAL END */}
    </section>
  );
}
