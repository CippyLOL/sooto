import React from "react";
import renderer from "react-test-renderer";

import CalendarEventCard from "../../../components/Calendar/CalendarEventCard";

const eventName = "event name";
const dateString = "2022-02-02";
const handleDelete = jest.fn();

it("renders correctly", () => {
  const tree = renderer
    .create(
      <CalendarEventCard
        eventName={eventName}
        dateString={dateString}
        handleDelete={handleDelete}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
