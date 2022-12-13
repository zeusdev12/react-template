import "./App.css";
import { useEffect, useState } from "react";
import { TodoService } from "./services";

function App() {
  const [todos, setTodos] = useState(false);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState("");

  useEffect(() => {
    TodoService.getTodos().then(res => setTodos(res))
    TodoService.getTodoDetail(2).then(res => console.log(res))
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();
    TodoService.postTodo({id: 1, title, completed})
      .then(res => console.log(res))
  };

  return (
    <>
      <form onSubmit={submitHandle}>
        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}></input>{" "}
        <input type="checkbox" name="completed" onChange={(e) => setCompleted(e.target.value)}/>
        <button type="submit" disabled={!title}> Kaydet</button>
      </form>
      <h1>Todo List</h1>
      <ul>
        {todos && todos.map((todo) => <li key={todo.id}>{todo.title} {todo.completed.toString()}</li>)}
      </ul>
    </>
  );
}

export default App;
