import { CSSProperties, useMemo, useRef, useState } from "react";
import { DeviceType, Position, Size, SizeInPx } from "../types";

export const useVideoPlay = (autoPlay: boolean | undefined) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(!autoPlay);
  /**
   * plays video if it's paused, else stop it.
   */
  const play = () => {
    const video = ref.current!;
    if (paused) {
      video.play();
      setPaused(false);
      return;
    }
    video.pause();
    setPaused(true);
  };

  return { ref, paused, play };
};

export const useBackgroundColor = ({
  type,
  color,
}: {
  type: DeviceType;
  color?: string;
}) => {
  const backgroundColor = useMemo(() => {
    return type === "glass"
      ? "rgba(255, 255, 255, 0.25)" // if glass is specified, use glass color (not value 'color)
      : color
      ? color
      : "#fff"; // default color
  }, [type, color]);

  return { backgroundColor };
};

export const useSizeAndPosition = ({
  size,
  position,
}: {
  size?: Size;
  position?: Position;
}) => {
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
      case "center":
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

  return { sizeInPx, positionProps };
};
