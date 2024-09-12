import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-white text-black">
      <div className="grid grid-cols-1 mx-4  lg:mx-8 py-12 px-4 md:grid-cols-4">
        <div className="">
          <div className=" flex flex-col lg:flex-row gap-2 items-center mt-4 text-lg ">
            <h1 className="font-medium text-xl">Connect</h1>
            <a href="mailto:info@suncityfilms.com" className="w-max underline">
              info@suncityfilms.com
            </a>
          </div>
        </div>
        <div className="flex  items-center lg:justify-normal justify-center mt-4  ">
          <a href="tel:+98765432190" className="w-max  ">
            +98765432190
          </a>
        </div>
        <div className="flex  items-center lg:justify-normal justify-center mt-4 text-lg ">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/suncity.films"
            className="w-max  "
          >
            Instagram
          </a>
        </div>

        <div className="flex items-center lg:justify-normal justify-center mt-4 text-lg ">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/@suncityfilms"
            className="w-max  "
          >
            Youtube
          </a>
        </div>
      </div>
      <div className="flex justify-between font-light px-4 pb-8 text-sm mx-4 md:mx-8 items-center">
        <h1 className="">2024. Copyright. All rights reserved.</h1>
        <h1 className="">Sun City Films</h1>
      </div>
    </div>
  );
}
