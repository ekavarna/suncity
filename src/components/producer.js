import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function Producer({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed z-[100] inset-0 overflow-y-auto bg-black text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex items-center justify-center lg:px-24   px-4`}
    >
      <button
        className="absolute rounded-full border border-white btn btn-circle btn-xs text-xl  z-10 top-4 right-4 "
        onClick={onClose}
      >
        <IoCloseSharp />
      </button>
      <div className="flex flex-col  md:flex-row items-center justify-center gap-8 max-w-[820px]  my-auto py-4">
        <div className="relative aspect-[3/4] w-full max-w-xs ">
          <img
            src="https://cms.suncitystudios.in/uploads/zuleikha_gupta_30aef8f8f2.jpeg"
            alt="Director Rahul Bharti  Sun City Studios"
            className="h-full w-full object-cover     rounded-xl shadow-lg"
          />
        </div>
        <div className=" basis-1/2 space-y-2 md:text-left  lg:max-w-full max-w-xs">
          <h1 className=" font-light text-theme-pink  uppercase">Producer</h1>
          <h1 className="font-Armavir text-2xl text-theme-yellow  uppercase">
            Zuleikha Gupta{" "}
          </h1>
          <div className="font-light text-left md:text-justify text-sm space-y-4 ">
            <p>
              Zuleikha has wrangled over 14 directors across time zones and
              temperaments; it’s basically the Olympics of filmmaking.
            </p>
            <p>
              At this point, she speak fluent
              ‘director-who-changes-everything-at-the-last-minute’.
            </p>
            <p>
              And after collaborating with over 14 agencies and 55 brands to
              produce over 150 spots, she’s also now fluent in ‘brand-speak’,
              ‘make the logo bigger’ and can translate ‘we need it yesterday’
              into 10 languages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
