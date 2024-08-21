import logo from "../assets/logo.png";
import { MdMenu } from "react-icons/md";
import Drawer from "./drawer";
import { useState } from "react";
import FlipLink from "./TextAnimations/flipText";

export default function Nav() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    {
      id: 1,
      name: "Work",
      link: "/"
    },
    {
      id: 2,
      name: "Brands",
      link: "/brands"
    },
    {
      id: 3,
      name: "Director",
      link: "/about"
    }
  ];

  return (
    <>
      <div className="navbar justify-between  z-50   lg:px-8 text-white top-0 ">
        <div className="">
          {/* MOBILE SCREEN */}
          <div className="drawer  md:hidden drawer-start">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="text-3xl">
                <MdMenu />
              </label>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu items-center justify-center text-xl uppercase bg-black  min-h-screen w-80 p-4">
                {navItems.map((item) => (
                  <li key={item.id} className="py-0">
                    <a
                      className="
              "
                      href={item.link}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LOGO COMMON FOR ALL SCREEN */}
          <a href="/" className=" object-contain">
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
        <div className=" hidden  lg:flex">
          <ul className="menu text-lg    tracking-widest menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.id} className="py-0">
                <a
                  className="
              "
                  href={item.link}
                >
                <FlipLink> {item.name}</FlipLink> 
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="">
          <button
            onClick={() => setDrawerOpen(true)}
            className="btn text-lg  rounded-full  font-medium bg-transparent hover:text-black text-white"
          >
         <FlipLink>Get in touch</FlipLink>   
          </button>
        </div>
      </div>
      {/* Fullscreen Drawer */}

      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
