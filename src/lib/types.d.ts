export interface SizeInPx {
  frame: {
    width: number;
    height: number;
    borderRadius: number;
    padding: number;
  };
  notch: {
    height: number;
    borderRadius: number;
  };
  screen: {
    borderRadius: number;
  };
}

export type Size = "sm" | "md" | "lg";
export type Position = "bottomRight" | "bottomLeft" | "center";
export type DeviceType = "default" | "notch" | "glass";
