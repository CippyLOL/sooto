import React from "react";
import renderer from "react-test-renderer";

import CalendarScreen from "../../screens/CalendarScreen";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}));

it("renders correctly", () => {
  const tree = renderer.create(<CalendarScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
