submitButton = document.getElementById("json-input");

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  submit(e.target.elements.json.value);
  e.target.elements.json.value = "";
});

async function submit(data) {
  try {

    /* 
    {"items":[]}
    */
    const parsed = JSON.parse(data);
    domainPieces = await getActiveTabURL()
    console.log(domainPieces)

    parseFile(domainPieces, parsed)

  } catch (error) {
    console.log(error);
  }

 
}

async function parseFile(domainPieces, data) {
  //assuming the format is the following:
  // {items : [data]}
  const items = data["items"]

  //create regex expression
  const acronyms = Object.keys(items)
  var regex = ``

  for (a in acronyms){
    if (a < acronyms.length - 1){
       regex += `(?<![A-Z])${acronyms[a]}(?![A-Z])|`
    } else{
      regex += `(?<![A-Z])${acronyms[a]}(?![A-Z])`
    }
  }

  //create dict structure for URL
  var insert = {}
  var currentLevel = insert
  for (p in domainPieces){
    if (p > 0){
      currentLevel[domainPieces[p]] = {}
      currentLevel = currentLevel[domainPieces[p]]
    } 
  }

  currentLevel["acronyms"] = items
  currentLevel["regex"] = regex

  
  chrome.storage.sync.set({
    [domainPieces[0]]: insert
  });
  
  result = await fetchDatabase(domainPieces[0])
  console.log(result)
}


function fetchDatabase(domain){
  return new Promise((resolve) => {
    chrome.storage.sync.get([domain], (obj) => {
      resolve(obj[domain] ? (obj[domain]) : []);
    });
  });
}

