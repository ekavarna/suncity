// import logo from "../assets/logomain.png";
import logo from "../assets/logoyellow.png";

import { useState } from "react";
import FlipLink from "./TextAnimations/flipText";
import { FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import Director from "./director";
import Producer from "./producer";

export default function Nav() {
  const [isDirectorDrawerOpen, setDirectorDrawerOpen] = useState(false);
  const [isProducerDrawerOpen, setProducerDrawerOpen] = useState(false);

  return (
    <>
      <div className="navbar justify-between  z-50 bg-theme-pink md:py-4  lg:px-8 text-theme-yellow top-0 ">
        <div className="">
          {/* LOGO COMMON FOR ALL SCREEN */}
          <a href="/" className=" object-contain  ">
            <img
              src={logo}
              alt="Sun City Studios Logo"
              width={300}
              height={300}
              className="w-[3rem] md:w-[6rem] "
            />
          </a>
        </div>
        <div className=" flex">
          <ul className="   font-bold   tracking-widest  flex  gap-4 px-1">
            <li className="py-0  ">
              <a className=" " href="/work">
                <FlipLink>Work</FlipLink>
              </a>
            </li>
            <li className="dropdown dropdown-hover relative">
              <div
                tabIndex={0}
                role="button"
                className="uppercase flex items-center hover:text-theme-yellow focus:outline-none"
              >
                <FlipLink>talent</FlipLink>{" "}
                <svg
                  className="ml-1 w-4 h-4 transition-transform duration-300 ease-in-out transform rotate-0 dropdown-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-theme-pink rounded-lg shadow-lg w-max p-2 mt-1 "
              >
                <li className=" rounded-lg p-1">
                  <button onClick={() => setDirectorDrawerOpen(true)}>
                    <FlipLink>Director</FlipLink>
                  </button>
                </li>
                <li className="rounded-lg p-1">
                  <button onClick={() => setProducerDrawerOpen(true)}>
                    <FlipLink>Producer</FlipLink>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex items-center  text-xl justify-center gap-4">
          <a
            className="text-xl md:text-2xl  hover:scale-105 duration-200"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/suncity.films"
          >
            <FaInstagram />
          </a>

          <a
            className="text-xl md:text-2xl  hover:scale-105 duration-200"
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/@suncityfilms"
          >
            <FiYoutube />
          </a>
          <a
            className="text-xl md:text-2xl  hover:scale-105 duration-200"
            href="mailto:contact@suncitystudios.in"
          >
            {" "}
            <CiMail strokeWidth={"px"} />{" "}
          </a>
        </div>
      </div>
      {/* Fullscreen Drawer */}

      <Director
        isOpen={isDirectorDrawerOpen}
        onClose={() => setDirectorDrawerOpen(false)}
      />
      <Producer
        isOpen={isProducerDrawerOpen}
        onClose={() => setProducerDrawerOpen(false)}
      />
    </>
  );
}
