import React from "react";

export default function Box () {
  return (
    <div className="w-full h-screen relative">
      <div className="fixed w-full h-screen top-0 left-0">
        <div className="relative w-full h-screen">
          <img
            className="absolute w-full h-screen top-[619px] left-[802px] object-cover"
            alt="Gradient"
            src="..assets/gradient.png"
          />
          <img className="absolute w-full h-screen " alt="Vector" src="vector.svg" />
          <div className="absolute w-full h-screen top-[619px] left-[802px] bg-[#ffd7d7d9] mix-blend-luminosity" />
          <div className="absolute w-full h-screen top-[210px] left-[2259px] bg-[#ffffff40] rotate-[-24.34deg]" />
          <div className="absolute w-full h-screen top-[57px] left-[2344px] bg-[#ffffff4c] rotate-[-24.34deg]" />
          <div className="absolute w-full h-screen top-[371px] left-[525px] bg-[#ffffff26] rotate-[-29.01deg]" />
          <div className="absolute w-full h-screen top-[415px] left-[454px] bg-[#ffffff33] rotate-[-29.01deg]" />
          <div className="absolute w-full h-screen top-[431px] left-[396px] bg-[#ffffff40] rotate-[-29.01deg]" />
        </div>
      </div>
    </div>
  );
};
