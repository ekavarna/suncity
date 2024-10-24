import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Player = ({ url, title, brand }) => {
  const videoSchemaData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,

    contentUrl: `https://cms.suncitystudios.in/${url}`,

    publisher: {
      "@type": "Organization",
      name: "Sun City Studios",
      logo: {
        "@type": "ImageObject",
        url: "https://cms.suncitystudios.in/uploads/Logo_4ce445b888.png"
      }
    }
  };

  return (
    <>
      {" "}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(videoSchemaData)}
        </script>
      </Helmet>
      <div className="relative  h-full rounded-xl lg:mx-8  mx-4  ">
        <div className="relative w-full h-full ">
          <motion.div
            initial={{ opacity: 0 }}
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
            >
              <source
                src={`https://cms.suncitystudios.in/${url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.7
          }}
          className="absolute inset-0  mt-4 md:mt-0 bottom-4 lg:bottom-16 flex gap-4 items-end justify-center px-2  md:px-16 w-full"
        >
          <div className="grid-cols-2  w-full gap-2 md:gap-0  text-white hidden md:grid">
            <div className=" self-center text-center md:text-left">
              <p className="uppercase font-Armavir md:text-2xl text-xl">
                {brand}
              </p>
              <h1 className="text-xs md:text-base font-medium">{title}</h1>
            </div>
          </div>
        </motion.div>
        <div className="absolute inset-0 text-center md:hidden flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7
            }}
            className="absolute inset-0  mt-4  flex gap-4 bg-gradient-to-t from-black/50 to-transparent  items-end justify-center p-2   w-full"
          >
            <div className="w-full gap-2 p-2 text-white flex items-center">
              <h1 className="uppercase font-Armavir ">
              {brand}
              </h1>
              <h1>|</h1>
              <h1 className="text-xs text-left font-medium">{title}</h1>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Player;
