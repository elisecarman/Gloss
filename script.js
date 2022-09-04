
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

async function replaceText(element) {

  domainPieces = await getActiveTabURL()
  
  
  
  /* domainPieces = ["en.wikipedia.org","wiki","Cillian_Murphy"] */
  
  dict = await fetchDatabase(domainPieces[0])
  currDict = dict

  for (p in domainPieces){
    if (p > 0){
      if (domainPieces[p] in currDict){
        currDict = currDict[domainPieces[p]]
      } else{
        break;
      }
    }
  }
  

  var acronyms = {}
  var regexString = ''

  if ("acronyms" in currDict){
   
    acronyms = currDict["acronyms"]
    regexString = currDict["regex"]
  }

  /* console.log(acronyms)
  console.log(regexString)
   */
  const regex = new RegExp(regexString, "g")

  if (Object.keys(acronyms).length != 0){

  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText)
  } else if (element.nodeType === Text.TEXT_NODE) {
    if ( p = element.textContent.match(regex)) {
      const newElement = document.createElement('div')
     
      console.log("all the way here")
      if (p.length > 1){
        
        for(i in p) {
          const partialRegex = new RegExp(`(?<![A-Z])${p[i]}(?![A-Z])`, "g");
          const replacement = '<div class="tooltip">' + p[i] + '<span class="tooltiptext">' + acronyms[p[i]] + '</span> </div>'
          newElement.innerHTML = element.textContent.replace(partialRegex, replacement)
          element.replaceWith(newElement) 
        }

    } else {
      const replacement = '<div class="tooltip">' + p + '<span class="tooltiptext">' + acronyms[p] + '</span> </div>'
      newElement.innerHTML = element.textContent.replace(regex, replacement)
      element.replaceWith(newElement)
    }
    }
  }}
}

// test page: https://en.wikipedia.org/wiki/Cillian_Murphy

function fetchDatabase(domain){
  return new Promise((resolve) => {
    chrome.storage.sync.get([domain], (obj) => {
      resolve(obj[domain] ? (obj[domain]) : []);
    });
  });
}

async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });
  var fullURL = tabs[0].url
  var pieces = fullURL.split("/")

  pieces.shift()
  pieces.shift()

  return fullURL;
}