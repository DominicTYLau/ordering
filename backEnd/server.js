const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fifves-2Godgu-cahjar",
  database: "info",
});


// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");

    // Create tables if they don't exist
    const createItemsTable = `
      CREATE TABLE IF NOT EXISTS items (
        name VARCHAR(255) NOT NULL,
        cost INT NOT NULL
      );
    `;
    const createPreordersTable = `
      CREATE TABLE IF NOT EXISTS preorders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255),
        notes TEXT,
        items TEXT,
        totalCost DECIMAL(10, 2),
        fulfilled BOOLEAN DEFAULT FALSE
      );
    `;

    db.query(createItemsTable, (err) => {
      if (err) {
        console.error("Error creating items table:", err);
      } else {
        console.log("Items table created successfully");
      }
    });

    db.query(createPreordersTable, (err) => {
      if (err) {
        console.error("Error creating preorders table:", err);
      } else {
        console.log("Preorders table created successfully");
      }
    });
  }
});

// Get items
app.get("/items", (req, res) => {
  const query = "SELECT * FROM items";
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching items");
    } else {
      res.status(200).json(result);
    }
  });
});

// Save items
app.post("/save-items", (req, res) => {
  const items = req.body.items;

  const query = "INSERT INTO items (name, cost) VALUES ?";
  const values = items.map((item) => [item.name, item.cost]);

  const deleteQuery = "TRUNCATE TABLE items";

  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error executing DELETE query:", err);
      return res.status(500).send("Error clearing items");
    } else {
      console.log("Table cleared successfully");
    }

    db.query(query, [values], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving items");
      } else {
        res.status(200).send("Items saved successfully");
      }
    });
  });
});

// Preorder endpoint
app.post("/preorder", (req, res) => {
  const { firstName, lastName, email, notes, items, totalCost } = req.body;

  // Format items as JSON with name and quantity
  const itemsJson = JSON.stringify(
    Object.entries(items).map(([name, quantity]) => ({ name, quantity }))
  );

  const insertQuery = `
    INSERT INTO preorders (firstName, lastName, email, notes, items, totalCost)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(insertQuery, [firstName, lastName, email, notes, itemsJson, totalCost], (err) => {
    if (err) {
      return res.status(500).send("Failed to insert preorder data");
    }
    res.status(200).send("Preorder successful");
  });
});

// Search preorders
app.get("/search-preorders", (req, res) => {
  const { search = "", fulfilled } = req.query;

  // SQL query with LIKE operator to search first name or last name based on a partial match
  const searchQuery = `
    SELECT * FROM preorders 
    WHERE (firstName LIKE ? OR lastName LIKE ?) 
    AND fulfilled = ?
  `;

  db.query(searchQuery, [`%${search}%`, `%${search}%`, fulfilled === "true"], (err, result) => {
    if (err) {
      console.error("Error fetching preorders:", err);
      return res.status(500).send("Error fetching preorders");
    }
    res.status(200).json(result);
  });
});

// Mark a preorder as fulfilled
app.put("/mark-fulfilled/:id", (req, res) => {
  const { id } = req.params;

  const updateQuery = `
    UPDATE preorders 
    SET fulfilled = TRUE 
    WHERE id = ?
  `;

  db.query(updateQuery, [id], (err, result) => {
    if (err) {
      console.error("Error marking preorder as fulfilled:", err);
      return res.status(500).send("Error marking preorder as fulfilled");
    }
    res.status(200).send("Preorder marked as fulfilled");
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});