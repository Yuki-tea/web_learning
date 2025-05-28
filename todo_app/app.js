const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");

addBtn.addEventListener("click", ()=>{
    const priority = priorityInput.value.trim(); 
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    if(taskText === "") return;

    const li = document.createElement("li");
    li.setAttribute("data-priority", priority);
    li.setAttribute("class", `priority ${priority}`);
    li.innerHTML = `
        ${taskText}
        <span>[Priority: ${priority}]</span>
        <span>[期限: ${dueDate}]</span>
        <button class = "deleteBtn">削除</button>
    `;

    const deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", ()=>{
        li.remove();
        sortTasks();
    });

    taskList.appendChild(li);
    taskInput.value = "";
    sortTasks();

});

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
            if(diff != 0) {
                return diff;
            }
        }

        const aPriority = a.getAttribute("data-priority");
        const bPriority = b.getAttribute("data-priority");
        const priorityDiff = priorityOrder[aPriority] - priorityOrder[bPriority];

        if (priorityDiff !== 0) {
            return priorityDiff; // 優先度が違えば優先度順
        }
        return 0;
    });

    tasks.forEach(task => taskList.appendChild(task));
}
