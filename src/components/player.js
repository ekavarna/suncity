import { motion } from "framer-motion";


const Player = ({ url, title, description }) => {
  console.log(url)
  return (
    <div className="relative  h-full rounded-xl lg:mx-8  mx-4  ">
      <div className="relative w-full h-full ">
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity: 1 }}
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
            playsInline
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
        className="absolute inset-0 md:inset-auto mt-4 md:mt-0 lg:bottom-16 flex gap-4 items-center justify-center px-2  md:px-16 w-full"
      >
        <div className="md:grid-cols-2 grid-cols-1 w-full gap-2 md:gap-0  text-white grid">
          <div className=" text-center md:text-left">
            <h1 className="text-sm md:text-base">
              <span className="font-medium">Brand Name /</span>{" "}
              <span>Camapign Name</span>
            </h1>
            <p className="uppercase font-Armavir md:text-2xl text-xl">
            Project Name
            </p>
          </div>

          <div className="text-justify md:block hidden font-light text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Player;
