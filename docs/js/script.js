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
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks
  filter.addEventListener('keyup', filterTasks);
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
  //clear input
  taskInput.value = '';
}
//remove task
function removeTask(event) {
  if(event.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      event.target.parentElement.parentElement.remove();
    }
  }
}
//clear task
function clearTasks(){
  //taskList.innerHTML = '';
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
//filter tasks
function filterTasks(event){
  const text = event.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => task.firstChild.textContent.toLowerCase().indexOf(text) != -1 ? task.style.display = 'block' : task.style.display = 'none');
}