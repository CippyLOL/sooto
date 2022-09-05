export const kanbanTemplate = {
  boardNames: ["To Do", "In Progress", "Done"],
  boards: [
    {
      boardId: 1,
      boardName: "To Do",
      boardCards: [
        {
          cardId: "1a",
          cardLabel: "to do",
          cardDescription: "to do card example",
        },
      ],
    },
    {
      boardId: 2,
      boardName: "In Progress",
      boardCards: [
        {
          cardId: "1b",
          cardLabel: "in progress",
          cardDescription: "in progress card example",
        },
      ],
    },
    {
      boardId: 3,
      boardName: "Done",
      boardCards: [
        {
          cardId: "1c",
          cardLabel: "done",
          cardDescription: "done card example",
        },
      ],
    },
  ],
};

export const noneTemplate = {
  boardNames: [],
  boards: [],
};

// bullet journal logs
export const bulletLogsTemplate = {
  boardNames: ["Today", "This Week", "This Month"],
  boards: [
    {
      boardId: 1,
      boardName: "Today",
      boardCards: [
        {
          cardId: "1a",
          cardLabel: "today",
          cardDescription: "today card example",
        },
      ],
    },
    {
      boardId: 2,
      boardName: "This Week",
      boardCards: [
        {
          cardId: "1b",
          cardLabel: "this week",
          cardDescription: "this week card example",
        },
      ],
    },
    {
      boardId: 3,
      boardName: "This Month",
      boardCards: [
        {
          cardId: "1c",
          cardLabel: "this month",
          cardDescription: "this month card example",
        },
      ],
    },
  ],
};

export const eisenhowerMatrixTemplate = {
  boardNames: ["Do", "Schedule", "Delegate", "Delete"],
  boards: [
    {
      boardId: 1,
      boardName: "Do",
      boardCards: [
        {
          cardId: "1a",
          cardLabel: "Urgent and Important",
          cardDescription: "Do the task",
        },
      ],
    },
    {
      boardId: 2,
      boardName: "Schedule",
      boardCards: [
        {
          cardId: "1b",
          cardLabel: "Not Urgent and Important",
          cardDescription: "Plan task",
        },
      ],
    },
    {
      boardId: 3,
      boardName: "Delegate",
      boardCards: [
        {
          cardId: "1c",
          cardLabel: "Urgent and Not Important",
          cardDescription: "If possible, give task away",
        },
      ],
    },
    {
      boardId: 4,
      boardName: "Delete",
      boardCards: [
        {
          cardId: "1d",
          cardLabel: "Not Urgent and Not Important",
          cardDescription: "delete task",
        },
      ],
    },
  ],
};
