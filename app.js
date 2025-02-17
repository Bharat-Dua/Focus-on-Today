const checkboxList = document.querySelectorAll(".custom-checkbox");

const inputValue = document.querySelectorAll(".goal-input");

const errorMessage = document.querySelector(".error-message");

const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allInputFieldsAreFilled = [...inputValue].every((input) => {
      return input.value;
    });
    if (allInputFieldsAreFilled) {
      checkbox.parentElement.classList.toggle("completed");
      // errorMessage.style.display = "none";
      progressBar.classList.remove("error");
      progressValue.style.width = "33%";
    } else {
      progressBar.classList.add("showError");

      // checkbox.checked = false;
    }
  });
});

inputValue.forEach((input) =>
  input.addEventListener("focus", () => {
    progressBar.classList.remove("showError");
  })
);
