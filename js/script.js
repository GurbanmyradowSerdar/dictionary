let wordList = words.split("\n");

const translateCont = document.getElementById("translateBlock");

//! loadng
let loading = document.createElement("h4");
loading.innerHTML = "Loading...";
loading.className = "loading";
let input = document.getElementById("search-input"),
  searchBtn = document.getElementById("search-button");

//! click the button SUBMIT
function searchWord() {
  if (input.value.trim().length <= 0) {
    input.style.cssText = `border-color : red`;
    searchBtn.style.cssText = `border-color : red; background-color : red; color : white`;
  } else {
    input.style.cssText = null;
    searchBtn.style.cssText = null;
    input.disabled = true;
    translateCont.innerHTML = "";
    translateCont.appendChild(loading);
    setTimeout(() => {
      findWord(input.value);
      input.value = "";
      input.disabled = false;

      // ! adding wave effect in click
      for (const card of translateCont.children) {
        card.addEventListener("click", createRipple);
      }
    }, 2000);
  }
}

// ! search events handlers
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchWord();
  }
});
searchBtn.onclick = searchWord;

//! Add words in dictionary in translate block
function addElement(tm, ru) {
  let ruArray = ru.split(";");
  let card = document.createElement("div"),
    container = document.createElement("div"),
    h4 = document.createElement("h4"),
    ul = document.createElement("ul");

  ul.className = "card-list";
  container.className = "container";
  card.className = "card";

  ruArray.forEach((word) => {
    let ruItem = document.createElement("li");
    ruItem.className = "list-item";
    ruItem.innerHTML = word;
    ul.appendChild(ruItem);
  });

  h4.innerHTML = tm;
  container.append(h4, ul);
  card.append(container);
  translateCont.append(card);
}

//! find the users word
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
    img.style.cssText = `width : 100px; height : 100px; object-fit : contain;
    position : absolute; top : 0; left : 50%; transform: translateX(-50%);`;
    translateCont.appendChild(img);
  }
  translateCont.removeChild(loading);
}

// ! ripple effect (wave)
function createRipple(event) {
  const card = event.currentTarget;
  const cardClassName = card.className;
  for (const item of card.parentNode.children) {
    item.className = "card";
  }

  if (cardClassName === "card-full") {
    card.className = "card";
  } else {
    card.className = "card-full";
  }

  const circle = document.createElement("span");
  const diameter = Math.max(card.clientWidth, card.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - card.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - card.offsetTop - radius}px`;
  circle.classList.add("ripple-effect");

  const ripple = card.getElementsByClassName("ripple-effect")[0];

  if (ripple) {
    ripple.remove();
  }

  card.appendChild(circle);
}
