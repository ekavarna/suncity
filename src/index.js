import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import "./index.css";
import AnimatedCursor from "react-animated-cursor";

const root = ReactDOM.createRoot(document.getElementById("root")); 

root.render(
  <React.StrictMode>
    <div className="hidden md:block">
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        showSystemCursor={false}
        hasBlendMode={true}
        outerStyle={{
          border: "3px solid white",
          mixBlendMode: "difference", 

        }}
        innerStyle={{
          backgroundColor: "white",
          mixBlendMode: "difference", 

        }}
        
      />
    </div>
    <App />
  </React.StrictMode>
);
