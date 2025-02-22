
// --- Utility Functions --- //
/**
 * Saves the goals object to localStorage.
 */
const saveGoalsToStorage = () => {
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
};

/**
 * Updates the progress UI based on the number of completed goals.
 */
const updateProgressUI = () => {
  // Calculate the number of completed goals
  completedGoalsCount = Object.values(allGoals).filter(
    (goal) => goal.completed
  ).length;

  // Update progress label using the appropriate quote
  progressLabel.innerText = allQuotes[completedGoalsCount];

  // Update the progress bar width and text
  const percentage = (completedGoalsCount / goalInputs.length) * 100;
  progressValue.style.width = `${percentage}%`;
  progressValue.firstElementChild.innerText = `${completedGoalsCount}/${goalInputs.length} completed`;
};

// --- DOM Element References --- //
const goalCheckboxes = document.querySelectorAll(".custom-checkbox");
const goalInputs = document.querySelectorAll(".goal-input");
const errorMessageEl = document.querySelector(".error-message");
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const toggleDarkModeBtn = document.querySelector(".toggle-dark-mode");

// --- Constants --- //
const allQuotes = [
  "Raise the bar by completing your goals!",
  "well begun is half done",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill:D",
];

// Load saved goals or initialize with an empty object
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = 0; // Global counter for completed goals

// --- Dark Mode Toggle --- //
toggleDarkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = toggleDarkModeBtn.querySelector("i");

  // Swap the icon based on the active mode
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

// --- Initialize Inputs --- //
/**
 * Initialize each goal input field from localStorage data and attach events.
 */
const initInputs = () => {
  goalInputs.forEach((input) => {
    // Populate input with stored value (or empty string if not set)
    input.value = allGoals[input.id]?.name || "";

    // If the task is completed, update the UI accordingly
    if (allGoals[input.id]?.completed) {
      input.parentElement.classList.add("completed");
    }

    // Remove error state when the user focuses on the input
    input.addEventListener("focus", () => {
      progressBar.classList.remove("showError");
    });

    // Update localStorage on input change
    input.addEventListener("input", () => {
      // Prevent editing if the task is marked completed
      if (allGoals[input.id]?.completed) {
        input.value = allGoals[input.id].name;
        return;
      }
      allGoals[input.id] = { name: input.value, completed: false };
      saveGoalsToStorage();
    });
  });
};

// --- Initialize Checkbox Handlers --- //
/**
 * Attach click event listeners to checkboxes to toggle task completion.
 */
const initCheckboxes = () => {
  goalCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const associatedInput = checkbox.nextElementSibling;

      // Check if all inputs are filled (trim to avoid spaces-only values)
      const areAllInputsFilled = Array.from(goalInputs).every(
        (input) => input.value.trim() !== ""
      );

      if (!areAllInputsFilled) {
        errorMessageEl.innerText = `Please set all ${goalInputs.length} goals.`;
        progressBar.classList.add("showError");
        return;
      }

      // Toggle completed state on the UI
      checkbox.parentElement.classList.toggle("completed");

      // Ensure the goal exists in our data store
      if (!allGoals[associatedInput.id]) {
        allGoals[associatedInput.id] = { name: "", completed: false };
      }
      // Toggle the completion flag for the specific goal
      allGoals[associatedInput.id].completed = !allGoals[associatedInput.id].completed;

      saveGoalsToStorage();
      updateProgressUI();
      progressBar.classList.remove("showError");
    });
  });
};

// --- Initialize the App --- //
updateProgressUI();
initInputs();
initCheckboxes();
