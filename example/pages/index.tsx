import type { NextPage } from "next";

import Device from "react-fixed-device";
import { useDeviceType, useDrag, usePosition, useSize } from "../hooks";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { size, changeSize } = useSize();
  const { position, changePosition } = usePosition();
  const { deviceType, changeDeviceType } = useDeviceType();
  const { draggable, toggleDraggable } = useDrag();

  return (
    <>
      <Device
        src="demo.mp4"
        type={deviceType}
        color="#184e77"
        loop
        autoPlay
        control
        draggable={draggable}
        size={size}
        position={position}
        onVideoEnd={() => console.log("video ends!")}
      />
      <div className={styles.app}>
        <header className={styles.header}>
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
        <div className={[styles.section, styles.color1].join(" ")}></div>
        <div className={[styles.section, styles.color2].join(" ")}></div>
        <div className={[styles.section, styles.color3].join(" ")}></div>
        <div className={[styles.section, styles.color4].join(" ")}></div>
        <div className={[styles.section, styles.color5].join(" ")}></div>
      </div>
    </>
  );
};

export default Home;
