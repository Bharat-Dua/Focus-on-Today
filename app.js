const checkboxList = document.querySelectorAll(".custom-checkbox");

const inputValue = document.querySelectorAll(".goal-input");

const errorMessage = document.querySelector(".error-message");
let progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");

const progressValue = document.querySelector(".progress-value");
const toggleDarkMode = document.querySelector(".toggle-dark-mode");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "well begun is half done",
  "Just a step away,keep going!",
  "Whoa! You just completed all the goals,time for chill:D",
];

toggleDarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  let icon = toggleDarkMode.querySelector("i");
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressLabel.innerText = allQuotes[completedGoalsCount];

progressValue.style.width = `${
  (completedGoalsCount / inputValue.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputValue.length}completed`;

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const isAllInputFieldsAreFilled = [...inputValue].every((input) => {
      return input.value;
    });

    if (isAllInputFieldsAreFilled) {
      checkbox.parentElement.classList.toggle("completed");
      // errorMessage.style.display = "none";

      progressBar.classList.remove("error");
      const inputID = checkbox.nextElementSibling.id;
      allGoals[inputID].completed = !allGoals[inputID].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressLabel.innerText = allQuotes[completedGoalsCount];

      progressValue.style.width = `${
        (completedGoalsCount / inputValue.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputValue.length} completed`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorMessage.innerText = `Please set all ${inputValue.length} goals.`;
      progressBar.classList.add("showError");
    }
  });
});

inputValue.forEach((input) => {
  input.value = allGoals[input.id]?.name || "";

  input.addEventListener("focus", () => {
    progressBar.classList.remove("showError");
  });

  if (allGoals[input.id]?.completed) {
    input.parentElement.classList.add("completed");
    // input.disabled=true
  }
  input.addEventListener("input", (e) => {
    if (allGoals[input.id]?.completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    allGoals[input.id] = { name: input.value, completed: false };

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
