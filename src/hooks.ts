import { useState } from "react";
import { Position, Size } from "./component/Device/Device";

export const useSize = () => {
  const [size, setSize] = useState<Size>("lg");

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
        return setPosition("Center");
      case "Center":
        return setPosition("bottomRight");
      default:
        return setPosition("bottomLeft");
    }
  };

  return { position, changePosition };
};
