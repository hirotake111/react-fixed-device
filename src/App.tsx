import Device from "./component/Device/Device";
import VideoUrl from "./assets/demo.mp4";

import "./App.css";
import { useState } from "react";

function App() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("lg");
  const [position, setPosition] = useState<
    "bottomRight" | "bottomLeft" | "Center"
  >("bottomRight");

  const handleClickSize = () => {
    switch (size) {
      case "sm":
        return setSize("lg");
      case "md":
        return setSize("sm");
      default:
        return setSize("md");
    }
  };

  const handleClickPosition = () => {
    switch (position) {
      case "bottomLeft":
        return setPosition("Center");
      case "Center":
        return setPosition("bottomRight");
      default:
        return setPosition("bottomLeft");
    }
  };

  return (
    <>
      <Device
        src={VideoUrl}
        type="glass"
        color="#184e77"
        loop
        size={size}
        position={position}
      />
      <div className="app">
        <header className="header">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <button onClick={handleClickSize}>size: {size}</button>
            <button onClick={handleClickPosition}>position: {position}</button>
          </div>
        </header>
        <div className="section color1"></div>
        <div className="section color2"></div>
        <div className="section color3"></div>
        <div className="section color4"></div>
        <div className="section color5"></div>
      </div>
    </>
  );
}

export default App;
