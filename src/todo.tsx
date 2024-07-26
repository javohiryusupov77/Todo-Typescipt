import React, { useState } from "react";
import Swal from "sweetalert2";

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "To study React fundamentals", done: false },
    { id: 2, text: "To study React fundamentals", done: false },
    { id: 3, text: "To study React fundamentals", done: true },
    { id: 4, text: "To study React fundamentals", done: false },
    { id: 5, text: "To study React fundamentals", done: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTodoItem: TodoItem = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      text: newTodo,
      done: false,
    };
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Task added",
    });
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

    const isTodoDone = todos.find((todo) => todo.id === id)?.done;
    const message = isTodoDone ? "undone" : "done";

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "success",
      title: message,
    });
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: "Deleted",
    });
  };

  const undoneTodos = todos.filter((todo) => !todo.done);
  const doneTodos = todos.filter((todo) => todo.done);

  return (
    <div
      style={{ background: "#1D1825", minHeight: "70vh", padding: "2rem" }}
      className="max-w-md mx-auto bg-white shadow-md rounded-2xl overflow-hidden md:max-w-lg mt-10 p-4"
    >
      <div className="flex mb-4">
        <input
          style={{
            borderColor: "#9E78CF",
            background: "#1D1825",
            color: "white",
          }}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border border-gray-300 rounded-2xl mr-3 focus:outline-none"
        />
        <span
          style={{
            cursor: "pointer",
            paddingTop: "8px",
            background: "#9E78CF",
            borderRadius: "10px",
            padding: "10px",
            color: "white",
          }}
          onClick={addTodo}
          className="material-symbols-outlined hover:scale-110 transition-transform duration-200"
        >
          add
        </span>
      </div>
      <h2 style={{ color: "white" }} className="text-xl font-semibold mb-2">
        Tasks to do - 4
      </h2>
      <ul className="mb-4">
        {undoneTodos.map((todo) => (
          <li
            style={{
              color: "#9E78CF",
              background: "#15101C",
              padding: "1rem",
              margin: "1rem",
            }}
            key={todo.id}
            className="flex items-center justify-between p-2"
          >
            <span className="flex-grow">{todo.text}</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => toggleTodo(todo.id)}
              className="material-symbols-outlined hover:scale-125 transition-transform duration-200"
            >
              check
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => deleteTodo(todo.id)}
              className="material-symbols-outlined hover:scale-110 transition-transform duration-200"
            >
              delete
            </span>
          </li>
        ))}
      </ul>
      <h2 style={{ color: "white" }} className="text-xl font-semibold mb-2">
        Done - 1
      </h2>
      <ul>
        {doneTodos.map((todo) => (
          <li
            style={{
              color: "#78CFB0",
              background: "#15101C",
              padding: "1rem",
              margin: "1rem",
            }}
            key={todo.id}
            className="flex items-center justify-between p-2 bg-green-100"
          >
            <span className="flex-grow line-through">{todo.text}</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => toggleTodo(todo.id)}
              className="material-symbols-outlined hover:scale-125 transition-transform duration-200"
            >
              undo
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => deleteTodo(todo.id)}
              className="material-symbols-outlined hover:scale-110 transition-transform duration-200"
            >
              delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
