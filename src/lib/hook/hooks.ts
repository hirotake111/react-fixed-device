import {
  CSSProperties,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DeviceType, Position, Size, SizeInPx } from "../types";

export const useVideoPlay = (autoPlay: boolean | undefined) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(!autoPlay);
  /**
   * plays video if it's paused, else stop it.
   */
  const play = () => {
    // console.log("play!");
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
            width: 60,
            height: 120,
            borderRadius: 14,
            padding: 4,
          },
          notch: {
            height: 8,
            borderRadius: 4,
          },
          screen: {
            borderRadius: 10,
          },
        };
      case "md":
        return {
          frame: {
            width: 120,
            height: 240,
            borderRadius: 22,
            padding: 6,
          },
          notch: {
            height: 12,
            borderRadius: 8,
          },
          screen: {
            borderRadius: 16,
          },
        };

      default:
        return {
          frame: {
            width: 240,
            height: 480,
            borderRadius: 32,
            padding: 8,
          },
          notch: {
            height: 24,
            borderRadius: 16,
          },
          screen: {
            borderRadius: 24,
          },
        };
    }
  }, [size]);

  const positionProps = useMemo<CSSProperties>(() => {
    switch (position) {
      case "bottomLeft":
        return {
          top: `calc(100vh - (${sizeInPx.frame.height}px + 32px))`,
          left: "32px",
        };
      case "center":
        return {
          top: `calc(50% - ${sizeInPx.frame.height}px / 2)`,
          left: `calc(50%  - ${sizeInPx.frame.width}px / 2)`,
        };
      default:
        const value = window.innerWidth - 64 - sizeInPx.frame.width;
        return {
          top: `calc(100vh - (${sizeInPx.frame.height}px + 32px))`,
          left: `calc(100vw - (${sizeInPx.frame.width}px + 64px))`,
        };
    }
  }, [position, sizeInPx]);

  return { sizeInPx, positionProps };
};

export const useDragAndDrop = (draggable: boolean | undefined) => {
  const ref = useRef<HTMLDivElement>(null);
  let offsetX: number, offsetY: number;

  useEffect(() => {
    const div = ref.current;
    // if div is not defined, do nothing
    if (!div) return;

    /**
     * set offsetX and Y, then add mousemove event listener
     */
    const onMouseDown = (e: MouseEvent) => {
      if (!draggable) return;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      div.addEventListener("mousemove", onMouseMove);
    };

    /**
     * updates div.style.left
     */
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientX > 0) {
        div.style.left = `${e.pageX - offsetX}px`;
      }
      if (e.clientY > 0) {
        div.style.top = `${e.pageY - offsetY}px`;
      }
    };

    /**
     * this removes mousemove event listener
     */
    const onMouseUp = (e: MouseEvent) => {
      if (!draggable) return;
      // console.log("mouseup!");
      div.removeEventListener("mousemove", onMouseMove);
    };

    // add event listener
    div.addEventListener("mousedown", onMouseDown);
    div.addEventListener("mouseup", onMouseUp);

    return () => {
      // remove all event listener
      div.removeEventListener("mousedown", onMouseDown);
      div.removeEventListener("mousemove", onMouseMove);
      div.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref, draggable]);

  return ref;
};
