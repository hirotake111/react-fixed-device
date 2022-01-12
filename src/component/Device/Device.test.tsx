import { render } from "@testing-library/react";

import Device from "./Device";

it("should have video element", () => {
  // expect.assertions(1);
  const { container } = render(
    <Device src="xxx.mp4" type="default" mode="portrait" />
  );
  expect(container.getElementsByTagName("video").length).toBe(1);
});

it("should have notch if type is 'notch'", () => {
  const { getByLabelText } = render(
    <Device src="xxx.mp4" type="notch" mode="portrait" />
  );
  expect(getByLabelText("notch").tagName).toBe("DIV");
});
