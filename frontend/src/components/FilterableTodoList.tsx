import { useState } from "react";
import { Todo } from "../api/todos";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => Promise<void>;
  onTodoUpdate: (
    todoId: number,
    payload: { completed?: boolean; updatedTitle?: string }
  ) => Promise<void>;
};

export default function FilterableTodoList({
  todos,
  onTodoDelete,
  onTodoUpdate,
}: TodoListProps) {
  const [todoType, setTodoType] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (todoType === "all") {
      return true;
    }
    if (todoType === "completed") {
      return todo.completed === true;
    }
    if (todoType === "pending") {
      return todo.completed === false;
    }
  });

  const handleTodoUpdate = async (
    todoId: number,
    payload: { completed?: boolean; updatedTitle?: string }
  ) => {
    onTodoUpdate(todoId, payload);
  };

  return (
    <div>
      <select
        className="px-2 py-1 border-2 border-black"
        onChange={(e) => setTodoType(e.target.value)}
        value={todoType}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      {filteredTodos.length > 0 ? (
        <div className="flex flex-col border border-black gap-4 mt-8">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onTodoDelete={onTodoDelete}
              onTodoUpdate={handleTodoUpdate}
            />
          ))}
        </div>
      ) : (
        <h1 className="mt-8">There are no todos for this State.</h1>
      )}
    </div>
  );
}
