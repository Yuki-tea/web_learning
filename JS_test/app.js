const count = document.getElementById("count");
const btn = document.getElementById("btn");

let number = 0;

btn.addEventListener("click", ()=>{
    number++;
    count.textContent = number;
}
);