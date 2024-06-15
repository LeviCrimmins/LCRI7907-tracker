// Get references to HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

// Event listener for form submission
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  // Access form inputs using form.elements
  let title = form.elements.title.value;
  let date = form.elements.Date.value;
  let completionTime = form.elements.completionTime.value;
  let distance = form.elements.distance.value;
  let heartrate = form.elements.Heartrate.value;

  // Call addTask function with form input values
  addTask(title, date, completionTime, distance, heartrate);

  // Optional: Log the task list for debugging purposes
  console.log(taskList);

  // Clear the form inputs after submission
  form.reset();
});

// Array to store tasks
let taskList = [];

// Function to add task to taskList array
function addTask(title, date, completionTime, distance, heartrate) {
  let task = {
    title,
    date,
    completionTime,
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
    <p>Completion Time: ${task.completionTime}</p>
    <p>Distance: ${task.distance} Km</p>
    <p>Heartrate: ${task.heartrate}</p>
  `;

  // Add delete button
  let delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.addEventListener("click", function() {
    item.remove(); // Remove task item from the list
    // Optionally, you can also remove the task from taskList array here
  });
  item.appendChild(delButton);

  tasklist.appendChild(item); // Append task item to tasklist ul element
}
