import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsEye, BsPen } from "react-icons/bs";

function DoctorProfile() {
  const { appState, postProfile } = useContext(appContext);
  const [profile, setProfile] = useState({
    errorMSG: "",
    status: "",
    newProfile: { username: "", city: "", hospital: "", about: "" },
  });

  const firstInpRef = useRef(null);
  const firstSelRef = useRef(null);
  const secondeSelRef = useRef(null);
  const firstTaRef = useRef(null);
  useEffect(() => {
    if (
      appState.profile &&
      appState.profile?.username &&
      appState.profile?.city &&
      appState.profile?.hospital &&
      appState.profile?.about
    ) {
      setProfile({
        ...profile,
        status: "showcase",
        errorMSG: "",
        newProfile: {
          username: appState.profile?.username,
          city: appState.profile?.city,
          hospital: appState.profile?.hospital,
          about: appState.profile?.about,
        },
      });
      if (
        firstInpRef.current &&
        firstSelRef.current &&
        secondeSelRef.current &&
        firstTaRef.current
      ) {
        firstInpRef.current.value = "";
        firstSelRef.current.value = "Ville";
        secondeSelRef.current.value = "Hôpital";
        firstTaRef.current.value = "";
      }
    } else if (appState.profile) {
      setProfile({
        ...profile,
        status: "edit",
        errorMSG: "",
        newProfile: {
          username: appState.profile?.username,
          city: appState.profile?.city,
          hospital: appState.profile?.hospital,
          about: appState.profile?.about,
        },
      });
      if (
        firstInpRef.current &&
        firstSelRef.current &&
        secondeSelRef.current &&
        firstTaRef.current
      ) {
        firstInpRef.current.value = "";
        firstSelRef.current.value = "Ville";
        secondeSelRef.current.value = "Hôpital";
        firstTaRef.current.value = "";
      }
    }
  }, [appState.profile]);

  return (
    <div className="min-w-[min(728px,100%)] w-[min(728px,100%)] h-full overflow-x-hidden overflow-y-scroll u-scrollbar-hidden flex flex-col gap-6 py-6">
      <div className="w-full flex flex-row items-center flex-wrap gap-6">
        <h2 className="h2 text-zinc-950">Profile</h2>
        <i
          className="icon-24 text-zinc-950 ml-auto"
          onClick={
            profile.status === "showcase"
              ? () => {
                  setProfile({ ...profile, status: "edit" });
                }
              : appState.profile.username &&
                appState.profile.city &&
                appState.profile.hospital &&
                appState.profile.about &&
                (() => {
                  setProfile({
                    ...profile,
                    errorMSG: "",
                    status: "showcase",
                    newProfile: {
                      username: appState.profile?.username,
                      city: appState.profile?.city,
                      hospital: appState.profile?.hospital,
                      about: appState.profile?.about,
                    },
                  });
                  firstInpRef.current.value = "";
                  firstSelRef.current.value = "Ville";
                  secondeSelRef.current.value = "Hôpital";
                  firstTaRef.current.value = "";
                })
          }
        >
          {profile.status === "edit" ? (
            <BsEye />
          ) : (
            profile.status === "showcase" && <BsPen />
          )}
        </i>
      </div>
      {profile.status === "edit" &&
        profile.errorMSG &&
        profile.errorMSG !== "" && (
          <div className="w-full border-l-4 border-red-500 px-2">
            <p className="w-full p text-red-500">{profile.errorMSG}</p>
          </div>
        )}

      <div className="w-full flex flex-col gap-[2px]">
        <h5 className="h5 text-zinc-950 w-full">{`Nom d'utilisateur`}</h5>
        {profile.status === "edit" ? (
          <div className="w-full h-12 rounded-xl border-2 border-zinc-300 p-2">
            <input
              ref={firstInpRef}
              className="w-full h-full p text-zinc-800 bg-transparent"
              onChange={(e) => {
                setProfile({
                  ...profile,
                  newProfile: {
                    ...profile.newProfile,
                    username: e.target.value,
                  },
                });
              }}
              type="text"
              placeholder="Nom d'utilisateur"
            />
          </div>
        ) : (
          profile.status === "showcase" && (
            <p className="p text-zinc-800 w-full">
              {appState.profile?.username}
            </p>
          )
        )}
      </div>
      {profile.status === "showcase" && (
        <div className="w-full flex flex-col gap-[2px]">
          <h5 className="h5 text-zinc-950 w-full">{`Ville | Hôpital`}</h5>

          <p className="p text-zinc-800 w-full">{`${appState.profile?.city} . ${appState.profile?.hospital}`}</p>
        </div>
      )}
      {profile.status === "edit" && (
        <>
          <div className="w-full flex flex-row flex-wrap gap-3">
            <div className="max-w-[140px] sm:max-w-[160px] flex flex-col gap-[2px]">
              <h5 className="h5 text-zinc-950 w-full">{`Ville`}</h5>

              <div className="border border-zinc-600 rounded-xl flex flex-col gap-[2px]">
                <select
                  ref={firstSelRef}
                  className="px-2 h-10  bg-transparent p text-zinc-800"
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      newProfile: {
                        ...profile.newProfile,
                        city: e.target.value,
                      },
                    });
                  }}
                >
                  <option value={`Ville`}>{`Ville`}</option>
                  {appState.cities &&
                    appState.cities?.map(({ _id, name }) => {
                      return (
                        <option key={_id} value={name}>
                          {name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="max-w-[140px] sm:max-w-[160px] flex flex-col gap-[2px]">
              <h5 className="h5 text-zinc-950 w-full">{`Hôpital`}</h5>
              <div className="border border-zinc-600 rounded-xl flex flex-col gap-[2px]">
                <select
                  ref={secondeSelRef}
                  className="px-2 h-10  bg-transparent p text-zinc-800"
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      newProfile: {
                        ...profile.newProfile,
                        hospital: e.target.value,
                      },
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
              </div>
            </div>
          </div>
        </>
      )}

      <div className="w-full flex flex-col gap-[2px]">
        <h5 className="h5 text-zinc-950 w-full">{`À propos moi`}</h5>
        {profile.status === "edit" ? (
          <div className="w-full h-[96px] rounded-xl border-2 border-zinc-300 p-2">
            <textarea
              ref={firstTaRef}
              className="w-full  h-full p text-zinc-800 bg-transparent"
              onChange={(e) => {
                setProfile({
                  ...profile,
                  newProfile: { ...profile.newProfile, about: e.target.value },
                });
              }}
              type="text"
              placeholder="À propos moi"
            ></textarea>
          </div>
        ) : (
          profile.status === "showcase" && (
            <p className="p text-zinc-800 w-full">{appState.profile?.about}</p>
          )
        )}
      </div>
      {profile.status === "edit" && (
        <div className="w-full flex flex-row flex-wrap items-center justify-end gap-3">
          <button
            className="px-6 py-2 rounded-xl text-zinc-900 border border-zinc-900"
            onClick={() => {
              setProfile({
                ...profile,
                errorMSG: "",
                newProfile: {
                  username: appState.profile?.username,
                  city: appState.profile?.city,
                  hospital: appState.profile?.hospital,
                  about: appState.profile?.about,
                },
              });
              firstInpRef.current.value = "";
              firstSelRef.current.value = "Ville";
              secondeSelRef.current.value = "Hôpital";
              firstTaRef.current.value = "";
            }}
          >
            <h6 className="h6">Annuler</h6>
          </button>
          <button
            className="px-6 py-2 rounded-xl text-zinc-50 bg-zinc-900"
            onClick={() => {
              if (
                profile.newProfile.username &&
                profile.newProfile.city &&
                profile.newProfile.hospital &&
                profile.newProfile.about
              ) {
                postProfile(
                  `/api/users/${appState.profile?.id}`,
                  profile.newProfile
                );
              } else {
                setProfile({
                  ...profile,
                  errorMSG: "Vous avez des champs manquants",
                });
              }
            }}
          >
            <h6 className="h6">Appliquer</h6>
          </button>
        </div>
      )}
    </div>
  );
}

export default DoctorProfile;
