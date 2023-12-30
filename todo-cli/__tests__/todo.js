const todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suites", () => {
  beforeEach(() => {
    add({
      title: "Test todo0",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Test todo0 yesterday",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0],
    });
    add({
      title: "Test todo0 tomorrow",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    });
  });

  test("Creates a new todo", () => {
    const itemCount = all.length;
   
    add({
      title: "Test todo1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(itemCount + 1);
  });

  test("Checks marking a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Checks retrieval of overdue items", () => {
    const itemCount = overdue().length;
    add({
      title: "Test todo1 yesterday",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0],
    });
    expect(overdue().length).toBe(itemCount + 1);
  });

  test("Checks retrieval of dueToday items", () => {
    const itemCount = dueToday().length;
    add({
      title: "Test todo2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(dueToday().length).toBe(itemCount + 1);
  });

  test("Checks retrieval of dueLater items", () => {
    const itemCount = dueLater().length;
    add({
      title: "Test todo1 tomorrow",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    });
    expect(dueLater().length).toBe(itemCount + 1);
  });
});
