type taskInfo = {
  id: string;
  taskContent: string;
  isComplete: boolean;
};

const taskInput = document.querySelector<HTMLInputElement>(".taskInput");
const addBtn = document.querySelector<HTMLButtonElement>(".addBtn");
const taskBoard = document.querySelector<HTMLDivElement>(".taskBoard");
let taskList: taskInfo[] = [];
const tabs = document.querySelectorAll<HTMLDivElement>(".taskTabs div");
let mode = "all";
let filterList: taskInfo[] = [];
const all = document.querySelector<HTMLDivElement>("#all");
const onGoing = document.querySelector<HTMLDivElement>("#ongoing");
const done = document.querySelector<HTMLDivElement>("#done");

addBtn?.addEventListener("click", addTask);

taskInput?.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addTask();
  }
});

function randomId() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function render() {
  let list: taskInfo[] = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
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
    } else {
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
  if (taskInput?.value == "" || taskInput?.value == null) {
    return;
  } else {
    let task: taskInfo = {
      id: randomId(),
      taskContent: taskInput?.value,
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

function filter(e: any) {
  if (e) {
    mode = e.target.id;
    if (mode == "all") {
      all?.classList.add("taskClick");
      onGoing?.classList.remove("taskClick");
      done?.classList.remove("taskClick");
    } else if (mode == "ongoing") {
      all?.classList.remove("taskClick");
      onGoing?.classList.add("taskClick");
      done?.classList.remove("taskClick");
    } else if (mode == "done") {
      all?.classList.remove("taskClick");
      onGoing?.classList.remove("taskClick");
      done?.classList.add("taskClick");
    }
  }
}
