let wordList = words.split("\n");

const translateCont = document.getElementById("translateBlock");

// loadng
let loading = document.createElement("h4");
loading.innerHTML = "Loading...";

// click the button SUBMIT
function buttonClick() {
  let input = document.getElementById("search").value;

  if (input.trim().length <= 0) {
    translateCont.innerHTML = "";
    translateCont.appendChild(loading);
    setTimeout(() => {
      showAll();
    }, 2000);
  } else {
    translateCont.innerHTML = "";
    translateCont.appendChild(loading);
    setTimeout(() => {
      findWord(input);
    }, 2000);
  }
}

// Show all words in dictionory
function showAll() {
  translateCont.removeChild(loading);
  wordList.forEach((word, index) => {
    let tm = word.split("-")[0];
    let ru = word.split("-")[1];
    if (ru === undefined) {
      console.log(tm, ru);
    }
    addElement(tm, ru);
  });
}

// Add words in dictionary in translate block
function addElement(tm, ru) {
  let tmBlock = document.createElement("h3");
  tmBlock.style.color = "green";
  tmBlock.innerHTML = tm;
  translateCont.appendChild(tmBlock);

  let ruBlock = document.createElement("ul");
  let ruArray = ru.split(";");
  translateCont.appendChild(ruBlock);

  ruArray.forEach((word, index) => {
    let ruItem = document.createElement("li");
    ruItem.innerHTML = word;
    ruBlock.appendChild(ruItem);
  });
}

// find the users word
function findWord(query) {
  let isFound = false;
  wordList.forEach((word, i) => {
    let tm = word.split("-")[0];
    let ru = word.split("-")[1];
    try {
      if (
        tm.toUpperCase().includes(query.toUpperCase()) ||
        ru.toUpperCase().includes(query.toUpperCase())
      ) {
        isFound = true;
        addElement(tm, ru);
      }
    } catch (err) {}
  });
  if (!isFound) {
    let img = document.createElement("img");
    img.src = "error.png";
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.objectFit = "contain";
    translateCont.appendChild(img);
  }
  translateCont.removeChild(loading);
}

// if user clear the word but didnt press the button
function change() {
  let input = document.getElementById("search").value;
  if (input.trim().length <= 0) {
    translateCont.innerHTML = "";
  }
}
