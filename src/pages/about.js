import React from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";

export default function About() {
  return (
    <div className="w-full h-full bg-black">
      <Nav />
      <div className="mx-4 my-24 lg:mx-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 h-full mt-8">
        <div className="relative aspect-[4/3] object-cover">
          <img
            src="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="h-full w-full border-4  transform scale-105 shadow-lg"
          />
          <div className="absolute inset-0 border-4  transform scale-105 -rotate-2"></div>
        </div>
        <div className="space-y-8 my-auto">
          <h1 className="font-Armavir text-center md:text-left text-3xl md:text-5xl uppercase">
            About the director
          </h1>
          <p className="h-full text-justify font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sed,
            fugiat illum placeat repudiandae explicabo ex earum molestiae nemo!
            Adipisci similique dolore consequatur sunt fuga consequuntur
            voluptatibus rerum magnam veniam officiis eum minima quae aliquid
            expedita nobis ipsa cum unde ex beatae quia odit error eaque, ad
            excepturi. voluptates quis fugit nisi ex vero? Minima laborum nam
            asperiores harum illum velit. Sit, quaerat molestiae! Amet atque ut
            corporis omnis, voluptas error quidem nihil. Dicta eos placeat fuga
            suscipit, harum earum. Dicta qui culpa eius iste praesentium omnis
            incidunt rerum quaerat sint, voluptatem quod doloribus aliquam dolor
            esse dolorum ratione vel quas enim eveniet.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
