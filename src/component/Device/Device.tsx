import {
  useBackgroundColor,
  useDragAndDrop,
  useSizeAndPosition,
  useVideoPlay,
} from "../../hook/hooks";
import { DeviceMode, DeviceType, Position, Size } from "../../types";
import PlayIcon from "../PlayIcon/PlayIcon";

import styles from "./Device.module.css";

interface Props {
  src: string;
  poster?: string;
  type: DeviceType;
  mode?: DeviceMode;
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
  mode = "portrait",
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
  const { sizeInPx, positionProps } = useSizeAndPosition({
    size,
    position,
    mode,
  });
  const divRef = useDragAndDrop(draggable);

  return (
    <div
      ref={divRef}
      className={styles.reactFixedDevice}
      style={{ ...positionProps }}
    >
      {/** play button */}
      <div className={styles.reactFixedDevice__playbutton} onClick={play}>
        <div className={styles.reactFixedDevice__playButton__container}>
          {paused && <PlayIcon />}
        </div>
      </div>

      <div className={styles.reactFixedDevice__container}>
        <div
          className={styles.reactFixedDevice__frame}
          style={{
            backgroundColor: backgroundColor,
            width: sizeInPx.frame.width,
            height: sizeInPx.frame.height,
            borderRadius: sizeInPx.frame.borderRadius,
            padding: sizeInPx.frame.padding,
          }}
        >
          {type === "notch" && (
            <div
              aria-label="notch"
              className={styles.reactFixedDevice__notch}
              style={{
                backgroundColor: backgroundColor,
                height: sizeInPx.notch.height,
                borderRadius: `0 0 ${sizeInPx.notch.borderRadius}px ${sizeInPx.notch.borderRadius}px`,
              }}
            ></div>
          )}
          <div
            className={styles.reactFixedDevice__screen}
            style={{ borderRadius: sizeInPx.screen.borderRadius }}
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
