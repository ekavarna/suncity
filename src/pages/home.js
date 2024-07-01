// HomePage.js
import React from 'react';
import Player from '../components/player';
import Footer from '../components/footer';
import Who from '../components/Who';
import Nav from '../components/nav';

function HomePage({ projects }) {
  return (
    <div className="flex flex-col bg-black h-full w-full items-center gap-4 md:gap-8">
          <Nav />

      {projects.map((project) => (
        <div key={project.id} className="w-full bg-black h-full">
          <Player
            title={project.title}
            description={project.description}
            url={project.link}
          />
        </div>
      ))}
          <Who />
          <Footer />

    </div>
  );
}

export default HomePage;
