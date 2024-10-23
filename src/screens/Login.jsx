import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react';
export default function Login() {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

    
      const json = await response.json();
      console.log(json);
      
      if (!json.success) {
        alert("Error Occured");
      }
      else{
        localStorage.setItem('userEmail',credentials.email)
        localStorage.setItem('authToken',json.authToken)
        console.log(`token is ${json.authToken}`)
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setVal = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };


  return (
    <div>
      <div className="container">
        <form onSubmit={submitHandler}>
         
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
         
          <button type="submit" className="m-3 btn btn-success">
            Login
          </button>
          <Link className="m-3 btn btn-danger" to="/signup">
            Not a User?
          </Link>
        </form>
      </div>
    </div>
  )
}
