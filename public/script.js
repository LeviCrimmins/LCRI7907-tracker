// Initialize DOM elements
const walkForm = document.getElementById("walk-form");
const walkList = document.getElementById("list");
const walkNameInput = document.getElementById("walk-name");
const walkDistanceInput = document.getElementById("walk-distance");
const walkDateInput = document.getElementById("walk-date");

// Load existing walks on page load
loadWalks();

// Event listener for form submission
walkForm.addEventListener("submit", function(event) {
  event.preventDefault();
  addWalk();
});

// Function to add a new walk
function addWalk() {
  const name = walkNameInput.value;
  const distance = walkDistanceInput.value;
  const date = walkDateInput.value;

  if (!name || !distance || !date) {
    alert("Please fill in all fields");
    return;
  }

  const walk = { name, distance: parseFloat(distance), date };
  saveWalk(walk);
  renderWalk(walk);
  walkForm.reset();
}

// Function to save a walk to localStorage
function saveWalk(walk) {
  const walks = JSON.parse(localStorage.getItem("walks")) || [];
  walks.push(walk);
  localStorage.setItem("walks", JSON.stringify(walks));
}

// Function to load walks from localStorage
function loadWalks() {
  const walks = JSON.parse(localStorage.getItem("walks")) || [];
  walks.forEach(renderWalk);
}

// Function to render a walk on the page
function renderWalk(walk) {
  const item = document.createElement("li");
  item.innerHTML = `<p>${walk.name} - ${walk.distance} km - ${walk.date}</p>`;
  
  const delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.addEventListener("click", function() {
    deleteWalk(walk);
    item.remove();
  });

  item.appendChild(delButton);
  walkList.appendChild(item);
}

// Function to delete a walk from localStorage
function deleteWalk(walkToDelete) {
  let walks = JSON.parse(localStorage.getItem("walks")) || [];
  walks = walks.filter(walk => walk.name !== walkToDelete.name);
  localStorage.setItem("walks", JSON.stringify(walks));
}
