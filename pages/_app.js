import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { createContext, useState } from "react";
import axios from "axios";

export const appContext = createContext();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [appState, setAppState] = useState({
    profile: null,
    allPosts: null,
    myPosts: null,
    allDoctors: null,
    doctors: null,
    chat: null,
    messages: [],
    hospitals: [],
    search: false,
  });

  const postProfile = async (path, items) => {
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://doctorin.vercel.app"
            : process.env.NODE_ENV === "development" && "http://localhost:3000"
        }${path}`,
        items
      )
      .then((res) => {
        setAppState({ ...appState, profile: res.data });
      });
  };

  const sendMessage = async (srcId, destId, chatId, message) => {
    const newMessages = [...appState.messages, message];
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://doctorin.vercel.app"
            : process.env.NODE_ENV === "development" && "http://localhost:3000"
        }${chatId}`,
        { messages: newMessages }
      )
      .then((res) => {
        const updatedMessages = res.data?.messages;
        axios
          .post(
            `${
              process.env.NODE_ENV === "production"
                ? "https://doctorin.vercel.app"
                : process.env.NODE_ENV === "development" &&
                  "http://localhost:3000"
            }${srcId}`,
            { chat: newSrcChat }
          )
          .then((res) => {
            setAppState({
              ...appState,
              profile: res.data,
              messages: updatedMessages,
            });
          });
      });
    var newSrcChat = appState.profile?.chat.map((chat) => {
      if (chat.chatId !== appState.chat.chatId) {
        return chat;
      } else {
        return {
          chatId: chat.chatId,
          username: appState.chat?.username,
          id: appState.chat?.id,
          image: appState.chat?.image,
          lastMsg: message.text,
        };
      }
    });
    var newDestChat = appState.destChat?.map((chat) => {
      if (chat.chatId !== appState.chat.chatId) {
        return chat;
      } else {
        return {
          chatId: chat.chatId,
          username: appState.chat?.username,
          id: appState.chat?.id,
          image: appState.chat?.image,
          lastMsg: message.text,
        };
      }
    });

    axios.post(
      `${
        process.env.NODE_ENV === "production"
          ? "https://doctorin.vercel.app"
          : process.env.NODE_ENV === "development" && "http://localhost:3000"
      }${destId}`,
      { chat: newDestChat }
    );
  };

  const sendMessageNew = async (srcId, destId, message) => {
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://doctorin.vercel.app"
            : process.env.NODE_ENV === "development" && "http://localhost:3000"
        }/api/chat`,
        { messages: [message] }
      )
      .then((res) => {
        var chatId = res.data?._id;
        var messages = res.data?.messages;
        if (appState.profile?.chat) {
          var newChat = [
            ...appState.profile?.chat,
            {
              chatId: chatId,
              username: appState.chat?.username,
              id: appState.chat?.id,
              image: appState.chat?.image,
              lastMsg: message.text,
            },
          ];
        } else {
          var newChat = [
            {
              chatId: chatId,
              username: appState.chat?.username,
              id: appState.chat?.id,
              image: appState.chat?.image,
              lastMsg: message.text,
            },
          ];
        }
        console.log("_app newChat", newChat);
        axios
          .post(
            `${
              process.env.NODE_ENV === "production"
                ? "https://doctorin.vercel.app"
                : process.env.NODE_ENV === "development" &&
                  "http://localhost:3000"
            }${srcId}`,
            {
              chat: newChat,
            }
          )
          .then((res) => {
            setAppState({
              ...appState,
              profile: res.data,
              chat: { ...appState.chat, chatId: chatId },
              messages: messages,
            });
          });

        axios
          .get(
            `${
              process.env.NODE_ENV === "production"
                ? "https://doctorin.vercel.app"
                : process.env.NODE_ENV === "development" &&
                  "http://localhost:3000"
            }${destId}`
          )
          .then((res) => {
            if (res.data?.chat) {
              var newDestChat = [
                ...res.data?.chat,
                {
                  chatId: chatId,
                  username: appState.profile?.name,
                  id: appState.profile?.id,
                  image: appState.profile?.image,
                  lastMsg: message.text,
                },
              ];
            } else {
              var newDestChat = [
                {
                  chatId: chatId,
                  username: appState.profile?.name,
                  id: appState.profile?.id,
                  image: appState.profile?.image,
                  lastMsg: message.text,
                },
              ];
            }
            console.log("_app newDestChat", newDestChat);

            axios.post(
              `${
                process.env.NODE_ENV === "production"
                  ? "https://doctorin.vercel.app"
                  : process.env.NODE_ENV === "development" &&
                    "http://localhost:3000"
              }${destId}`,
              {
                chat: newDestChat,
              }
            );
          });
      });
  };

  return (
    <SessionProvider session={session}>
      <appContext.Provider
        value={{
          appState,
          setAppState,
          postProfile,
          sendMessage,
          sendMessageNew,
        }}
      >
        <Component {...pageProps} />
      </appContext.Provider>
    </SessionProvider>
  );
}
