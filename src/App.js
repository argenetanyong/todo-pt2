import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import axios from "axios";
import _ from "lodash";

function App() {
  const apiEndpoint = "https://warm-crag-43861.herokuapp.com/api/todos";
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getTodos();
    console.log("1st UseEffect");
  }, []);

  useEffect(() => {
    filterHandler();
    console.log("2nd UseEffect");
    console.log("local todos-- ", todos);
  }, [todos, status]);

  const getTodos = async () => {
    try {
      const { data } = await axios.get(apiEndpoint);

      if (!_.isEmpty(data)) {
        setTodos(data);
      } else {
      }
    } catch (error) {}
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Argene's Todo App</h1>
      </header>
      <h2>with Backend</h2>
      <h3>Powered by React, Node and Express</h3>
      <p>API ENDPOINT - https://warm-crag-43861.herokuapp.com/api/todos/</p>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
