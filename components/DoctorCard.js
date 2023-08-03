import { appContext } from "@/pages/_app";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FaLocationDot } from "react-icons/fa6";

function DoctorCard({ doctor }) {
  const { appState, setAppState } = useContext(appContext);

  return (
    <div className="w-full flex flex-row  gap-2 sm:gap-3  rounded-lg sm:rounded-xl ">
      <Image
        className="w-[56px] h-[56px] rounded-full sm:w-[120px] lg:w-[200px] sm:h-[120px] lg:h-[200px] sm:rounded-xl flex items-center justify-center object-cover "
        src={doctor.image}
        alt={doctor.username}
        height={200}
        width={200}
      />
      <div className="w-full flex flex-col gap-1 p-1 sm:p-2 rounded-lg sm:rounded-xl bg-white">
        <div className="w-full flex flex-row gap-2">
          <div className="w-full flex flex-col">
            <h5 className="h5 w-full text-zinc-950">{doctor.username}</h5>
            <div className="w-full flex flex-row gap-1 text-blue-500">
              <i className="h-[20px] w-[20px] text-[18px]  flex items-center justify-center">
                <FaLocationDot />{" "}
              </i>
              <h6 className="h6-bold w-full">{`${doctor.hospital}. ${doctor.city}`}</h6>
            </div>
          </div>
          <Link
            href="/profile"
            className="px-6 py-2 h-fit rounded-full bg-zinc-900"
            onClick={() => {
              if (
                doctor.chat &&
                appState.profile?.chat &&
                appState.profile?.chat.map((chat) => {
                  doctor.chat?.map(({ chatId }) => {
                    if (chat.chatId === chatId) return true;
                  });
                })
              ) {
                appState.profile?.chat.map((chat) => {
                  doctor.chat?.map(({ chatId }) => {
                    if (chat.chatId === chatId) {
                      setAppState({
                        ...appState,
                        chat: {
                          chatId: chatId,
                          id: doctor.id,
                          username: doctor.username,
                          image: doctor.image,
                          lastMsg: "",
                        },
                        destChat: doctor.chat,
                      });
                    }
                  });
                });
              } else {
                setAppState({
                  ...appState,
                  chat: {
                    id: doctor.id,
                    username: doctor.username,
                    image: doctor.image,
                    lastMsg: "",
                  },
                  destChat: [],
                });
              }
            }}
          >
            <h6 className="h6 text-zinc-50">Consulter</h6>
          </Link>
        </div>

        <p className="p w-full text-zinc-800">{doctor.about}</p>
      </div>
    </div>
  );
}

export default DoctorCard;
