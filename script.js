//START: ACCORDION
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
//END: ACCORDION

replaceText(document.body);

function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText);
  } else if (element.nodeType === Text.TEXT_NODE) {
    if (element.textContent.match(/Murphy/gi)) {
      const newElement = document.createElement("div");
      newElement.innerHTML = element.textContent.replace(
        /(Murphy)/gi,
        '<div class="tooltip"> $1 <span class="tooltiptext">Tooltip text</span> </div>'
      );
      element.replaceWith(newElement);
    }
  }
}

// test page: https://en.wikipedia.org/wiki/Cillian_Murphy
