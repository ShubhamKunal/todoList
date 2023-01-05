import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = `https://todo-p28e.onrender.com/`;
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['jwt'])
  const navigator = useNavigate()
  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post(baseURL + "register", {
        username: username,
        email: email,
        password: password,
      },{
        withCredentials:true
      })
      .then((response) => {
        document.getElementById("msg").innerHTML = response.data.message;
        if(response.data.message==="Registered!"){
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
          setCookie("jwt",response.data.token)
          navigator("/",{state:{...response.data.user}})
        }
      });
  };
  return (
    <div className="container">
      <h2>Register</h2>
      <div className="mb-3 row">
        <label htmlFor="username" className="col-sm-2 col-form-label">
          Username
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="username"
            maxLength="12"
            placeholder="Unique username of maximum 12 characters"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-dark btn-sm" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
      <br />
      <span>
        {" "}
        Already have an account ? <Link to="/login">Login</Link>
      </span>
      <h4 id="msg" className="my-3"> </h4>
    </div>
  );
};
