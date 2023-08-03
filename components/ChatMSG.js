import { appContext } from "@/pages/_app";
import Image from "next/image";
import React, { useContext } from "react";

function ChatMSG({ msg }) {
  const { appState } = useContext(appContext);
  return (
    <div
      className={`w-full flex flex-row gap-2 sm:gap-4 p-2 ${
        msg.uid === appState.profile?.id && "justify-end"
      }`}
    >
      {msg.uid === appState.profile?.id ? (
        <>
          <div className=" max-w-[calc(90%-48px)] bg-zinc-800 sm:max-w-[calc(90%-56px)] flex flex-col p-2 rounded-xl">
            <p className="w-full p text-zinc-50">{msg.text}</p>
          </div>
          <Image
            className="w-8 h-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center object-cover"
            src={msg?.uimage}
            alt="profile img"
            width={200}
            height={200}
          />
        </>
      ) : (
        <>
          <Image
            className="w-8 h-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center object-cover"
            src={msg?.uimage}
            alt="profile img"
            width={200}
            height={200}
          />
          <div className=" max-w-[calc(90%-48px)] sm:max-w-[calc(90%-56px)] border border-zinc-200 flex flex-col p-2 rounded-xl">
            <p className="w-full p text-zinc-800">{msg.text}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMSG;
