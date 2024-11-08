import * as React from "react";
import App from "./App";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { todoList } from "./shared/data/todoList";

import "@testing-library/jest-dom/extend-expect";


const TEST_IDS = {
  searchInput: "search-input",
  todo: "todo-item",
  toggleCompleteBtn: "toggle-completed-btn",
  addTodoInput: "add-todo-input",
  addTodoBtn: "add-todo-btn",
  doneTodoBtn: "done-todo-btn",
  deleteTodoBtn: "delete-todo-btn",
  todoDesc: "todo-desc",
};

const renderList = (list) => {
  list.forEach((item) => {
    const todoDesc = screen.getByTestId(`${TEST_IDS.todoDesc}-${item.id}`);
    expect(todoDesc).toHaveTextContent(item.desc);
  });
};

const listThatShouldNotShow = (list) => {
  list.forEach((item) => {
    const todoDesc = screen.getByTestId(`${TEST_IDS.todoDesc}-${item.id}`);
    expect(todoDesc).toBeNull();
  });
};

let getByTestId;
let searchInput;
let todo;
let toggleCompleteBtn;
let addTodoInput;
let addTodoBtn;

beforeEach(() => {
  const app = render(<App />);
  getByTestId = app.getByTestId;
  searchInput = getByTestId(TEST_IDS.searchInput);
  todo = getByTestId(TEST_IDS.todo);
  toggleCompleteBtn = getByTestId(TEST_IDS.toggleCompleteBtn);
  addTodoInput = getByTestId(TEST_IDS.addTodoInput);
  addTodoBtn = getByTestId(TEST_IDS.addTodoBtn);
});

afterEach(() => {
  cleanup();
});

describe("Initial rendering", () => {
  it("Should display description of 10 todos", () => {
    renderList(todoList);
  });
});

describe("Functionality of search input", () => {
  // it("Should be type text", () => {
  //   expect(searchInput).toHaveAttribute("type", "text");
  // });

  it("Should show uncompleted todos only", () => {
    fireEvent.click(toggleCompleteBtn);
    const uncompletedTodoList = [
      {
        id: 1,
        desc: "Hello World",
        completed: false,
      },
      {
        id: 3,
        desc: "Finish Homework",
        completed: false,
      },
      {
        id: 4,
        desc: "Buy Groceries",
        completed: false,
      },
      {
        id: 6,
        desc: "Read a Book",
        completed: false,
      },
      {
        id: 8,
        desc: "Prepare Presentation",
        completed: false,
      },
      {
        id: 10,
        desc: "React Native New",
        completed: false,
      },
    ];

    renderList(uncompletedTodoList);
    listThatShouldNotShow([
      {
        id: 2,
        desc: "Learn React Native",
        completed: true,
      }
    ])
  });

  describe("Search input value `react`", () => {
    it("Should show todos that have 'react' keyword only", () => {
      fireEvent.change(searchInput, { target: { value: "react" } });
      const todoReactList = [
        {
          id: 2,
          desc: "Learn React Native",
          completed: true,
        },
        {
          id: 10,
          desc: "React Native New",
          completed: false,
        }
      ];
      renderList(todoReactList);
      listThatShouldNotShow([
        {
          id: 1,
          desc: "Hello World",
          completed: false,
        }
      ])
    });

    it("Should show todos that have 'react' keyword and uncompleted status only", () => {
      fireEvent.change(searchInput, { target: { value: "react" } });
      // Hide completed todos
      fireEvent.click(toggleCompleteBtn);
      const todoReactList = [
        {
          id: 10,
          desc: "React Native New",
          completed: false,
        }
      ];
      renderList(todoReactList);
      listThatShouldNotShow([
        {
          id: 10,
          desc: "React Native New",
          completed: false,
        }
      ])
    });
  });
});

describe("Functions of create, done, and delete", () => {
  it("Should add a new todo", () => {
    fireEvent.change(addTodoInput, { target: { value: "New Todo" } });
    fireEvent.click(addTodoBtn);
    renderList([...todoList, { id: 11, desc: "New Todo", completed: false }]);
  });

  it("Should mark the todo id '4' as done and done button is disappear", () => {
    const testId = `${TEST_IDS.doneTodoBtn}-4`
    const doneBtn = getByTestId(testId);
    const todoTestId = `${TEST_IDS.todoDesc}-4`;

    fireEvent.click(doneBtn);

    expect(screen.queryByTestId(testId)).toBeNull();
    expect(screen.getByTestId(todoTestId)).toHaveTextContent(todoList[3].desc);
  });

  // delete function
  describe("Functionality of Delete", () => {
    it("Should delete a todo with Id '8'", () => {
      window.confirm = jest.fn(() => true);

      const testId = `${TEST_IDS.deleteTodoBtn}-8`
      const deleteBtn = getByTestId(testId);
      const todoTestId = `${TEST_IDS.todoDesc}-8`;

      fireEvent.click(deleteBtn);

      expect(screen.queryByTestId(todoTestId)).toBeNull();
    });

    it("Should not delete a todo with Id '8' if delete is canceled", () => {
      window.confirm = jest.fn(() => false);

      const testId = `${TEST_IDS.deleteTodoBtn}-8`
      const deleteBtn = getByTestId(testId);
      const todoTestId = `${TEST_IDS.todoDesc}-8`;

      fireEvent.click(deleteBtn);

      expect(screen.queryByTestId(todoTestId)).not.toBeNull();
    });
  });

  describe("Functionality of done with toggle show completed to false", () => {
    it("Should mark the todo id '4' as done and it's hidden", () => {
      const testId = `${TEST_IDS.doneTodoBtn}-4`
      const doneBtn = getByTestId(testId);
      const todoTestId = `${TEST_IDS.todoDesc}-4`;
  
      fireEvent.click(doneBtn);
      fireEvent.click(toggleCompleteBtn);
  
      expect(screen.queryByTestId(todoTestId)).not.toBeInTheDocument();
    });
  });
});
