'use strict';
//Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks
  filter.addEventListener('keyup', filterTasks);
}

//get tasks from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(event) {
  event.preventDefault();
  if(taskInput.value === '') {
    alert('Add a task');
  }
  //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  //save in local storage
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';
}
//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//remove task
function removeTask(event) {
  if(event.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      event.target.parentElement.parentElement.remove();
      //remove from local storage
      removeTaskFromLocalStoreg(event.target.parentElement.parentElement);
    }
  }
}
//remove from local storage
function removeTaskFromLocalStoreg(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//clear tasks
function clearTasks(){
  taskList.innerHTML = '';
  /*while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }*/
  //clear from local storage
  clearTasksFromLocalStorage();
}
//clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//filter tasks
function filterTasks(event){
  const text = event.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => task.firstChild.textContent.toLowerCase().indexOf(text) != -1 ? task.style.display = 'block' : task.style.display = 'none');
}