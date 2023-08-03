import { appContext } from "@/pages/_app";
import React, { useContext } from "react";
import DoctorCard from "./DoctorCard";

function DoctorsContainer() {
  const { appState, setAppState } = useContext(appContext);
  return (
    <div className="w-full flex items-center justify-center py-6 px-3 sm:px-8 xl:px-16">
      <div className="w-[min(1400px,100%)] flex flex-col gap-3">
        <div className="w-full flex flex-row flex-wrap gap-6 items-center">
          <h2 className="h2 text-zinc-950">Doctors</h2>
          {appState.search && (
            <button
              className="px-6 py-2 rounded-full border border-blue-500 bg-blue-500 hover:bg-transparent text-zinc-50 hover:text-blue-500 transition duration-200 ml-auto"
              onClick={() => {
                setAppState({
                  ...appState,
                  search: false,
                  doctors: appState.allDoctors,
                });
              }}
            >
              <h6 className="h6">Voir tout</h6>
            </button>
          )}
        </div>

        {appState.doctors?.length > 0 ? (
          appState.doctors.map((doctor) => {
            return <DoctorCard key={doctor._id} doctor={doctor} />;
          })
        ) : (
          <div className="w-full">
            <h6 className="h6 text-zinc-900">Aucun résultat</h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsContainer;
