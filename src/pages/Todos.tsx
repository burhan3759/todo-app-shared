import React from "react";
import TodoItem from "../component/TodoItem";
import AddTodoForm from "../component/AddTodoForm";
import "../styles.css";

import { todoList } from "../shared/data/todoList";

const Todos: React.FC = () => {

  const handleAddTodo = (newTodo: string) => {
    // code here ...
  };

  const handleDelete = (id: number) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this?"
    // );

    // code here ...
  };

  return (
    <div className="App" style={styles.container}>
      {/* Search Form */}
      <input
        type="text"
        placeholder="Search todos"
        onChange={(e) => console.log(e.target.value)}
        style={styles.searchInput}
        data-testid="search-input"
      />

      <AddTodoForm addTodo={handleAddTodo} />

      {/* Sample code for toggle button */}
      {/*
      <button 
        onClick={() => {}} 
        style={styles.button} 
        data-testid="toggle-completed-btn"
      >
        
        {showCompleted ? "Hide Completed" : "Show Completed"}
      </button> 
      */}

      <div style={styles.spacing} />
            
      <ul style={styles.todoList} data-testid="todo-item">
        <TodoItem
          todo={{ id: 1, desc: "Sample Learn React", completed: false }}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </ul>
    </div>
  );
};

export default Todos;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#fff",
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  searchInput: {
    width: "100%",
    borderColor: "#c2c2c2",
    borderWidth: "1px",
    borderRadius: "5px",
    padding: "8px",
    marginBottom: "20px",
  },
  button: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    margin: "20px 0",
    color: "#555",
  },
  error: {
    color: "red",
    textAlign: "center",
    margin: "20px 0",
  },
  todoList: {
    listStyleType: "none",
    padding: 0,
  },
  spacing: {
    marginBottom: 30,
  }
};
