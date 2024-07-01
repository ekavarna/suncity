import logo from "../assets/logo.png";
import { MdMenu } from "react-icons/md";
import Drawer from "./drawer";
import { useState } from "react";

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
      name: "About",
      link: "/about"
    }
  ];

  return (
    <>

    <div className="navbar justify-between  z-50   lg:px-8 text-white top-0 ">
      <div className="">
        {/* MOBILE SCREEN */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="text-3xl  lg:hidden">
            <MdMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className=""
                  href={item.link}

                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* LOGO COMMON FOR ALL SCREEN */}
        <a href="/" className="">
          <img
            src={logo}
            priority
            alt=""
            width={300}
            height={300}
            className="w-[8rem]"
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
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        <button onClick={()=>setDrawerOpen(true)} className="btn text-lg  rounded-full font-medium bg-transparent hover:text-black text-white">Get in touch</button>
      </div>
    </div>
          {/* Fullscreen Drawer */}
          <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </>
  );
}
