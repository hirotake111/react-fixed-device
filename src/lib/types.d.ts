export interface SizeInPx {
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
export type DeviceType = "default" | "notch" | "glass";
