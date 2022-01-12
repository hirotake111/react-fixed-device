import { useState } from "react";
import { DeviceType, Position, Size, DeviceMode } from "../src/types";

export const useDeviceMode = () => {
  const [mode, setMode] = useState<DeviceMode>("portrait");
  const toggleMode = () => {
    setMode(mode === "portrait" ? "landscape" : "portrait");
  };
  return { mode, toggleMode };
};

export const useSize = () => {
  const [size, setSize] = useState<Size>("md");

  const changeSize = () => {
    switch (size) {
      case "sm":
        return setSize("lg");
      case "md":
        return setSize("sm");
      default:
        return setSize("md");
    }
  };

  return { size, changeSize };
};

export const usePosition = () => {
  const [position, setPosition] = useState<Position>("bottomRight");

  const changePosition = () => {
    switch (position) {
      case "bottomLeft":
        return setPosition("center");
      case "center":
        return setPosition("bottomRight");
      default:
        return setPosition("bottomLeft");
    }
  };

  return { position, changePosition };
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("default");

  const changeDeviceType = () => {
    switch (deviceType) {
      case "notch":
        return setDeviceType("glass");
      case "glass":
        return setDeviceType("default");
      default:
        return setDeviceType("notch");
    }
  };

  return { deviceType, changeDeviceType };
};

export const useDrag = () => {
  const [draggable, setDraggable] = useState(false);
  const toggleDraggable = () => {
    setDraggable(!draggable);
  };
  return { draggable, toggleDraggable };
};
