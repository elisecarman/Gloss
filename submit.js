submitButton = document.getElementById("json-input");
submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  submit(e.target.elements.json.value);
});

function submit(data) {
  console.log(data);
}
