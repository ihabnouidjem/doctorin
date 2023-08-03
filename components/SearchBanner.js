import { appContext } from "@/pages/_app";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";

function SearchBanner() {
  const { appState, setAppState } = useContext(appContext);
  const [search, setSearch] = useState({ search: {} });

  const searchDoctors = async () => {
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.DOMAIN
            : process.env.NODE_ENV === "development" && "http://localhost:3000"
        }/api/users/search`,
        search.search
      )
      .then((res) => {
        setAppState({ ...appState, doctors: res.data, search: true });
      });
  };
  return (
    <div className="w-full h-[min(calc(100vh-64px),634px)] flex flex-col items-center justify-center px-3 sm:px-8 xl:px-16">
      <div className="w-[min(1000px,100%)] flex flex-col items-center justify-center gap-3 ">
        <div className="w-full">
          <h1 className="w-full h1 text-zinc-50 text-center">
            Renforcer la santé, transformer des vies
          </h1>
        </div>
        <div className="w-full flex flex-row flex-wrap md:flex-nowrap justify-end gap-2 md:gap-3">
          <div className="w-full h-12 rounded-xl bg-zinc-50 px-2">
            <input
              className="w-full h-full bg-transparent p text-zinc-800"
              onChange={(e) => {
                setSearch({
                  ...search,
                  search: { ...search.search, doctor: e.target.value },
                });
              }}
              type="text"
              placeholder="Médcins"
            />
          </div>
          <select
            className="min-w-[140px] sm:min-w-[160px] max-w-[140px] sm:max-w-[160px] px-2 h-12 rounded-xl bg-zinc-50 p text-zinc-800"
            onChange={(e) => {
              setSearch({
                ...search,
                search: { ...search.search, city: e.target.value },
              });
            }}
          >
            <option value={"Ville"}>{"Ville"}</option>
            {appState.cities &&
              appState.cities?.map(({ _id, name }) => {
                return (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                );
              })}
          </select>
          <select
            className="min-w-[140px] sm:min-w-[160px] max-w-[140px] sm:max-w-[160px] px-2 h-12 rounded-xl bg-zinc-50 p text-zinc-800"
            onChange={(e) => {
              setSearch({
                ...search,
                search: { ...search.search, hospital: e.target.value },
              });
            }}
          >
            <option value={`Hôpital`}>{`Hôpital`}</option>
            {appState.hospitals &&
              appState.hospitals?.map((hospital, index) => {
                return (
                  <option key={index} value={hospital}>
                    {hospital}
                  </option>
                );
              })}
          </select>
          <button
            className="h-12 px-6 rounded-xl bg-blue-500 text-zinc-50 flex items-center"
            onClick={() => {
              searchDoctors();
            }}
          >
            <h5 className="h5">Recherche</h5>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBanner;
