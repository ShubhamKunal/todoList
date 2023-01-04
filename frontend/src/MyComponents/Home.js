import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import "./Home.css";
import axios from "axios";

export const Home = () => {
  const navigator = useNavigate();

  const [cookies, removeCookie] = useCookies(["jwt"]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [Todos, setTodos] = useState([]);
  const { state } = useLocation();
  const { username } = state || { username: "NONE" };
  const baseURL = `https://todo-p28e.onrender.com/`;
  useEffect(() => {
    if (cookies.jwt == null) {
      navigator("/login");
    } else {
      getTodos()
    }
  });
  // useEffect(() => {
  //   if (cookies.jwt == null) {
  //     navigator("/login");
  //   } else {
  //     getTodos();
  //   }
  // }, []);
  const handleLogout = function (e) {
    e.preventDefault();
    removeCookie("jwt");
    Cookie.remove("jwt");
    navigator("/login");
  };
  const handleAdd = function (e) {
    e.preventDefault();
    if (title.length < 5) {
      document.getElementById("msg").innerHTML = "Title too short!";
    } else if (desc.length < 5) {
      document.getElementById("msg").innerHTML = "Description too short!";
    } else {
      document.getElementById("msg").innerHTML = "";
      document.getElementById("todoTitle").value = "";
      document.getElementById("todoDesc").value = "";

      console.log({ title: title, description: desc });
      axios
        .post(baseURL + "addTodo", {
          username: username,
          title: title,
          description: desc,
        })
        .then((response) => {
          setTimeout(() => {
            document.getElementById("msg").innerHTML = "";
          }, 2000);
          document.getElementById("msg").innerHTML = response.data.message;
        });
      getTodos();
    }
  };
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const deleteTodo = function (todo) {
    axios.post(baseURL + "deleteTodo", todo).then((response) => {
      setTimeout(() => {
        document.getElementById("msg").innerHTML = "";
      }, 2000);
      document.getElementById("msg").innerHTML = response.data.message;
      getTodos();
    });
  };
  const getTodos = function () {
    axios
      .post(baseURL + "getTodos", {
        username: username,
      })
      .then((response) => {
        setTodos(response.data.todos);
      });
  };
  return (
    <div className="container">
      <div id="info">
        User: {username}
        <br />
        <button
          className="btn btn-sm btn-dark"
          id="logout"
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>
      </div>
      <h2>Add a Todo</h2>
      <form id="form-todo">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="todoTitle"
            placeholder="Todo Title"
            maxLength="30"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="todoDesc"
            rows="2"
            placeholder="Todo Description"
            maxLength="62"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button
          className="btn btn-dark btn-sm"
          onClick={(e) => {
            handleAdd(e);
          }}
        >
          Add
        </button>
      </form>
      <div id="msg"> </div>
      <div id="todos">
        {Todos !== [] ? (
          Todos.map((todo) => {
            return (
              <div id="todo" className="my-2 mx-2">
                <div id="todo-title">{toTitleCase(todo.title)}</div>
                <div id="todo-description">{toTitleCase(todo.description)}</div>
                <button
                  className="btn btn-sm btn-danger"
                  id="todo-delete"
                  onClick={() => deleteTodo(todo)}
                >
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <div>Add Your First Todo!</div>
        )}
      </div>
    </div>
  );
};
