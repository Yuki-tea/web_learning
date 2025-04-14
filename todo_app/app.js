const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", ()=>{
    const taskText = taskInput.value.trim();
    if(taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <button class = "deleteBtn">削除</button>
    `;
    
    taskList.appendChild(li);
    taskInput.value = "";

    const deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", ()=>{
        li.remove();
    });
});