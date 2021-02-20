// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".taskForm");
const input = form.querySelector(".taskInput");
const pendingList = document.querySelector(".pending");
const finishedList = document.querySelector(".finished");
const LOCALSTORAGE_PENDING = "pending";
const LOCALSTORAGE_FINISH = "finished";

function handleSubmit(event) {
  event.preventDefault();
  const loadedList = loadPendingData() !== null ? loadPendingData() : [];
  const currentValue = input.value;
  const dataObj = {
    id: loadedList === null ? "p1" : `p${Number(loadedList.length) + 1}`,
    task: currentValue
  };
  loadedList.push(dataObj);
  localStorage.setItem(LOCALSTORAGE_PENDING, JSON.stringify(loadedList));
  input.value = "";
  writeText("pending", dataObj);
}

function deleteTask(event) {
  const id = event.path[1].id;
  if (id.indexOf("p") !== -1) {
    const loadedList = loadPendingData();
    loadedList.splice(searchIndex("p", id), 1);
    localStorage.setItem(LOCALSTORAGE_PENDING, JSON.stringify(loadedList));
  } else {
    const loadedList = loadFinishedData();
    loadedList.splice(searchIndex("f", id), 1);
    localStorage.setItem(LOCALSTORAGE_FINISH, JSON.stringify(loadedList));
  }

  const li = document.getElementById(id);
  li.remove();
}

function searchIndex(type, id) {
  let loadedList = [];
  if (type === "p") {
    loadedList = loadPendingData();
  } else {
    loadedList = loadFinishedData();
  }

  for (let i = 0; i < loadedList.length; i++) {
    if (loadedList[i].id === id) {
      return i;
    }
  }
  return -1;
}

function pndingToFnish(event) {
  const task = loadPendingData()[searchIndex("p", event.path[1].id)].task;
  //1. pendinglist에서 삭제
  deleteTask(event);
  //2. finishedlist로 넣기
  const loadedList = loadFinishedData() !== null ? loadFinishedData() : [];
  const dataObj = {
    id: loadedList === null ? "f1" : `f${Number(loadedList.length) + 1}`,
    task: task
  };
  loadedList.push(dataObj);
  localStorage.setItem(LOCALSTORAGE_FINISH, JSON.stringify(loadedList));
  //3. finished 리스트 태그 추가
  writeText("finished", dataObj);
}

function fnishToPnding(event) {
  const task = loadFinishedData()[searchIndex("f", event.path[1].id)].task;
  deleteTask(event);

  const loadedList = loadPendingData() !== null ? loadPendingData() : [];
  const dataObj = {
    id: loadedList === null ? "p1" : `p${Number(loadedList.length) + 1}`,
    task: task
  };
  loadedList.push(dataObj);
  localStorage.setItem(LOCALSTORAGE_PENDING, JSON.stringify(loadedList));
  writeText("pending", dataObj);
}

function writeText(type, taskObj) {
  const li = document.createElement("li");
  const dltBtn = document.createElement("button");
  const pndingToFnishBtn = document.createElement("button");
  const fnishToPndingBtn = document.createElement("button");
  dltBtn.addEventListener("click", deleteTask);
  pndingToFnishBtn.addEventListener("click", pndingToFnish);
  fnishToPndingBtn.addEventListener("click", fnishToPnding);
  pndingToFnishBtn.textContent = "✔";
  fnishToPndingBtn.textContent = "⬆️";
  dltBtn.textContent = "🗑";
  li.id = taskObj.id;
  li.innerText = taskObj.task;
  if (type === "pending") {
    li.appendChild(pndingToFnishBtn);
    pendingList.appendChild(li);
  } else {
    li.appendChild(fnishToPndingBtn);
    finishedList.appendChild(li);
  }
  li.appendChild(dltBtn);
}

function loadPendingData() {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_PENDING));
}

function loadFinishedData() {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_FINISH));
}

function init() {
  form.addEventListener("submit", handleSubmit);
  const loadedPendingTaskList = loadPendingData();
  const loadedFinishedTaskList = loadFinishedData();
  if (loadedPendingTaskList !== null) {
    loadedPendingTaskList.forEach((taskObj) => {
      writeText("pending", taskObj);
    });
  }
  if (loadedFinishedTaskList !== null) {
    loadedFinishedTaskList.forEach((taskObj) => {
      writeText("fnish", taskObj);
    });
  }
}

init();
