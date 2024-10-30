import { useState, useEffect } from "react";
import { todoList } from "../data/todoList";

interface Todo {
  id: number;
  desc: string;
  completed: boolean;
}

interface UseTodosResult {
  todos: Todo[];
  filteredTodos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (todo: string) => void;
  updateTodo: (id: number, updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
}

export const useTodos = (): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  // Fetch to-dos
  const fetchTodos = () => {
    setLoading(true);
    setError(null);

    setTodos(todoList);
    setLoading(false);
  };

  // Add a to-do
  const addTodo = (todo: string) => {
    const generatedId = todos.length + 1;
    setTodos((prev) => [
      ...prev,
      {
        id: generatedId,
        desc: todo,
        completed: false,
      },
    ]);
  };

  // Update a to-do
  const updateTodo = (id: number, updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // Delete a to-do
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    filteredTodos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
