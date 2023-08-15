import { useEffect, useState } from "react";
import "./App.css";
import {
  Todo,
  addTodo,
  getTodos,
  deleteTodoById,
  updateTodoById,
} from "./api/todos";
import TodoAdd from "./components/TodoAdd";
import FilterableTodoList from "./components/FilterableTodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then((todos) => setTodos(todos))
      .catch(() => alert("something went wrong"));
  }, []);

  const handleTodoAdd = async (todoText: string) => {
    try {
      const todo = await addTodo(todoText);
      setTodos([todo, ...todos]);
    } catch (error) {
      alert("Something went wrong...");
    }
  };

  const handleTodoDelete = async (todoId: number) => {
    try {
      await deleteTodoById(todoId);
      const newTodoList = todos.filter((todo) => todo.id !== todoId);
      setTodos(newTodoList);
    } catch (error) {
      alert("Something went wrong...");
    }
  };

  const handleTodoUpdate = async (
    todoId: number,
    payload: { completed?: boolean; title?: string }
  ) => {
    try {
      const updatedTodo = await updateTodoById(todoId, payload);
      const updatedTodoList = todos.map((todo) => {
        if (todo.id === todoId) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodoList);
    } catch (error) {
      alert("Something went wrong...");
    }
  };

  return (
    <div>
      <TodoAdd onAdd={handleTodoAdd} />
      <div className="mt-8">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="mt-8">
          <FilterableTodoList
            todos={todos}
            onTodoDelete={handleTodoDelete}
            onTodoUpdate={handleTodoUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
