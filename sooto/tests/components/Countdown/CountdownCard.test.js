import React from "react";
import renderer from "react-test-renderer";

import CountdownCard from "../../../components/Countdown/CountdownCard";

it("renders correctly", () => {
  const tree = renderer.create(<CountdownCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
