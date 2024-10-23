import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextRed";

export default function Card(props) {
  const option = Object.keys(props.options);
  const dispatch = useDispatchCart();
  const data = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(option[0]);

  let finalPrice = quantity * parseInt(props.options[size]);

  const addToCartHandler = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, quantity: quantity })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, quantity: quantity, size: size,img : props.foodItems.img})
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, quantity: quantity, size: size })
  };

  return (
    <div>
      <div className="card m-3 " style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          className="card-img-top"
          src={props.foodItems.img}
          style={{ height: "150px", objectFit: "fill" }}
          alt="Card image cap"
        ></img>
        <div className="card-body">
          <p className="card-text">{props.foodItems.name}</p>
          <div className="container w-100 p-0">
            <select
              className="m-2 h-100 w-20 bg-success text-black rounded"
              style={{ height: "38px" }}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {Array.from(Array(6), (_e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {option.map((data) => {
                return <option value={data}>{data}</option>;
              })}
            </select>

            <div className="d-inline h-100 fs-5">${finalPrice}</div>
            <hr></hr>
          </div>

          <button
            className="btn btn-success justify-center ms-2"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
