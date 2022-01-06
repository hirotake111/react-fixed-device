import { CSSProperties, useMemo } from "react";
import "./Device.css";

interface SizeInPx {
  frame: {
    width: string;
    height: string;
    borderRadius: string;
    padding: string;
  };
  notch: {
    height: string;
    borderRadius: string;
  };
  screen: {
    borderRadius: string;
  };
}

export type Size = "sm" | "md" | "lg";
export type Position = "bottomRight" | "bottomLeft" | "Center";

interface Props {
  src: string;
  poster?: string;
  type: "default" | "notch" | "glass";
  loop?: boolean;
  color?: string;
  size?: Size;
  position?: Position;
}

export default function Device({
  src,
  type,
  poster,
  loop,
  color,
  size,
  position,
}: Props) {
  const backgroundColor = useMemo(() => {
    return type === "glass"
      ? "rgba(255, 255, 255, 0.25)" // if glass is specified, use glass color (not value 'color)
      : color
      ? color
      : "#fff"; // default color
  }, [type, color]);

  const sizeInPx: SizeInPx = useMemo(() => {
    switch (size) {
      case "sm":
        return {
          frame: {
            width: "60px",
            height: "120px",
            borderRadius: "14px",
            padding: "4px",
          },
          notch: {
            height: "8px",
            borderRadius: "0 0 4px 4px",
          },
          screen: {
            borderRadius: "10px",
          },
        };
      case "md":
        return {
          frame: {
            width: "120px",
            height: "240px",
            borderRadius: "22px",
            padding: "6px",
          },
          notch: {
            height: "12px",
            borderRadius: "0 0 8px 8px",
          },
          screen: {
            borderRadius: "16px",
          },
        };

      default:
        return {
          frame: {
            width: "240px",
            height: "480px",
            borderRadius: "32px",
            padding: "8px",
          },
          notch: {
            height: "24px",
            borderRadius: "0 0 16px 16px",
          },
          screen: {
            borderRadius: "24px",
          },
        };
    }
  }, [size]);

  const positionProps = useMemo<CSSProperties>(() => {
    switch (position) {
      case "bottomLeft":
        return {
          left: "32px",
          bottom: "32px",
        };
      case "Center":
        return {
          top: `calc(50% - ${sizeInPx.frame.height} / 2)`,
          left: `calc(50%  - ${sizeInPx.frame.width} / 2)`,
        };
      default:
        return {
          right: "32px",
          bottom: "32px",
        };
    }
  }, [position, sizeInPx]);

  return (
    <div className="device" style={{ ...positionProps }}>
      <div className="device__container">
        <div
          className={"device__frame"}
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
              className={"device__notch"}
              style={{
                backgroundColor: backgroundColor,
                height: sizeInPx.notch.height,
                borderRadius: sizeInPx.notch.borderRadius,
              }}
            ></div>
          )}
          <div
            className="device__screen"
            style={{
              borderRadius: sizeInPx.screen.borderRadius,
            }}
          >
            <video src={src} poster={poster} autoPlay muted loop={loop}></video>
          </div>
        </div>
      </div>
    </div>
  );
}
