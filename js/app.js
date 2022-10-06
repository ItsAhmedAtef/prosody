const submit = document.getElementById("submit");
const input = document.getElementById("input");
const error = document.getElementById("error");

const showError = ( message ) => {
    if (error.classList.contains("hidden")) error.classList.remove("hidden");
    error.innerHTML = message;
};

submit.addEventListener("click", () => {
    if (input.value === "") {
        showError("*الحقل فارغ");
    } else {
        if (!error.classList.contains("hidden")) error.classList.add("hidden");
    }
});