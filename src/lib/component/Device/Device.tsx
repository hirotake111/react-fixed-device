import {
  useBackgroundColor,
  useSizeAndPosition,
  useVideoPlay,
} from "../../hook/hooks";
import { DeviceType, Position, Size } from "../../types";
import PlayIcon from "../PlayIcon/PlayIcon";
import "./Device.css";

interface Props {
  src: string;
  poster?: string;
  type: DeviceType;
  loop?: boolean;
  color?: string;
  size?: Size;
  autoPlay?: boolean;
  position?: Position;
}

export default function Device({
  src,
  type,
  poster,
  loop,
  autoPlay,
  color,
  size,
  position,
}: Props) {
  const { ref, paused, play } = useVideoPlay(autoPlay);
  const { backgroundColor } = useBackgroundColor({ type, color });
  const { sizeInPx, positionProps } = useSizeAndPosition({ size, position });

  return (
    <div className="reactFixedDevice" style={{ ...positionProps }}>
      {/** play button */}
      <div className="reactFixedDevice__playbutton" onClick={play}>
        <div className="reactFixedDevice__playButton__container">
          {paused && <PlayIcon />}
        </div>
      </div>

      <div className="reactFixedDevice__container">
        <div
          className={"reactFixedDevice__frame"}
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
              className={"reactFixedDevice__notch"}
              style={{
                backgroundColor: backgroundColor,
                height: sizeInPx.notch.height,
                borderRadius: sizeInPx.notch.borderRadius,
              }}
            ></div>
          )}
          <div
            className="reactFixedDevice__screen"
            style={{
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
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}