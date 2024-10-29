import { Box, TextField, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import "./Item.css"; // Import the CSS file

function Item({ item, onItemChange, onDelete }) {
  // Handle change and ensure only numbers are allowed for the cost
  const handleNumberChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input, including empty value
    if (inputValue === '' || !isNaN(inputValue)) {
      onItemChange('cost', inputValue); // Pass the new cost back to parent
    }
  };

  // Handle change for the item name
  const handleNameChange = (e) => {
    onItemChange('name', e.target.value); // Pass the new name back to parent
  };

  return (
    <Box className="item-container-settings">
      <TextField
        label="Item Name"
        className="item-name"
        placeholder="Item Name"
        value={item.name} // Use item prop for name value
        onChange={handleNameChange} // Handle name changes
      />

      <TextField
        label="Cost"
        className="cost-name"
        value={item.cost} // Use item prop for cost value
        onChange={handleNumberChange} // Handle cost changes
        placeholder="Cost"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Ensures mobile numeric keyboard
      />

      <IconButton
        className="delete-icon"
        onClick={onDelete} // Call onDelete prop when clicked
        aria-label="delete"
      >
        <Delete />
      </IconButton>
    </Box>
  );
}

export default Item;