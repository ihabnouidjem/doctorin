import DoctorsContainer from "@/components/DoctorsContainer";
import Header from "@/components/Header";
import PostsContainer from "@/components/PostsContainer";
import SearchBanner from "@/components/SearchBanner";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { appContext } from "./_app";

function Home({ profile, doctors, map }) {
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
    <div className="grid grid-cols-1fr grid-rows-1fr ">
      <Image
        className="w-full h-[min(100vh,700px)] flex items-center justify-center object-cover col-1/2 row-1/2 z-0"
        src={"/uploads/banner.jpg"}
        width={2000}
        height={700}
        alt="banner"
      />
      <div className="w-full flex flex-col col-1/2 row-1/2 z-10">
        <Header />
        <SearchBanner />
        <DoctorsContainer id="#doctors" />
        {/* <div className="w-full flex items-center justify-center py-6 px-3 sm:px-8 xl:px-16">
          {" "}
          <PostsContainer header={"Newest"} />
        </div> */}
      </div>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/`}`,
        peranent: false,
      },
    };
  }

  const profile = fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.DOMAIN
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
        ? process.env.DOMAIN
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
        ? process.env.DOMAIN
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
