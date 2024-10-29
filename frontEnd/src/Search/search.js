import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import "./search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [unfulfilledOrders, setUnfulfilledOrders] = useState([]);
  const [fulfilledOrders, setFulfilledOrders] = useState([]);

  const fetchPreorders = async () => {
    try {
      const unfulfilled = await axios.get("http://localhost:3001/search-preorders", {
        params: { search: searchTerm, fulfilled: false },
      });
      const fulfilled = await axios.get("http://localhost:3001/search-preorders", {
        params: { search: searchTerm, fulfilled: true },
      });

      setUnfulfilledOrders(unfulfilled.data);
      setFulfilledOrders(fulfilled.data);
    } catch (error) {
      console.error("Error fetching preorders:", error);
    }
  };

  const markAsFulfilled = async (id) => {
    try {
      await axios.put(`http://localhost:3001/mark-fulfilled/${id}`);
      fetchPreorders();
    } catch (error) {
      console.error("Error marking order as fulfilled:", error);
    }
  };

  useEffect(() => {
    fetchPreorders();
  }, [searchTerm]);

  const renderOrders = (orders, showMarkButton = false) => (
    <TableBody>
      {orders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>{order.firstName} {order.lastName}</TableCell>
          <TableCell>{order.email}</TableCell>
          <TableCell>
            {order.items.map((item, index) => (
              <span key={index}>
                {item.name} ({item.quantity})
                {index < order.items.length - 1 ? ", " : ""}
              </span>
            ))}
          </TableCell>
          <TableCell>
            {showMarkButton ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => markAsFulfilled(order.id)}
              >
                Mark as Fulfilled
              </Button>
            ) : (
              "Fulfilled"
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <Box className="search-container">
        <Box className="innerBoxSearch">
          <Box className="search-bar">
            <TextField
              label="Search by First or Last Name"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <Box className="orders-section" mt={4}>
            <Typography variant="h5" gutterBottom>
              Unfulfilled Preorders
            </Typography>
            <TableContainer component={Paper} className="table-container" style={{ boxShadow: "none", backgroundColor: "#fef7ff" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {renderOrders(unfulfilledOrders, true)}
              </Table>
            </TableContainer>

            <Typography variant="h5" gutterBottom style={{ marginTop: "1.5rem" }}>
              Fulfilled Preorders
            </Typography>
            <TableContainer component={Paper} className="table-container" style={{ boxShadow: "none", backgroundColor: "#fef7ff"  }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                {renderOrders(fulfilledOrders)}
              </Table>
            </TableContainer>
          </Box>
        </Box>
    </Box>
  );
}

export default Search;