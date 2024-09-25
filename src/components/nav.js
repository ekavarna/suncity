// import logo from "../assets/logomain.png";
import logo from "../assets/logowhite.png";

import { useState } from "react";
import FlipLink from "./TextAnimations/flipText";
import { FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import Director from "./director";

export default function Nav() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="navbar justify-between  z-50   lg:px-8 text-white top-0 ">
        <div className="">
          {/* LOGO COMMON FOR ALL SCREEN */}
          <a href="/" className=" object-contain  ">
            <img
              src={logo}
              priority
              alt=""
              width={300}
              height={300}
              className="w-[4rem] md:w-[8rem] "
            />
          </a>
        </div>
        <div className=" flex">
          <ul className=" text-lg uppercase    tracking-widest  flex  gap-4 px-1">
            <li className="py-0">
              <a
                className="
              "
                href="/work"
              >
                <FlipLink>Work</FlipLink>
              </a>
            </li>

            <li className="py-0">
              <button className="" onClick={() => setDrawerOpen(true)}>
                <FlipLink>Director</FlipLink>
              </button>
            </li>
          </ul>
        </div>

        <div className="flex items-center  text-xl justify-center gap-4">
          <a
            className="text-xl md:text-2xl hover:text-theme-pink hover:scale-105 duration-200"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/suncity.films"
          >
            <FaInstagram />
          </a>

          <a
            className="text-xl md:text-2xl hover:text-theme-pink hover:scale-105 duration-200"
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/@suncityfilms"
          >
            <FiYoutube />
          </a>
          <a className="text-xl md:text-2xl hover:text-theme-pink hover:scale-105 duration-200" href="mailto:contact@suncitystudios.in">
            {" "}
            <CiMail strokeWidth={'px'}/>{" "}
          </a>
        </div>
      </div>
      {/* Fullscreen Drawer */}

      <Director isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
