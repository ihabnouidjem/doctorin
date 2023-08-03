import { appContext } from "@/pages/_app";
import Image from "next/image";
import React, { useContext } from "react";
import { FaCommentMedical, FaRegComments } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

function DoctorSmCard({ page, setPage, chat, doctor }) {
  const { appState, setAppState } = useContext(appContext);
  return (
    <div className="w-full flex flex-row flex-wrap items-center justify-end gap-2 sm:gap-3 ">
      <button
        className="w-full flex flex-row items-center"
        onClick={() => {
          setPage("chat");

          setAppState({
            ...appState,
            chat: {
              chatId: chat.chatId,
              id: chat.id,
              username: chat.username,
              image: chat.image,
              lastMsg: chat.lastMSG,
            },
            destChat: doctor.chat,
          });
        }}
      >
        <Image
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center object-cover"
          src={chat.image}
          alt="profile img"
          width={200}
          height={200}
        />
        <div className="w-[calc(100%-32px)] sm:w-[calc(100%-40px)] px-4 flex flex-col">
          <h6 className="w-full h6-bold text-zinc-900 text-start text-ellipsis whitespace-nowrap overflow-hidden ">
            {chat.username}
          </h6>
          <p className="w-full small-p text-zinc-800 text-start text-ellipsis whitespace-nowrap overflow-hidden ">
            {chat.lastMsg}
          </p>
        </div>
      </button>
      {/* <button className="px-4 py-2 rounded-xl border border-blue-200 text-blue-600">
        <h6 className="h6-bold">
          {appState.profile?.status === "patient"
            ? `Ne plus suivre`
            : appState.profile?.status === "doctor" && "supprimer l'abonnement"}
        </h6>
      </button> */}
      <button
        className="px-6 py-2 rounded-full bg-blue-600 text-zinc-50"
        onClick={() => {
          setPage("chat");

          setAppState({
            ...appState,
            chat: {
              chatId: chat.chatId,
              id: chat.id,
              username: chat.username,
              image: chat.image,
              lastMsg: chat.lastMSG,
            },
            destChat: doctor.chat,
          });
        }}
      >
        <h6 className="h6-bold">Consulter</h6>
      </button>
    </div>
  );
}

export default DoctorSmCard;
