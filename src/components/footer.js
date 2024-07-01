import React from "react";


export default function Footer() {

  
  return (
    <div className="w-full bg-white text-black">
      <div className="border border-b border-black my-4"></div>

      <div className="grid grid-cols-1 mx-4  lg:mx-8 py-16 px-4 md:grid-cols-4">
        <div className="">
          <h1 className="font-medium text-xl">Write to us</h1>
          <div className="grid grid-cols-1 mt-4 text-lg space-y-1">
            <a href="mailto:info@suncityfilms.com" className="w-max">
              info@suncityfilms.com
            </a>
            <a href="tel:+98765432190" className="w-max">
              +98765432190
            </a>
          </div>
        </div>
        <div className="">
          <h1 className="font-medium text-xl">Meet us</h1>
          <div className="grid grid-cols-1 mt-4 text-lg space-y-1">
            <p className="">ABC Prime Avenpe <br /> 2298767 </p>
         
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
