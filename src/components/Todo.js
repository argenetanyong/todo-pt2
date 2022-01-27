import React from "react";
import axios from "axios";

function Todo({ text, todo, todos, setTodos }) {
  const apiEndpoint = "https://warm-crag-43861.herokuapp.com/api/todos";

  const deleteHandler = async () => {
    //setTodos(todos.filter((element) => element.id !== todo.id));
    const originalTodos = todos;
    setTodos(todos.filter((element) => element._id !== todo._id));
    try {
      await axios.delete(apiEndpoint + "/" + todo._id);
    } catch (er) {
      alert("Something failed while deleting a todo item!");
      setTodos(originalTodos);
    }
  };

  const completeHandler = async () => {
    /*  console.log("completeHandler todo._id", todo._id);
    console.log("completeHandler todo.completed", todo.completed); */
    const originalTodos = todos;
    setTodos(
      todos.map((element) => {
        if (element._id === todo._id) {
          return {
            ...element,
            completed: !element.completed,
          };
        }
        return element;
      })
    );
    try {
      const obj = { text: todo.text, completed: !todo.completed };
      await axios.put(apiEndpoint + "/" + todo._id, obj);
    } catch (er) {
      alert("Something failed while updating a todo item!");
      setTodos(originalTodos);
    }
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
      </li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Todo;
