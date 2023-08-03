import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Chat from "./Chat";
import PatientProfile from "./PatientProfile";
import PostsContainer from "./PostsContainer";
import ProfileNav from "./ProfileNav";

function Patient() {
  const [page, setPage] = useState("nav");
  const { appState } = useContext(appContext);
  useEffect(() => {
    if (appState.chat) {
      setPage("chat");
    }
  }, []);

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden flex flex-row items-center justify-center gap-3 lg:px-8 xl:px-16">
        <div
          className={`w-[min(1400px,100%)] h-[calc(100vh-113px)] flex ${
            page === "nav"
              ? "justify-start"
              : (page === "chat" || page === "posts") && "justify-end"
          } lg:justify-start flex-row`}
        >
          <ProfileNav page={page} setPage={setPage} />
          <div className="min-w-[100vw] w-screen px-3 sm:px-8 lg:w-full lg:min-w-[calc(100%-300px)] h-[100%] flex flex-col items-center xl:px-16">
            {page === "chat" ? (
              <Chat page={page} setPage={setPage} />
            ) : (
              <PatientProfile />
            )}
            {/* ) : (
              <div className="min-w-[min(728px,100%)] w-[min(728px,100%)] h-full flex flex-col py-6 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden">
                <button
                  className="w-full lg:hidden min-h-[32px] text-blue-500"
                  onClick={() => {
                    setPage("nav");
                  }}
                >
                  <i className="icon-24">
                    {" "}
                    <HiOutlineArrowLeft />
                  </i>
                </button>
                <PostsContainer />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
