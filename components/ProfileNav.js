import { appContext } from "@/pages/_app";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import DoctorSmCard from "./DoctorSmCard";

function ProfileNav({ page, setPage }) {
  const { appState } = useContext(appContext);
  const [nav, setNav] = useState({ showContacts: true });

  return (
    <div className="min-w-[100vw] w-screen h-full overflow-y-scroll overflow-x-hidden u-scrollbar-hidden px-3 sm:px-8 lg:px-0 lg:min-w-[min(300px,100%)] lg:w-[min(300px,100%)]  flex flex-col gap-3 py-6">
      {appState.profile?.status === "doctor" && (
        <button
          className="group w-full flex flex-row flex-wrap items-center text-zinc-950 border-none active:border-none "
          onClick={() => {
            setPage("profile");
          }}
        >
          <h4 className="h4">Mon profile</h4>
          {/* <i className="icon-24 ml-auto">
            {" "}
            <HiOutlineArrowRight />
          </i> */}
        </button>
      )}
      {/* <button
        className="w-full flex flex-row flex-wrap items-center text-zinc-950 border-none active:border-none "
        onClick={() => {
          setPage("posts");
        }}
      >
        <h4 className="h4">
          {appState.profile?.status === "patient"
            ? "Les postes"
            : appState.profile?.status === "doctor" && "Mes postes"}
        </h4>
        
      </button> */}
      <button
        className="w-full flex flex-row flex-wrap items-center text-zinc-950 border-none active:border-none"
        onClick={() => {
          setNav({ ...nav, showContacts: !nav.showContacts });
        }}
      >
        <h4 className="h4">
          {appState.profile?.status === "patient"
            ? "Mes médecins"
            : appState.profile?.status === "doctor" && "Mes patients"}
        </h4>
        {appState.profile.chat && appState.profile.chat?.length !== 0 && (
          <i
            className={`icon-24 ml-auto transform duration-200 ${
              nav.showContacts ? "rotate-180" : "rotate-[0deg]"
            }`}
          >
            <BsChevronDown />
          </i>
        )}
      </button>
      {nav.showContacts &&
        appState.profile.chat?.map((chat, index) => {
          return (
            <DoctorSmCard
              key={index}
              page={page}
              setPage={setPage}
              chat={chat}
              doctor={appState.doctors?.filter((doctor) => {
                return doctor.id === chat.uid;
              })}
            />
          );
        })}
      {(!appState.profile.chat || appState.profile.chat?.length === 0) && (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="w-full text-center p text-zinc-800">
            {appState.profile?.status === "doctor"
              ? `Vous n'avez pas encore de patients`
              : appState.profile?.status === "patient" &&
                `Vous n'avez pas encore de médecins`}
          </p>

          <Link
            href="/"
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-zinc-50 border border-blue-600 text-zinc-50 hover:text-blue-600 transform duration-200"
          >
            <h6 className="h6">Rechercher des médecins</h6>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileNav;
