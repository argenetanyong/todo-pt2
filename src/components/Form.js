import React from "react";
import axios from "axios";

function Form({ todos, setTodos, inputText, setInputText, setStatus }) {
  const apiEndpoint = "https://warm-crag-43861.herokuapp.com/api/todos";

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = async (e) => {
    e.preventDefault();
    const originalTodos = todos;
    try {
      const response = await axios.post(apiEndpoint, {
        text: inputText,
        completed: false,
      });
      setTodos([
        ...todos,
        { text: inputText, completed: false, _id: response.data._id },
      ]);
      setInputText("");
    } catch (er) {
      alert("Something failed while adding a todo item!");
      setTodos(originalTodos);
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        value={inputText}
        onChange={inputTextHandler}
        type="text"
        className="todo-input"
      />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div onChange={statusHandler} className="select">
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;
