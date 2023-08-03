import Image from "next/image";
import React from "react";

function Post() {
  return (
    <div className="w-full flex flex-col gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white">
      <div className="w-full flex flex-row gap-4 items-center">
        <Image
          className="w-12 h-12 rounded-full flex items-center justify-center object-cover"
          src={`/uploads/images.jpeg`}
          alt="profile img"
          height={200}
          width={200}
        />
        <div className="w-full flex flex-col">
          <h6 className="w-full h6 whitespace-nowrap overflow-hidden text-ellipsis text-zinc-950">{`Dr.Emily Johnson, MD, FACP`}</h6>
          <p className="w-full small-p whitespace-nowrap overflow-hidden text-ellipsis text-zinc-800">{`Hopital de tindouf`}</p>
        </div>
      </div>
      <p className="w-full p text-zinc-800">{`Malaria is a mosquito-borne infectious disease caused by Plasmodium parasites. It is prevalent in tropical and subtropical regions, and its symptoms include fever, chills, headache, and body aches. In severe cases, it can lead to complications and even death. Here are the steps to protect yourself from malaria:
      1. Use Mosquito Repellent
      2. Wear Protective Clothing
      3. Sleep under Mosquito Nets
      4. Stay in Screened or Air-Conditioned Accommodations
      `}</p>
      <Image
        className="w-full flex items-center justify-center object-cover rounded-md sm:rounded-lg"
        src={`/uploads/banner.jpg`}
        alt="post img"
        height={800}
        width={2000}
      />
    </div>
  );
}

export default Post;
