import React, { useState } from "react";

interface AddTodoProps {
  addTodo: (text: string) => void;
}

const AddTodoForm: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>("");

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        placeholder="Add new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
        data-testid="add-todo-input"
      />
      <button 
        onClick={handleAddTodo} 
        style={styles.button}
        data-testid="add-todo-btn"
      >
        Add
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    borderBottom: "1px solid #ddd",
    marginRight: "10px",
    padding: "5px",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default AddTodoForm;
