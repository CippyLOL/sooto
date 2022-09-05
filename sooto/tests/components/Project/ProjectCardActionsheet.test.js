import React from "react";
import renderer from "react-test-renderer";

import ProjectCardActionsheet from "../../../components/Project/ProjectCardActionsheet";

it("renders correctly", () => {
  const tree = renderer.create(<ProjectCardActionsheet />).toJSON();
  expect(tree).toMatchSnapshot();
});
