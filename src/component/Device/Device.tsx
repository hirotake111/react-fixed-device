import { CSSProperties } from "react";
import {
  useBackgroundColor,
  useDragAndDrop,
  useSizeAndPosition,
  useVideoPlay,
} from "../../hook/hooks";
import { DeviceType, Position, Size } from "../../types";
import PlayIcon from "../PlayIcon/PlayIcon";

const styles: { [key: string]: CSSProperties } = {
  reactFixedDevice: { position: "fixed", zIndex: 1 },
  reactFixedDevice__container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  reactFixedDevice__frame: {
    display: "flex",
    justifyContent: "center",
    padding: "8px",
    width: "240px",
    height: "480px",
    borderRadius: "32px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(5.5px)",
    WebkitBackdropFilter: "blur(5.5px)",
  },
  reactFixedDevice__notch: {
    position: "absolute",
    width: "50%",
    height: "24px",
    borderRadius: "0 0 16px 16px",
  },
  reactFixedDevice__screen: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: "24px",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  reactFixedDevice__playbutton: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  reactFixedDevice__playButton__container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
};

interface Props {
  src: string;
  poster?: string;
  type: DeviceType;
  loop?: boolean;
  color?: string;
  size?: Size;
  autoPlay?: boolean;
  control?: boolean;
  position?: Position;
  draggable?: boolean;
  onVideoEnd?: () => void;
}

export default function Device({
  src,
  type,
  poster,
  loop = false,
  autoPlay = false,
  control = false,
  color,
  size = "md",
  position,
  draggable = false,
  onVideoEnd,
}: Props) {
  const { ref, paused, play } = useVideoPlay(autoPlay, control);
  const { backgroundColor } = useBackgroundColor({ type, color });
  const { sizeInPx, positionProps } = useSizeAndPosition({ size, position });
  const divRef = useDragAndDrop(draggable);

  return (
    <div ref={divRef} style={{ ...styles.reactFixedDevice, ...positionProps }}>
      {/** play button */}
      <div style={styles.reactFixedDevice__playbutton} onClick={play}>
        <div style={styles.reactFixedDevice__playButton__container}>
          {paused && <PlayIcon />}
        </div>
      </div>

      <div style={styles.reactFixedDevice__container}>
        <div
          style={{
            ...styles.reactFixedDevice__frame,
            backgroundColor: backgroundColor,
            width: sizeInPx.frame.width,
            height: sizeInPx.frame.height,
            borderRadius: sizeInPx.frame.borderRadius,
            padding: sizeInPx.frame.padding,
          }}
        >
          {type === "notch" && (
            <div
              style={{
                ...styles.reactFixedDevice__notch,
                backgroundColor: backgroundColor,
                height: sizeInPx.notch.height,
                borderRadius: `0 0 ${sizeInPx.notch.borderRadius}px ${sizeInPx.notch.borderRadius}px`,
              }}
            ></div>
          )}
          <div
            style={{
              ...styles.reactFixedDevice__screen,
              borderRadius: sizeInPx.screen.borderRadius,
            }}
          >
            {/** vieo element */}
            <video
              src={src}
              poster={poster}
              autoPlay={autoPlay}
              muted
              loop={loop}
              ref={ref}
              style={{ objectFit: "cover" }}
              onEnded={onVideoEnd}
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}
