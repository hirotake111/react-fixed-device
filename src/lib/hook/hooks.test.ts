import { act, renderHook } from "@testing-library/react-hooks";
import { useVideoPlay, useBackgroundColor, useSizeAndPosition } from "./hooks";

const mockPlay = jest.fn();
const mockPause = jest.fn();

// mock React
jest.mock("react", () => {
  const react = jest.requireActual("react");
  return {
    ...react,
    useRef: () => ({
      current: {
        play: () => mockPlay(),
        pause: () => mockPause(),
      },
    }),
  };
});

beforeEach(() => {
  mockPlay.mockClear();
  mockPause.mockClear();
});

describe("useVideoPlay", () => {
  test("if value paused is true, play() should perform video.play() and set the value paused false", () => {
    expect.assertions(4);
    const { result } = renderHook(() => useVideoPlay(false));
    expect(result.current.paused).toBe(true);
    // when you run hook, you need to wrap it with act(), otherwise get a error
    act(() => {
      result.current.play();
    });
    expect(mockPlay).toHaveBeenCalledTimes(1);
    expect(mockPause).toHaveBeenCalledTimes(0);
    expect(result.current.paused).toBe(false);
  });

  test("if value paused is false, play() should perform video.pause() and the value paused remains false", () => {
    expect.assertions(4);
    const { result } = renderHook(() => useVideoPlay(true));
    expect(result.current.paused).toBe(false);
    // when you run hook, you need to wrap it with act(), otherwise get a error
    act(() => {
      result.current.play();
    });
    expect(mockPlay).toHaveBeenCalledTimes(0);
    expect(mockPause).toHaveBeenCalledTimes(1);
    expect(result.current.paused).toBe(true);
  });
});

describe("useBackgroundColor", () => {
  it("should return #fff by default", () => {
    const { result } = renderHook(() =>
      useBackgroundColor({ type: "default" })
    );
    expect(result.current.backgroundColor).toBe("#fff");
  });

  it("should return defined color", () => {
    const { result } = renderHook(() =>
      useBackgroundColor({ type: "default", color: "#ababab" })
    );
    expect(result.current.backgroundColor).toBe("#ababab");
  });

  it("should return glass color if type is glass", () => {
    const { result } = renderHook(() =>
      useBackgroundColor({ type: "glass", color: "#ababab" })
    );
    expect(result.current.backgroundColor).toBe("rgba(255, 255, 255, 0.25)");
  });
});

describe("useSizeAndPosition", () => {
  it("should return default size and position", () => {
    expect.assertions(2);
    const {
      result: { current },
    } = renderHook(() => useSizeAndPosition({}));
    expect(current.sizeInPx).toEqual({
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
    });
    expect(current.positionProps).toEqual({
      right: "32px",
      bottom: "32px",
    });
  });

  it("should return small size and position", () => {
    expect.assertions(2);
    const {
      result: { current },
    } = renderHook(() => useSizeAndPosition({ size: "sm" }));
    expect(current.sizeInPx).toEqual({
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
    });
    expect(current.positionProps).toEqual({
      right: "32px",
      bottom: "32px",
    });
  });
});

it("should return medium size and position", () => {
  expect.assertions(2);
  const {
    result: { current },
  } = renderHook(() => useSizeAndPosition({ size: "md" }));
  expect(current.sizeInPx).toEqual({
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
  });
  expect(current.positionProps).toEqual({
    right: "32px",
    bottom: "32px",
  });
});

it("should update positionProps if postion is 'bottomLeft'", () => {
  expect.assertions(2);
  const {
    result: { current },
  } = renderHook(() =>
    useSizeAndPosition({ size: "md", position: "bottomLeft" })
  );
  expect(current.sizeInPx).toEqual({
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
  });
  expect(current.positionProps).toEqual({
    left: "32px",
    bottom: "32px",
  });
});

it("should change positionProps if position is 'Center", () => {
  expect.assertions(2);
  const {
    result: { current },
  } = renderHook(() => useSizeAndPosition({ size: "md", position: "center" }));
  expect(current.sizeInPx).toEqual({
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
  });
  expect(current.positionProps).toEqual({
    top: `calc(50% - 240px / 2)`,
    left: `calc(50%  - 120px / 2)`,
  });
});
