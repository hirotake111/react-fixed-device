/**
 * This is to avoid unstable_flushDiscreteUpdates warning
 * https://github.com/testing-library/react-testing-library/issues/470
 */
Object.defineProperty(HTMLMediaElement.prototype, "muted", {
  set: () => {},
});
