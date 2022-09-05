import React from "react";
import renderer from "react-test-renderer";

import KanbanScreen from "../../screens/KanbanScreen";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}));

it("renders correctly", () => {
  const tree = renderer.create(<KanbanScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
