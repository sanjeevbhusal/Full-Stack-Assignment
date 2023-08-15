import { useState } from "react";
import { Todo } from "../api/todos";
import Button from "./Button";

type TodoItemProps = {
  todo: Todo;
  onTodoDelete: (todoId: number) => Promise<void>;
  onTodoUpdate: (
    todoId: number,
    payload: { completed?: boolean; title?: string }
  ) => Promise<void>;
};

export default function TodoItem({
  todo,
  onTodoDelete,
  onTodoUpdate,
}: TodoItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  return (
    <div className="border-b border-b-black px-4 py-2 flex justify-between gap-4 items-center">
      <div className="grow">
        {editMode ? (
          <textarea
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border-2 border-black px-2 py-1 w-full"
          />
        ) : (
          <p
            className={`text-2xl text-left ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>
      <div className="flex">
        <Button
          className={`w-[10rem] text-white ${
            todo.completed ? "bg-orange-300" : "bg-blue-500"
          } `}
          onClick={() => {
            setEditMode(false);
            onTodoUpdate(todo.id, { completed: !todo.completed });
          }}
        >
          {todo.completed ? "Mark as Pending" : "Mark as Complete"}
        </Button>

        {editMode ? (
          <Button
            className="px-4 py-1 ml-4 bg-green-500 text-white"
            onClick={() => {
              onTodoUpdate(todo.id, { title: updatedTitle });
              setEditMode(false);
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            className="px-4 py-1 ml-4 bg-green-500 text-white"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        )}

        <Button
          className="px-4 py-1 bg-red-500 text-white ml-4"
          onClick={() => onTodoDelete(todo.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
