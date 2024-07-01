import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";

export default function Drawer({ isOpen, onClose }) {
  return (
    <div
      className={`fixed z-[100] inset-0 overflow-y-auto bg-black  text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-4 md:px-16  px-4 text-justify  `}
    >
      <button
        className="absolute  top-5 right-5 text-4xl"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="p-5 mt-24    space-y-8 text-2xl md:text-4xl ">
        <p>
          We are a multi-dimensional creative company specialised in the fields
          of design, film and visual arts.
        </p>
        <p>
          Our London and Los Angeles studios work closely with the world's
          leading brands and agencies to produce award-winning creative content.
        </p>

        <div className="grid text-2xl pt-8  gap-2 grid-cols-1 ">
          <a
            href="https://www.instagram.com/moonshot.fun/"
            className="flex  hover:text-white hover:underline  items-center gap-2"
          >
            <BsInstagram className="text-white" /> Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/moonshot.fun/"
            className="flex  hover:text-white hover:underline items-center gap-2"
          >
            <BsLinkedin className="text-white" /> LinkedIn
          </a>
        </div>
      </div>
      <div className="p-5 md:mt-24  ">
        <h2 className="text-5xl mb-4">Contact</h2>
        <div className="border-b w-8 "></div>
        <div className="space-y-4 mt-8">
          {" "}
          <p className="text-xl  mb-2">
            If you’d like to discuss a potential project or collaboration,
            please email{" "}
            <a
              href="mailto:contact@moonshotmedia.in "
              className="underline  hover:text-white hover:no-underline"
            >
              contact@moonshotmedia.in
            </a>
          </p>
        </div>

        <div className="grid mt-16 gap-8 text-xl md:text-2xl  grid-cols-2">
          <div>
            <h1>US</h1>
            <a href="tel:" className=" hover:text-white">
              +44 (0)20 7613 2040
            </a>

            <p className="my-4">
              The Old Stables Norway Wharf 20-24 Hertford Rd London N1 5QT
            </p>
            <a
              href="https://www.bing.com/maps?where=Mumbai%2C+Maharashtra+400072%2C+IN&cp=19.109017%7E72.890053&lvl=14.1"
              className=" hover:text-white underline hover:no-underline"
            >
              Get directions
            </a>
          </div>
          <div>
            <h1>US</h1>
            <a href="tel:" className=" hover:text-white">
              +44 (0)20 7613 2040
            </a>

            <p className="my-4">
              The Old Stables Norway Wharf 20-24 Hertford Rd London N1 5QT
            </p>
            <a
              href="https://www.bing.com/maps?where=Mumbai%2C+Maharashtra+400072%2C+IN&cp=19.109017%7E72.890053&lvl=14.1"
              className=" hover:text-white underline hover:no-underline"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
