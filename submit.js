submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", () => {
  console.log("help");
});

submit();

function submit() {
  var json = document.getElementById("json-input");
  console.log(json);
  console.log(json.value);
}
