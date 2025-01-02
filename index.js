const newTask = document.getElementById("new-task-input");
const addTask = document.getElementById("add-task-button");
const tasks = document.getElementById("tasks");
const allTask = document.getElementById("all-task");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const clearCompleted = document.getElementById("clear-completed");

let arrAllTask = JSON.parse(localStorage.getItem("allTask")) || [];

arrAllTask.forEach((taskObj, index) => {
  createTodos(taskObj, index);
});

function displayTodos() {
  tasks.textContent = "";
  arrAllTask.forEach((taskObj, index) => {
    createTodos(taskObj, index);
  });
}

function createTodos(taskObj, index) {
  const newElement = document.createElement("div");
  const newText = document.createElement("div");
  const images = document.createElement("div");
  const deleteImage = document.createElement("img");
  const tickImage = document.createElement("img");
  newText.setAttribute("class", "text");
  images.setAttribute("class", "images");
  newElement.setAttribute("class", "task");
  tickImage.setAttribute("id", "tick-image");
  tickImage.onclick = () => toggleTask(index);
  tickImage.src = "./images/tick.png";
  deleteImage.setAttribute("id", "delete-image");
  deleteImage.src = "./images/delete.png";
  deleteImage.onclick = () => deleteTask(index);
  newText.innerText = taskObj.value;
  newElement.appendChild(newText);
  images.appendChild(tickImage);
  images.appendChild(deleteImage);
  if (taskObj.status === "active") {
    const editImage = document.createElement("img");
    editImage.setAttribute("id", "edit-image");
    editImage.src = "./images/edit.png";
    editImage.onclick = (e) => {
      editTask(e.target.closest("div").parentNode, index);
    };
    images.appendChild(editImage);
  }
  newElement.appendChild(images);
  newElement.style.textDecorationLine =
    taskObj.status === "done" ? "line-through" : "none";
  tasks.appendChild(newElement);
}

function add() {
  const myTask = newTask.value.trim();
  const taskValues = arrAllTask.map((taskObj) => taskObj.value);
  if (taskValues.includes(myTask) === false && myTask !== "") {
    arrAllTask.unshift({ value: myTask, status: "active" });
    localStorage.setItem("allTask", JSON.stringify(arrAllTask));
    displayTodos();
    newTask.value = "";
  } else if (taskValues.includes(myTask) !== false && myTask !== "") {
    alert("Similar Task Found");
    newTask.value = "";
  } else {
    alert("EMPTY TASK");
  }
}

function deleteTask(index) {
  arrAllTask.splice(index, 1);
  localStorage.setItem("allTask", JSON.stringify(arrAllTask));
  displayTodos();
}

function toggleTask(index) {
  const task = arrAllTask[index];
  task.status = task.status === "active" ? "done" : "active";
  localStorage.setItem("allTask", JSON.stringify(arrAllTask));
  displayTodos();
}

function editTask(text, index) {
  const portion = text.querySelector(".text");
  const input = document.createElement("input");
  input.value = portion.textContent;
  const initial_val = portion.textContent;
  portion.innerText = "";
  input.type = "text";
  portion.append(input);
  input.focus();
  input.onblur = () => {
    if (input.value.trim() !== "") {
      portion.innerText = input.value;
      arrAllTask[index].value = input.value;
      localStorage.setItem("allTask", JSON.stringify(arrAllTask));

    } else {
      portion.innerText = initial_val;
    }
  };
}

function showAllTasks() {
  displayTodos();
}

function clearCompletedTasks() {
  arrAllTask = arrAllTask.filter((taskObj) => taskObj.status !== "done");
  displayTodos();
}

function showActiveTasks() {
  tasks.textContent = "";
  arrAllTask.forEach((taskObj, index) => {
    if (taskObj.status === "active")
      createTodos(taskObj, index);
  });
}

function showCompletedTasks() {
  tasks.textContent = "";
  arrAllTask.forEach((taskObj, index) => {
    if (taskObj.status === "done")
      createTodos(taskObj, index);
  });
}

addTask.addEventListener("click", add);
newTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter") add();
});

allTask.addEventListener("click", showAllTasks);
active.addEventListener("click", showActiveTasks);
completed.addEventListener("click", showCompletedTasks);
clearCompleted.addEventListener("click", clearCompletedTasks);
