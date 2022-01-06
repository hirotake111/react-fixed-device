import Device from "./component/Device/Device";
import VideoUrl from "./assets/demo.mp4";

import "./App.css";
import { usePosition, useSize } from "./hooks";

function App() {
  const { size, changeSize } = useSize();
  const { position, changePosition } = usePosition();

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
            <button onClick={changeSize}>size: {size}</button>
            <button onClick={changePosition}>position: {position}</button>
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
