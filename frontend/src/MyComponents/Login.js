import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = `https://todo-p28e.onrender.com/`;
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigator = useNavigate();
  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post(
        baseURL + "login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        document.getElementById("msg").innerHTML = response.data.message;
        if (response.data.message === "Logged!") {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          setCookie("jwt", response.data.token);
          navigator("/", { state: { ...response.data.user } });
        }
      });
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "656592088725-vk41bsv6j84qe15mi8hd9lbseq9mgfrj.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  });
  async function handleCallbackResponse(response) {
    const token = response.credential;
    var userObject = jwtDecode(token);
    setEmail(userObject.email);
    var password = userObject.email.split('').reverse().join('');
    setPassword(password);
    var username = userObject.email.split('@')[0]
    // console.log(email,password,username)
    axios
      .post(
        baseURL + "exists",
        {
          email: userObject.email,
          password: password,
        },{
          withCredentials: true
        }
      )
      .then((response) => {
        if (response.data.message === true) { //login
          axios
      .post(
        baseURL + "login",
        {
          email: userObject.email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        document.getElementById("msg").innerHTML = response.data.message;
        if (response.data.message === "Logged!") {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          setCookie("jwt", response.data.token);
          navigator("/", { state: { ...response.data.user } });
        }
      });
        }else{ //register
          axios
      .post(baseURL + "register", {
        username: username,
        email: userObject.email,
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
        }
      });
    
  }
  return (
    <div className="container">
      <h2>Login</h2>
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
      <center>
        <div id="signInDiv"></div>
      </center>
      <span>
        {" "}
        First Time? <Link to="/register">Register</Link>
      </span>
      <h4 id="msg" className="my-3">
        {" "}
      </h4>
    </div>
  );
};
