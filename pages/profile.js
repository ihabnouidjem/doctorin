import Chat from "@/components/Chat";
import DoctorsContainer from "@/components/ProfileNav";
import Header from "@/components/Header";
import Patient from "@/components/Patient";
import React, { useContext, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { appContext } from "./_app";
import NewProfile from "@/components/NewProfile";
import Doctor from "@/components/Doctor";

function Profile({ profile, doctors, map }) {
  const { data: session } = useSession();
  const { appState, setAppState } = useContext(appContext);

  const filterMap = async () => {
    const hospList = [];
    await map.map((city) => {
      city.hospital.map((hospital) => {
        hospList.push(hospital);
      });
    });
    setAppState({
      ...appState,
      profile: profile,
      allDoctors: doctors,
      doctors: doctors,
      map: map,
      cities: map.map((city) => {
        return { _id: city._id, name: city.name };
      }),
      hospitals: hospList,
    });
  };

  useEffect(() => {
    if (profile && doctors && map) {
      filterMap();
    }
  }, [profile, doctors, map]);

  return (
    <div>
      <Header />
      {appState.profile?.status === "new" ? (
        <NewProfile />
      ) : appState.profile?.status === "patient" ? (
        <Patient />
      ) : (
        appState.profile?.status === "doctor" && <Doctor />
      )}
    </div>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/profile`}`,
        peranent: false,
      },
    };
  }

  const profile = fetch(
    `${
      process.env.NODE_ENV === "production"
        ? "https://doctorin.vercel.app"
        : process.env.NODE_ENV === "development" && "http://localhost:3000"
    }/api/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session.user),
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));

  const doctors = fetch(
    `${
      process.env.NODE_ENV === "production"
        ? "https://doctorin.vercel.app"
        : process.env.NODE_ENV === "development" && "http://localhost:3000"
    }/api/users/doctors`
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));

  const map = fetch(
    `${
      process.env.NODE_ENV === "production"
        ? "https://doctorin.vercel.app"
        : process.env.NODE_ENV === "development" && "http://localhost:3000"
    }/api/map`
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));

  const data = await Promise.all([profile, doctors, map]);

  return {
    props: {
      profile: data[0],
      doctors: data[1],
      map: data[2],
    },
  };
}
