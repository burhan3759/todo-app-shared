import React from "react";

interface Todo {
  id: number;
  desc: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updatedTodo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const handleChange = () => {
    onUpdate(todo.id, { ...todo, completed: !todo.completed });
  };

  return (
    <div style={styles.container}>
      <span data-testid={`todo-desc-${todo.id}`}>{todo.desc}</span>
      <div style={styles.buttonsContainer}>
        {!todo.completed && (
          <>
            <button
              onClick={handleChange}
              style={{
                ...styles.button,
                backgroundColor: "#28a745",
                color: "#fff",
              }}
              data-testid={`done-todo-btn-${todo.id}`}
            >
              Done
            </button>
            <div style={{ width: 5 }} />
          </>
        )}
        <button 
          onClick={() => onDelete(todo.id)} 
          style={styles.button}
          data-testid={`delete-todo-btn-${todo.id}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginBottom: "25px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "3px",
  },
};
