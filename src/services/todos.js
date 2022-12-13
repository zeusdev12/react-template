import { post, get } from "./request";

export const getTodos = () => get("todos");
export const getTodoDetail = (id) => get(`todos/${id}`);
export const postTodo = (data) => post("newTodo", data);
