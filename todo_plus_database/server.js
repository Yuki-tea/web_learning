"use strict";
require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

app.use(express.json());
app.use(express.static("public"));

app.get("/tasks", async (req, res) => {
    const result = await pool.query("SELECT * FROM tasks ORDER BY due_date ASC");
    res.json(result.rows);
});

app.post("/tasks", async (req, res) => {
    const { title, priority, dueDate } = req.body;
    const result = await pool.query(
        "INSERT INTO tasks (title, priority, due_date) VALUES ($1, $2, $3) RETURNING *",
        [title, priority, dueDate]
    );
    
    res.status(201).json(result.rows[0]);
});

app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`The server booted on http://localhost:${PORT}`);
});