import React from "react";
import { FaInstagram, FaVimeo } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { TbBrandVimeo } from "react-icons/tb";

export default function Footer() {
  return (
    <div className="w-full bg-white text-black">
      <div className="grid grid-cols-1 mx-4  lg:mx-8 py-12 px-4 md:grid-cols-2">
        <div className="">
          <div className=" flex flex-col lg:flex-row gap-2 items-center mt-4 text-lg  tracking-wide ">
            <h1 className="font-medium text-xl">Connect</h1>
            <a
              href="mailto:contact@suncitystudios.in"
              className="w-max underline"
            >
              contact@suncitystudios.in
            </a>
          </div>
        </div>
        {/* <div className="flex  items-center lg:justify-normal justify-center mt-4  ">
          <a href="tel:+98765432190" className="w-max  ">
            +98765432190
          </a>
        </div> */}
        <div className="flex items-center justify-center lg:justify-end gap-4 ">
          <div className="flex  items-center lg:justify-normal justify-center mt-4 text-2xl hover:scale-110 duration-300 ">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/suncity.films"
              className="w-max  "
            >
              <FaInstagram />
            </a>
          </div>

          <div className="flex items-center lg:justify-normal justify-center mt-4 text-2xl hover:scale-110 duration-300 ">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@suncityfilms"
              className="w-max  "
            >
              <FiYoutube />
            </a>
          </div>
          <div className="flex items-center lg:justify-normal justify-center mt-4 text-2xl hover:scale-110 duration-300 ">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.vimeo.com/"
              className="w-max  "
            >
              <TbBrandVimeo />
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-light px-4 pb-8 text-sm mx-4 md:mx-8 items-center">
        <h1 className="">2024. Copyright. All rights reserved.</h1>
        <h1 className="">Sun City Films</h1>
      </div>
    </div>
  );
}
