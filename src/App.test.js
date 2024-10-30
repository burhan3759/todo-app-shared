import * as React from "react";
import App from "./App";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { todoList } from "./shared/data/todoList";

import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

const TEST_IDS = {
  searchInput: "search-input",
  todo: "todo-item",
  toggleCompleteBtn: "toggle-completed-btn",
  addTodoInput: "add-todo-input",
  addTodoBtn: "add-todo-btn",
  doneTodoBtn: "done-todo-btn",
  deleteTodoBtn: "delete-todo-btn",
};

const renderList = (list) => {
  for (let i = 0; i < list.length; i++) {
    const name = todo.children[i].children[0];
    expect(name).toHaveTextContent(list[i].name);
  }
};

let getByTestId;
let searchInput;
let todo;
let toggleCompleteBtn;
let addTodoInput;
let addTodoBtn;
let deleteTodoBtn;

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
    expect(todo.children).toHaveLength(todoList.length);
    renderList(todoList);
  });
});

describe("Functionality of search input", () => {
  it("Should be type text", () => {
    expect(searchInput).toHaveAttribute("type", "text");
  });

  it("Should show todos that have 'react' keyword only", () => {
    fireEvent.change(searchInput, { target: { value: "react" } });
    const todoReactList = [
      {
        id: 2,
        name: "Learn React Native",
        completed: true,
      },
      {
        id: 10,
        name: "React Native New",
        completed: false,
      }
    ];
    renderList(todoReactList);
  });

  it("Should show todos that have 'react' keyword and uncompleted status only", () => {
    fireEvent.change(searchInput, { target: { value: "react" } });
    // Hide completed todos
    fireEvent.click(toggleCompleteBtn);
    const todoReactList = [
      {
        id: 10,
        name: "React Native New",
        completed: false,
      }
    ];
    renderList(todoReactList);
  });

  it("Should show uncompleted todos only", () => {
    fireEvent.click(toggleCompleteBtn);
    const uncompletedTodoList = [
      {
        id: 1,
        name: "Hello World",
        completed: false,
      },
      {
        id: 3,
        name: "Finish Homework",
        completed: false,
      },
      {
        id: 4,
        name: "Buy Groceries",
        completed: false,
      },
      {
        id: 6,
        name: "Read a Book",
        completed: false,
      },
      {
        id: 8,
        name: "Prepare Presentation",
        completed: false,
      },
      {
        id: 10,
        name: "React Native New",
        completed: false,
      },
    ];
    
    renderList(uncompletedTodoList);
  });
});

describe("Functions of create, done, and delete", () => {
  it("Should add a new todo", () => {
    fireEvent.change(addTodoInput, { target: { value: "New Todo" } });
    fireEvent.click(addTodoBtn);
    renderList([...todoList, { id: 11, name: "New Todo", completed: false }]);
  });

  it("Should delete a todo with Id '8'", () => {
    window.confirm = jest.fn(() => true);

    const testId = `${TEST_IDS.deleteTodoBtn}-8`
    const deleteBtn = getByTestId(testId);
    fireEvent.click(deleteBtn);
    expect(screen.queryByTestId(testId)).toBeNull();
    expect(screen.queryByTestId(`todo-name-8`)).toBeNull();
  });

  it("Should mark the todo id '4' as done and done button is disappear", () => {
    const testId = `${TEST_IDS.doneTodoBtn}-4`
    const doneBtn = getByTestId(testId);
    fireEvent.click(doneBtn);
    expect(screen.queryByTestId(testId)).toBeNull();
    expect(screen.getByTestId(`todo-name-4`)).toHaveTextContent("Buy Groceries");
  });
});

describe("Functionality of done with completed btn", () => {
  it("Should mark the todo id '4' as done and toggle show completed to false", () => {
    const testId = `${TEST_IDS.doneTodoBtn}-4`
    const doneBtn = getByTestId(testId);
    fireEvent.click(doneBtn);
    fireEvent.click(toggleCompleteBtn);
    expect(screen.queryByTestId(`todo-name-4`)).not.toBeInTheDocument();
  });
});
