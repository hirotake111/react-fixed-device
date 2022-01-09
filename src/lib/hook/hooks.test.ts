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
    const { result } = renderHook(() => useVideoPlay(false, true));
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
    const { result } = renderHook(() => useVideoPlay(true, true));
    expect(result.current.paused).toBe(false);
    // when you run hook, you need to wrap it with act(), otherwise get a error
    act(() => {
      result.current.play();
    });
    expect(result.current.paused).toBe(true);
    expect(mockPlay).toHaveBeenCalledTimes(0);
    expect(mockPause).toHaveBeenCalledTimes(1);
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
    });
    expect(current.positionProps).toEqual({
      left: "calc(100vw - (240px + 64px))",
      top: "calc(100vh - (480px + 64px))",
    });
  });

  it("should return small size and position", () => {
    expect.assertions(2);
    const {
      result: { current },
    } = renderHook(() => useSizeAndPosition({ size: "sm" }));
    expect(current.sizeInPx).toEqual({
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
    });
    expect(current.positionProps).toEqual({
      left: "calc(100vw - (60px + 64px))",
      top: "calc(100vh - (120px + 64px))",
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
  });
  expect(current.positionProps).toEqual({
    left: "calc(100vw - (120px + 64px))",
    top: "calc(100vh - (240px + 64px))",
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
  });
  expect(current.positionProps).toEqual({
    left: "32px",
    top: "calc(100vh - (240px + 64px))",
  });
});

it("should change positionProps if position is 'Center", () => {
  expect.assertions(2);
  const {
    result: { current },
  } = renderHook(() => useSizeAndPosition({ size: "md", position: "center" }));
  expect(current.sizeInPx).toEqual({
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
  });
  expect(current.positionProps).toEqual({
    top: `calc(50% - 240px / 2)`,
    left: `calc(50%  - 120px / 2)`,
  });
});
