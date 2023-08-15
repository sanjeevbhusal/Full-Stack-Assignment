import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
}

const todoApi = axios.create({
  baseURL: "http://localhost:8000/todos/",
});

enum TodoCompletedType {
  BOTH = "both",
  COMPLETED = "true",
  UNCOMPLETED = "false",
}

export const getTodos = async (
  completedType?: TodoCompletedType
): Promise<Todo[]> => {
  const response = await todoApi.get<Todo[]>(
    `/?completed_type=${completedType || TodoCompletedType.BOTH}`
  );
  return response.data;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await todoApi.post<Todo>("/", { title });
  return response.data;
};

export const deleteTodoById = async (id: number): Promise<void> => {
  await todoApi.delete(`/${id}`);
};

export const updateTodoById = async (
  id: number,
  payload: { completed?: boolean; title?: string }
): Promise<Todo> => {
  const response = await todoApi.put(`/${id}`, payload);
  return response.data;
};
