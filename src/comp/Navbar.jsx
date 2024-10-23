import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import { useState } from "react";
import Cart from "../screens/Cart";
import { useCart } from "./ContextRed";
export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const data = useCart()
  const clickHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>

            {localStorage.getItem("authToken") ? (
              <li className="nav-item active">
                <Link className="nav-link active fs-5" to="/myOrders">
                  My Orders <span className="sr-only"></span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <div
                className="btn bg-white text-success mx-2"
                onClick={() => setCartView(true)}
              >
                My Cart{" "}
                <Badge pill bg="danger" className="ms-2">
                  {data.length}
                </Badge>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  {" "}
                  <Cart></Cart>
                </Modal>
              ) : null}
              <Link
                className="btn bg-white mx-2 rounded text-danger"
                to="/login"
                onClick={clickHandler}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="btn bg-white mx-1 text-success" to="/login">
                Login
              </Link>
              <Link className="btn bg-white mx-1 text-success" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
