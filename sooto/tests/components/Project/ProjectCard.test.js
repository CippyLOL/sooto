import React from "react";
import renderer from "react-test-renderer";

import ProjectCard from "../../../components/Project/ProjectCard";

it("renders correctly", () => {
  const tree = renderer.create(<ProjectCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
