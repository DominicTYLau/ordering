import React, { useState } from "react";
import './itemPicker.css';
import { Typography } from "@mui/material";

export default function Incrementer({ itemName, itemCost, onQuantityChange }) {
  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity - 1, 0);
      const itemTotalCost = newQuantity * itemCost; // Calculate the item total cost
      onQuantityChange(itemTotalCost, newQuantity); // Update total cost and quantity
      return newQuantity;
    });
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      const itemTotalCost = newQuantity * itemCost; // Calculate the item total cost
      onQuantityChange(itemTotalCost, newQuantity); // Update total cost and quantity
      return newQuantity;
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      const newQuantity = newValue === "" ? 0 : Math.max(parseInt(newValue, 10), 0);
      const itemTotalCost = newQuantity * itemCost; // Calculate the item total cost
      onQuantityChange(itemTotalCost, newQuantity); // Update total cost and quantity
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="itemPicker">
      <div className="itemDescription">
        <Typography variant="h5">{itemName}</Typography>
        <Typography variant="h5">${itemCost}</Typography>
      </div>
      <div className="incrementer">
        <div className="button-container">
          <button className="increment-button decrement" onClick={handleDecrement} aria-label="Decrease value">
            -
          </button>
        </div>

        <div className="number-input">
          <input 
            type="text" 
            value={quantity} 
            onChange={handleInputChange} 
            aria-label="Number input" 
          />
        </div>

        <div className="button-container">
          <button className="increment-button increment" onClick={handleIncrement} aria-label="Increase value">
            +
          </button>
        </div>
      </div>
    </div>
  );
}