"use strict";
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let tasks = [];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { title, priority, dueDate } = req.body;
    const newTask = {
        id: Date.now().toString(),
        title,
        priority,
        dueDate
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`The server booted on http://localhost:${PORT}`);
});