import { motion } from "framer-motion";

const Player = ({ url, title, description }) => {
  return (
    <div className="relative  h-full rounded-xl lg:mx-8  mx-4  ">
      <div className="relative w-full h-full ">
        <motion.div
          initial={{  opacity: 0.5 }}
          whileInView={{  opacity: 1 }}
          transition={{
            duration: 0.7
          }}
          className="w-full h-full"
        >
          <video
            className="w-full object-cover h-full rounded-3xl"
            muted
            autoPlay
            onContextMenu={(e) => e.preventDefault()}
            loop
            preload="auto"
            src={url}
          ></video>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7
        }}
        className="absolute bottom-4 lg:bottom-16 flex gap-4 items-center px-2  md:px-16 w-full"
      >
        <div className="md:grid-cols-2 grid-cols-1 gap-4 md:gap-0 text-white grid">
          <div className="">
            <h1 className="text-sm md:text-base"><span className="font-medium">Brand Name /</span> <span>Camapign Name</span></h1>
            <p className="uppercase font-Armavir md:text-2xl text-xl">Project Name</p>
          </div>
          <div className=" flex gap-8 md:gap-16">
            <div className="text-justify font-light text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </div>
            <div className="lg:block hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12"
              >
                <path
                  fillRule="evenodd"
                  d="M3.97 3.97a.75.75 0 0 1 1.06 0l13.72 13.72V8.25a.75.75 0 0 1 1.5 0V19.5a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1 0-1.5h9.44L3.97 5.03a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Player;
