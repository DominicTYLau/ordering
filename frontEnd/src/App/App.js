import React, { useEffect, useState } from "react";
import { IconButton, Box, TextField, Typography, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search"; // Import Search Icon
import Incrementer from "./itemPicker/itemPicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const goToSettings = () => {
    navigate("/Settings");
  };

  const goToSearch = () => {
    navigate("/Search"); // Navigate to the search page
  };

  const reload = () => {
    window.location.reload();
  }

  // Fetch items from server on load
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/items");
        setItems(response.data);

        // Print item details to console
        response.data.forEach((item) => {
          console.log(`Item Name: ${item.name}, Cost: $${item.cost}, Quantity: ${0}`);
        });
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleQuantityChange = (itemIndex, itemTotalCost, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === itemIndex ? { ...item, quantity: newQuantity, totalCost: itemTotalCost } : item
      )
    );
  };

  const handlePreorder = async () => {
    const itemsToPreorder = items.reduce((acc, item) => {
      if (item.quantity > 0) {
        acc[item.name] = item.quantity;
      }
      return acc;
    }, {});

    const totalCost = items.reduce((acc, item) => acc + (item.totalCost || 0), 0);

    try {
      await axios.post("http://localhost:3001/preorder", {
        firstName,
        lastName,
        email,
        notes,
        items: itemsToPreorder,
        totalCost,
      });

      reload();

    setItems(items.map(item => ({ ...item, quantity: 0, totalCost: 0 })));

      alert("Preorder saved successfully!");
    } catch (error) {
      console.error("Error saving preorder:", error);
      alert("Failed to save preorder.");
    }
  };

  return (
    <div className="app-containerMain">
      <div className="top-right">
        <IconButton className="addButton" onClick={goToSettings} >
          <AddIcon />
        </IconButton>
        <IconButton className="searchButton" onClick={goToSearch}>
          <SearchIcon />
        </IconButton>
      </div>
      <Box className="innerBox" justifyContent="center" alignItems="center" display="flex" flexDirection="column">
        <Box className="left-container">
          <Box className="description">
            <TextField label="First Name" className="first-name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextField label="Last Name" className="last-name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <TextField label="Email" className="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box className="items-container">
            {items.map((item, index) => (
              <Incrementer
                key={index}
                itemName={item.name}
                itemCost={item.cost}
                onQuantityChange={(itemTotalCost, newQuantity) => handleQuantityChange(index, itemTotalCost, newQuantity)}
              />
            ))}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={3} className="summary-container">
          <input className="notes" type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <Paper elevation={0} className="total-cost-paper">
            <Typography variant="h4" color="primary" className="total-cost-label">Total Cost</Typography>
            <Typography variant="h4" className="total-cost-value">
              ${items.reduce((acc, item) => acc + (item.totalCost || 0), 0)}
            </Typography>
          </Paper>
          <Button variant="contained" className="preorder-button" onClick={handlePreorder}>PREORDER</Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;