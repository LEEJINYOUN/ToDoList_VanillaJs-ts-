"use strict";
const taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const taskBoard = document.querySelector(".taskBoard");
let taskList = [];
const tabs = document.querySelectorAll(".taskTabs div");
let mode = "all";
let filterList = [];
const all = document.querySelector("#all");
const onGoing = document.querySelector("#ongoing");
const done = document.querySelector("#done");
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", addTask);
taskInput === null || taskInput === void 0 ? void 0 : taskInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        addTask();
    }
});
function randomId() {
    return "_" + Math.random().toString(36).substring(2, 9);
}
function render() {
    let list = [];
    if (mode == "all") {
        list = taskList;
    }
    else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `
        <div class="task">
        <div class="taskTitle">
          <div class="title taskDone" >${list[i].taskContent}</div>
        </div>
        <div class="taskBtns">
          <button class="checkBtn" onClick="toggleComplete('${list[i].id}')">
          <i class="fa-sharp fa-solid fa-rotate-right rotate"></i>
          </button>
          <button class="removeBtn" onClick="deleteTask('${list[i].id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
        }
        else {
            resultHTML += `
        <div class="task">
        <div class="taskTitle">
          <div class="title">${list[i].taskContent}</div>
        </div>
        <div class="taskBtns">
          <button class="checkBtn" onClick="toggleComplete('${list[i].id}')">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="removeBtn" onClick="deleteTask('${list[i].id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
        }
    }
    if (taskBoard !== null) {
        taskBoard.innerHTML = resultHTML;
    }
}
function addTask() {
    if ((taskInput === null || taskInput === void 0 ? void 0 : taskInput.value) == "" || (taskInput === null || taskInput === void 0 ? void 0 : taskInput.value) == null) {
        return;
    }
    else {
        let task = {
            id: randomId(),
            taskContent: taskInput === null || taskInput === void 0 ? void 0 : taskInput.value,
            isComplete: false,
        };
        taskList.push(task);
        taskInput.value = "";
        taskInput.focus();
        render();
    }
}
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) {
        filter(e);
    });
}
function filter(e) {
    if (e) {
        mode = e.target.id;
        if (mode == "all") {
            all === null || all === void 0 ? void 0 : all.classList.add("taskClick");
            onGoing === null || onGoing === void 0 ? void 0 : onGoing.classList.remove("taskClick");
            done === null || done === void 0 ? void 0 : done.classList.remove("taskClick");
        }
        else if (mode == "ongoing") {
            all === null || all === void 0 ? void 0 : all.classList.remove("taskClick");
            onGoing === null || onGoing === void 0 ? void 0 : onGoing.classList.add("taskClick");
            done === null || done === void 0 ? void 0 : done.classList.remove("taskClick");
        }
        else if (mode == "done") {
            all === null || all === void 0 ? void 0 : all.classList.remove("taskClick");
            onGoing === null || onGoing === void 0 ? void 0 : onGoing.classList.remove("taskClick");
            done === null || done === void 0 ? void 0 : done.classList.add("taskClick");
        }
    }
}
