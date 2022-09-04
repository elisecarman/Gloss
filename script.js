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


// INSERT ON HOVER POP UPS IN PAGE
replaceText(document.body)

function replaceText(element) {

  const dict = {"Murphy" : "Muwwy",
              "actor" : "acwor"}

  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText)
  } else if (element.nodeType === Text.TEXT_NODE) {
    if ( p = element.textContent.match(/(?<![A-Z])Murphy(?![A-Z])/g)) {
      const newElement = document.createElement('div')
     
      console.log(p)

      if (p.length > 1){
        
        for(i in p) {
          const regex = new RegExp(`(?<![A-Z])${p[i]}(?![A-Z])`, "g");
          const replacement = '<div class="tooltip">' + p[i] + '<span class="tooltiptext">' + dict[p[i]] + '</span> </div>'
          newElement.innerHTML = element.textContent.replace(regex, replacement)
          element.replaceWith(newElement) 
        }

    } else {
      const replacement = '<div class="tooltip"> $1 <span class="tooltiptext">' + dict[p] + '</span> </div>'
      newElement.innerHTML = element.textContent.replace(/((?<![A-Z])Murphy(?![A-Z]))/gi, replacement)
        element.replaceWith(newElement)
    }
    }
  }
}

// test page: https://en.wikipedia.org/wiki/Cillian_Murphy