import { appContext } from "@/pages/_app";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import ChatMSG from "./ChatMSG";

function Chat({ page, setPage }) {
  const { appState, setAppState, sendMessage, sendMessageNew } =
    useContext(appContext);
  const [chat, setChat] = useState({
    messages: [],
    newMessage: {
      uname: appState.profile.name,
      uid: appState.profile.id,
      uimage: appState.profile.image,
      text: "",
    },
  });

  const chatInputRef = useRef(null);

  useEffect(() => {
    setChat({
      newMessage: {
        uname: appState.profile.name,
        uid: appState.profile.id,
        uimage: appState.profile.image,
      },
    });
  }, [appState.profile]);

  useEffect(() => {
    if (appState.chat?.chatId)
      axios
        .get(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.DOMAIN
              : process.env.NODE_ENV === "development" &&
                "http://localhost:3000"
          }/api/chat/${appState.chat.chatId}`
        )
        .then((res) => {
          setAppState({
            ...appState,
            messages: res.data?.messages,
          });
        });
  }, [appState.chat]);

  return (
    <div className="min-w-[min(728px,100%)] w-[min(728px,100%)] h-full flex flex-col py-6">
      <div className="w-full flex flex-row items-center gap-2 sm:gap-4 p-2 rounded-lg bg-zinc-900">
        <button
          className="lg:hidden min-w-[32px] min-h-[32px] flex items-center justify-center text-zinc-50"
          onClick={() => {
            setPage("nav");
          }}
        >
          <i className="icon-24">
            {" "}
            <HiOutlineArrowLeft />
          </i>
        </button>
        <Image
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center object-cover"
          src={appState.chat?.image}
          alt="profile img"
          width={200}
          height={200}
        />
        <div className=" w-[calc(100%-96px)] sm:w-[calc(100%-104px)] flex flex-col">
          <h6 className="w-full h6-bold text-zinc-50 text-ellipsis whitespace-nowrap overflow-hidden ">
            {appState.chat?.username}
          </h6>
        </div>
      </div>
      {``}
      <div className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden u-scrollbar-hidden">
        {appState.messages?.length > 0 &&
          appState.messages.map((message, index) => {
            return <ChatMSG key={index} msg={message} />;
          })}
        {/*
         */}
      </div>
      <div className="w-full flex flex-row items-center py-1 ">
        <div className="p-2 h-12 w-full rounded-lg bg-zinc-100 shadow-md">
          <input
            className="w-full h-full p text-zinc-900 bg-transparent"
            ref={chatInputRef}
            onChange={(e) => {
              setChat({
                ...chat,
                newMessage: { ...chat.newMessage, text: e.target.value },
              });
            }}
            type="text"
            placeholder="Tapez une message"
          />
        </div>
        {/* <button className="min-w-[48px] min-h-[48px] flex items-center justify-center text-zinc-800">
          <i className="icon-24">
            <BsImage />
          </i>
        </button> */}
        <button
          className="min-w-[48px] min-h-[48px] flex items-center justify-center text-blue-500"
          onClick={() => {
            if (chat.newMessage.text) {
              chatInputRef.current.value = "";
              if (appState.chat.chatId) {
                sendMessage(
                  `/api/users/${appState.profile?.id}`,
                  `/api/users/${appState.chat?.id}`,
                  `/api/chat/${appState.chat?.chatId}`,
                  chat.newMessage
                );
                setChat({
                  ...chat,
                  newMessage: { ...chat.newMessage, text: "" },
                });
              } else {
                sendMessageNew(
                  `/api/users/${appState.profile?.id}`,
                  `/api/users/${appState.chat?.id}`,
                  chat.newMessage
                );
                setChat({
                  ...chat,
                  newMessage: { ...chat.newMessage, text: "" },
                });
              }
            }
          }}
        >
          <i className="icon-24">
            <RiSendPlaneFill />
          </i>
        </button>
      </div>
    </div>
  );
}

export default Chat;
