import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import "./Settings.css";
import Item from "./Item/Item";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const itemsContainerRef = useRef(null);

  // request to get items
  useEffect(() => {
    axios
      .get("http://localhost:3001/items")
      .then((response) => {
        setItems(
          response.data.map((item) => ({
            name: item.name,
            cost: item.cost % 1 === 0 ? parseInt(item.cost, 10) : item.cost,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  useEffect(() => {
    // Scroll to bottom when items list changes auto scroll
    if (itemsContainerRef.current) {
      itemsContainerRef.current.scrollTop = itemsContainerRef.current.scrollHeight;
    }
  }, [items]);

  // Add item
  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, { name: "", cost: 0 }]);
  };


  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  // Delete item
  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Save items to database
  const handleSaveItems = () => {
    axios
      .post("http://localhost:3001/save-items", { items })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error saving items:", error);
        alert("Failed to save items");
      });
  };

  return (
    <div className="app-containerSettings">
      <div className="top-right">
        <IconButton className="settingsButton" onClick={handleSaveItems}>
          <Typography>Save</Typography>
        </IconButton>
      </div>
      <Box className="contentBoxSettings">
        <Box className="innerBoxSettings">
          <Box className="container" alignItems="left">
            <Typography>Add Items</Typography>
          </Box>

          <Box ref={itemsContainerRef} id="itemsContainerSettings" className="itemsContainerSettings">
            {items.map((item, index) => (
              <Item
                key={index}
                item={item}
                onItemChange={(field, value) => handleItemChange(index, field, value)}
                onDelete={() => handleDeleteItem(index)}
              />
            ))}
          </Box>

          <Box className="bottom-container">
            <Box className="add-container">
              <IconButton className="addButton" onClick={handleAddItem}>
                <AddIcon />
                <Typography>Add</Typography>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Settings;