import React from "react";
import renderer from "react-test-renderer";

import DrawerContent from "../../../../components/Navigation/Drawer/DrawerContent";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}));

it("renders correctly", () => {
  const tree = renderer.create(<DrawerContent />).toJSON();
  expect(tree).toMatchSnapshot();
});
