"use strict";
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");

window.addEventListener("DOMContentLoaded", fetchTasks);

function fetchTasks() {
  fetch("/task")
    .then(res => res.json())
    .then(data => {
      taskList.innerHTML = "";
      data.forEach(task => addTaskToDOM(task));
    });
}

addBtn.addEventListener("click", ()=>{
    const title = taskInput.value.trim();
    const priority = priorityInput.value; 
    const dueDate = dueDateInput.value;
    if(title === "") return;

    const newTask = { title, priority, dueDate };

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
        .then(res => res.json())
        .then(task => {
            addTaskToDOM(task);
            taskInput.value = "";
            sortTasks();

        });
    
});

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.setAttribute("data-priority", task.priority);
    li.setAttribute("class", `priority ${task.priority}`);
    li.innerHTML = `
        ${task.title}
        <span>[Priority: ${task.priority}]</span>
        <span>[期限: ${task.dueDate}]</span>
        <button class = "deleteBtn">削除</button>
    `;
    
    
    const deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", ()=>{
        fetch(`/tasks/${task.id}`, {
            method: "DELETE"
        }).then(() => {
            li.remove();
            sortTasks();
        });
    });
    
    taskList.appendChild(li);
}

function sortTasks() {
    const tasks = Array.from(taskList.children);

    const priorityOrder = {
        high: 1,
        middle: 2,
        low: 3,
        none: 4
    };

    tasks.sort((a, b) => {
        const spansa = a.querySelectorAll("span");
        const spansb = b.querySelectorAll("span");
        const aDueDate = spansa[1].textContent.match(/\d{4}-\d{2}-\d{2}/);
        const bDueDate = spansb[1].textContent.match(/\d{4}-\d{2}-\d{2}/);
        
        if (aDueDate && bDueDate) {
            const diff = new Date(aDueDate[0]) - new Date(bDueDate[0]);
            if(diff !== 0) return diff;
        }

        const aPriority = a.getAttribute("data-priority");
        const bPriority = b.getAttribute("data-priority");
        const priorityDiff = priorityOrder[aPriority] - priorityOrder[bPriority];
        return priorityDiff;
    });

    tasks.forEach(task => taskList.appendChild(task));
}
