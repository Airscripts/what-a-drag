const data = {
  tasks: {
    "task-4": { id: "task-4", content: "Cook dinner" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
  },

  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },

    "column-2": {
      taskIds: [],
      id: "column-2",
      title: "Doing",
    },

    "column-3": {
      taskIds: [],
      title: "Done",
      id: "column-3",
    },
  },

  columnOrder: ["column-1", "column-2", "column-3"]
};

export default data;