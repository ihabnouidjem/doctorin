import { appContext } from "@/pages/_app";
import React, { useContext } from "react";

function NewProfile() {
  const { appState, postProfile } = useContext(appContext);
  return (
    <div className="w-full min-h-[calc(100vh-113px)] py-6 px-3 sm:px-8 xl:px-16 flex items-center justify-center">
      <div className="w-full flex flex-col items-center gap-4 px-4 sm:px-8">
        <h1 className="h1 text-zinc-950 text-center">{`Bienvenue dans la famille doctorin!`}</h1>
        <p className="p text-zinc-800 text-center">{`N'hésitez pas à choisir le type de profil qui vous convient`}</p>
        <div className="w-full flex flex-row flex-wrap justify-center items-center gap-4">
          <button
            className="px-4 py-2 rounded-xl border border-blue-200 text-blue-600"
            onClick={() => {
              postProfile(`/api/users/${appState.profile?.id}`, {
                status: "doctor",
              });
            }}
          >
            <h6 className="h6-bold">Je suis médecin</h6>
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-blue-600 text-zinc-50"
            onClick={() => {
              postProfile(`/api/users/${appState.profile?.id}`, {
                status: "patient",
              });
            }}
          >
            <h6 className="h6-bold">je suis un patient</h6>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewProfile;
