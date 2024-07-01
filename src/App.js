import React from 'react';
import { Routes, Route } from 'react-router-dom';

import About from './pages/about';
import Brands from './pages/brand';
import HomePage from './pages/home';



function App() {
  const projects = [
    {
      id: 1,
      title: "Matthias Leidinger | Arijit Singh  ",
      description:
        "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
      link: "https://videos.pexels.com/video-files/4631982/4631982-hd_1366_720_50fps.mp4"
    },
    {
      id: 2,
      title: "Lord Voldemort | Arijit Singh | hehehe | Kuch bhii ",
      description:
        "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky",
      link: "https://videos.pexels.com/video-files/4231734/4231734-hd_1280_720_24fps.mp4"
    },
    {
      id: 3,
      title: "Ronald Wheasly | Bloody Marry | Muggle",
      description:
        "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
      link: "https://videos.pexels.com/video-files/4761600/4761600-hd_1280_720_25fps.mp4"
    },
    {
      id: 4,
      title: "Nevil Longbottom | Anisht Dev |  ",
      description:
        "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
      link: "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4"
    }
  ];

  return (
    <div className="bg-black font-Roboto text-white h-full w-screen">
    <Routes>
      <Route path="/" element={<HomePage projects={projects} />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
  );
}

export default App;
