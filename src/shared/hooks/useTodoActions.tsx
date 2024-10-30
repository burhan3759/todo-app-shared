import { useState, useEffect } from "react";

interface Todo {
  id: number;
  desc: string;
  completed: boolean;
}

interface UseTodoActionsProps {
  todos: Todo[];
}

interface UseTodoActionsResult {
  filteredTodos: Todo[];
  showCompleted: boolean;
  searchTodos: (searchedText: string) => void;
  toggleShowCompleted: () => void;
}

export const useTodoActions = ({
  todos,
}: UseTodoActionsProps): UseTodoActionsResult => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchTodos = (searchedText: string) => {
    setSearchTerm(searchedText);
  };

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const filterByCompletedStatus = (todos: Todo[]): Todo[] => {
    return todos.filter((todo) => showCompleted || !todo.completed);
  };

  const filterBySearchTerm = (todos: Todo[]): Todo[] => {
    return todos.filter((todo) =>
      todo.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    let results = filterByCompletedStatus(todos);
    results = filterBySearchTerm(results);
    setFilteredTodos(results);
  }, [todos, searchTerm, showCompleted]);

  return {
    filteredTodos,
    showCompleted,
    searchTodos,
    toggleShowCompleted,
  };
};
