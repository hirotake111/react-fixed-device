import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { DeviceType, Position, Size, SizeInPx } from "../types";

export const useVideoPlay = (autoPlay: boolean, control: boolean) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(!autoPlay);
  /**
   * plays video if it's paused, else stop it.
   */
  const play = () => {
    if (!control) return;
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
            width: 55,
            height: 120,
            borderRadius: 9,
            padding: 3,
          },
          notch: {
            height: 5,
            borderRadius: 3,
          },
          screen: {
            borderRadius: 5,
          },
        };
      case "md":
        return {
          frame: {
            width: 110,
            height: 240,
            borderRadius: 18,
            padding: 5,
          },
          notch: {
            height: 9,
            borderRadius: 6,
          },
          screen: {
            borderRadius: 12,
          },
        };

      default:
        // large
        return {
          frame: {
            width: 220,
            height: 480,
            borderRadius: 32,
            padding: 8,
          },
          notch: {
            height: 16,
            borderRadius: 12,
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
          top: `calc(100vh - (${sizeInPx.frame.height}px + 64px))`,
          left: "32px",
        };
      case "center":
        return {
          top: `calc(50% - ${sizeInPx.frame.height}px / 2)`,
          left: `calc(50%  - ${sizeInPx.frame.width}px / 2)`,
        };
      default:
        return {
          top: `calc(100vh - (${sizeInPx.frame.height}px + 64px))`,
          left: `calc(100vw - (${sizeInPx.frame.width}px + 64px))`,
        };
    }
  }, [position, sizeInPx]);

  return { sizeInPx, positionProps };
};

export const useDragAndDrop = (draggable: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  let offsetX: number, offsetY: number;

  useEffect(() => {
    const div = ref.current;
    if (!div) return;
    if (!draggable) return;

    /**
     * set offsetX and Y, then add mousemove event listener
     */
    const onMouseDown = (e: MouseEvent) => {
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
    const onMouseUp = () => {
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
