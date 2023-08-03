import { appContext } from "@/pages/_app";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BsTriangleFill } from "react-icons/bs";

function Header() {
  const { appState, setAppState } = useContext(appContext);
  const router = useRouter();
  return (
    <div
      className={`w-full flex flex-col items-center justify-center px-3 sm:px-8 xl:px-16
       ${router?.pathname === "/profile" ? "bg-blue-600" : "bg-transparent"}`}
    >
      <div className="w-[min(1400px,100%)] h-[64px] flex flex-row items-center justify-between">
        <Link href="/" className={"lg:min-w-[180px] "}>
          <h2
            className={`h2 ${
              router?.pathname === "/profile" ? "text-zinc-50" : "text-blue-500"
            }`}
          >
            doctorin
          </h2>
        </Link>
        <div className="h-10 sm:h-12 p-[4px] bg-black30 shadow-lg rounded-full flex items-center justify-center text-zinc-50">
          {/* <i
            className={`h-8 w-8 text-[12px]  flex items-center justify-center transform rotate-180 ${
              router?.pathname === "/profile" && "hidden"
            }`}
          >
            <BsTriangleFill />
          </i> */}
          <Link
            href="/profile"
            className="min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 rounded-full  bg-zinc-300"
          >
            {appState.profile && (
              <Image
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center object-cover"
                src={appState.profile.image}
                alt="profile img"
                width={200}
                height={200}
              />
            )}
          </Link>
        </div>
      </div>
      {router?.pathname === "/profile" && (
        <div className="w-[min(1400px,100%)] h-[48px] border-t border-blue-400 flex flex-row items-center justify-center">
          <h5 className="h5 text-zinc-50">
            {appState.profile?.username
              ? appState.profile?.username
              : appState.profile?.name}
          </h5>
          <Link
            href="/api/auth/signout"
            className="ml-auto px-4 py-1 rounded-md bg-zinc-50 text-zinc-950"
            onClick={() => signOut()}
          >
            <h6 className="h6 ">Se déconnecter</h6>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
