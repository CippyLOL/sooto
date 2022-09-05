import React from "react";
import renderer from "react-test-renderer";

import KanbanCardActionsheet from "../../../components/Kanban/KanbanCardActionsheet";

const boardNames = ["todo", "inprogress", "done"];

it("renders correctly", () => {
  const tree = renderer
    .create(<KanbanCardActionsheet boardNames={boardNames} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
