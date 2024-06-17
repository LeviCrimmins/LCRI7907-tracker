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
  renderCharts(); // Update charts after adding a new task
}

// Function to render task on the page
function renderTask(task) {
  let item = document.createElement("li");
  item.innerHTML = `
    <p>Title: ${task.title}</p>
    <p>Date: ${task.date}</p>
    <p>Time Taken: ${task.timeTaken} minutes</p>
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
    renderCharts(); // Update charts after deleting a task
  });
  item.appendChild(delButton);

  tasklist.appendChild(item); // Append task item to tasklist ul element
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

// Function to render charts
function renderCharts() {
  const dates = taskList.map(task => task.date);
  const distances = taskList.map(task => task.distance);
  const heartrates = taskList.map(task => task.heartrate);
  const timesTaken = taskList.map(task => task.timeTaken);

  // Distance Chart
  const distanceCtx = document.getElementById('distanceChart').getContext('2d');
  new Chart(distanceCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Distance (Km)',
        data: distances,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'P'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Distance (Km)'
          }
        }
      }
    }
  });

  // Heartrate Chart
  const heartrateCtx = document.getElementById('heartrateChart').getContext('2d');
  new Chart(heartrateCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Heartrate (BPM)',
        data: heartrates,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'P'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Heartrate (BPM)'
          }
        }
      }
    }
  });

  // Time Taken Chart
  const timeTakenCtx = document.getElementById('timeTakenChart').getContext('2d');
  new Chart(timeTakenCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Time Taken (Minutes)',
        data: timesTaken,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'P'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Time Taken (Minutes)'
          }
        }
      }
    }
  });
}

// Call loadTasks() on page load to render existing tasks and charts
loadTasks();
