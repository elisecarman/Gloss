submitButton = document.getElementById("json-input");

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  submit(e.target.elements.json.value);
  e.target.elements.json.value = "";
});

function submit(data) {
  try {
    parsed = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
  console.log(parsed);
  return parsed;
}
