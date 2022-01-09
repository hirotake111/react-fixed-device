import Device from "./lib/component/Device/Device";
import VideoUrl from "./assets/demo.mp4";

import "./App.css";
import { useDeviceType, useDrag, usePosition, useSize } from "./hooks";

function App() {
  const { size, changeSize } = useSize();
  const { position, changePosition } = usePosition();
  const { deviceType, changeDeviceType } = useDeviceType();
  const { draggable, toggleDraggable } = useDrag();

  return (
    <>
      <Device
        src={VideoUrl}
        type={deviceType}
        color="#184e77"
        // loop
        // autoPlay
        draggable={draggable}
        size={size}
        position={position}
        onVideoEnd={() => console.log("vide ends!")}
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
            <button onClick={changeSize}>size: {size}</button>
            <button onClick={changePosition}>position: {position}</button>
            <button onClick={changeDeviceType}>type: {deviceType}</button>
            <button onClick={toggleDraggable}>
              draggable: {draggable ? "true" : "false"}
            </button>
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
