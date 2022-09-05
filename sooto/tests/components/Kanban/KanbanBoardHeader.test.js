import React from "react";
import renderer from "react-test-renderer";

import KanbanBoardHeader from "../../../components/Kanban/KanbanBoardHeader";

it("renders correctly", () => {
  const tree = renderer.create(<KanbanBoardHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
