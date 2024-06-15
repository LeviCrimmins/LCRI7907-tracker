// Get references to HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

// Event listener for form submission
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  // Access form inputs using form.elements
  let title = form.elements.title.value;
  let date = form.elements.Date.value;
  let timeTaken = form.elements.timeTaken.value;
  let distance = form.elements.distance.value;
  let heartrate = form.elements.Heartrate.value;

  // Call addTask function with form input values
  addTask(title, date, timeTaken, distance, heartrate);

  // Save tasks to local storage
  saveTasks();

  // Clear the form inputs after submission
  form.reset();
});

// Array to store tasks, initially load from local storage if available
let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

// Function to add task to taskList array
function addTask(title, date, timeTaken, distance, heartrate) {
  let task = {
    title,
    date,
    timeTaken,
    distance,
    heartrate
  };

  taskList.push(task); // Add task object to taskList array

  // Render the task on the page
  renderTask(task);
}

// Function to render task on the page
function renderTask(task) {
  let item = document.createElement("li");
  item.innerHTML = `
    <p>Title: ${task.title}</p>
    <p>Date: ${task.date}</p>
    <p>Time Taken: ${task.timeTaken}</p>
    <p>Distance: ${task.distance} Km</p>
    <p>Heartrate: ${task.heartrate}</p>
  `;

  // Add delete button
  let delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.addEventListener("click", function() {
    item.remove(); // Remove task item from the list
    // Remove task from taskList array
    taskList = taskList.filter(t => t !== task);
    // Save updated task list to local storage
    saveTasks();
  });
  item.appendChild(delButton);

  tasklist.appendChild(item); // Append task item to tasklist ul element
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

// Load tasks from local storage on page load
function loadTasks() {
  taskList.forEach(task => renderTask(task));
}

// Call loadTasks() on page load to render existing tasks
loadTasks();
