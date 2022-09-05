import React from "react";
import renderer from "react-test-renderer";

import KanbanCard from "../../../components/Kanban/KanbanCard";

it("renders correctly", () => {
  const tree = renderer.create(<KanbanCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
