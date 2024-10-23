import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    geolocation: "",
    password: "",
  });

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

    
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("server Error");
      }
      
      navigate('/login');

    } catch (error) {
      console.log(error);
    }
  };

  const setVal = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={setVal}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={setVal}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={setVal}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Your Address
            </label>
            <input
              type="text"
              className="form-control"
              id="geolocation"
              name="geolocation"
              value={credentials.geolocation}
              onChange={setVal}
              required
            />
          </div>

          <button type="submit" className="m-3 btn btn-success ">
            Sign Up
          </button>
          <Link className="m-3 btn btn-danger" to="/Login">
            Already a User?
          </Link>
        </form>
      </div>
    </>
  );
}
