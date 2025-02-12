import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./localstorage.js";
warningText.classList = "d-none";
sliderNum.innerText = slider.valueAsNumber;
totalNames.innerText = getFromLocalStorage().length;

slider.addEventListener("click", () => {
  sliderNum.innerText = slider.valueAsNumber;
});

addBtn.addEventListener("click", () => {
  let nameArr = getFromLocalStorage();
  console.log(nameArr);
  if (nameInput.value == "") {
    console.log("no name available!");
    warningText.classList = "d-block";
  } else if (nameArr.includes(nameInput.value)) {
    console.log("Name has already been added!");
    warningText.classList = "d-block";
  } else {
    warningText.classList = "d-none";
    saveToLocalStorage(nameInput.value);
    createEntry(nameInput.value);
    nameBlock.classList = totalNames.innerText = getFromLocalStorage().length;
  }
});

let createEntry = (name) => {
  let dataEntry = document.createElement("div");
  dataEntry.className = "d-flex justify-content-around";
  let h2 = document.createElement("h2");
  let removeBtn = document.createElement("h2");
  removeBtn.id = "remove";
  removeBtn.innerText = "X";
  removeBtn.addEventListener("click", async () => {
    removeFromLocalStorage(name);
    dataEntry.remove();
    hr.remove();
    nameBlock.classList = totalNames.innerText = getFromLocalStorage().length;
  });
  let hr = document.createElement("hr");
  h2.innerText = name;
  dataEntry.appendChild(h2);
  dataEntry.appendChild(removeBtn);
  nameBlock.appendChild(dataEntry);
  nameBlock.appendChild(hr);
};

let entryOnLoad = () => {
  let nameArr = getFromLocalStorage();
  if (nameArr != []) {
    nameArr.map((name) => {
      let dataEntry = document.createElement("div");
      dataEntry.className = "d-flex row";
      let dataDiv = document.createElement("div");
      dataDiv.className = "col-6 d-flex justify-content-center";
      let dataDiv2 = document.createElement("div");
      dataDiv2.className = "col-6 d-flex justify-content-center";
      let h2 = document.createElement("h2");
      let removeBtn = document.createElement("h2");
      removeBtn.id = "remove";
      removeBtn.innerText = "X";
      removeBtn.addEventListener("click", async () => {
        removeFromLocalStorage(name);
        dataEntry.remove();
        hr.remove();
        totalNames.innerText =
          getFromLocalStorage().length;
      });
      let hr = document.createElement("hr");
      h2.innerText = name;
      dataDiv.appendChild(h2);
      dataDiv2.appendChild(removeBtn);
      dataEntry.appendChild(dataDiv);
      dataEntry.appendChild(dataDiv2);
      nameBlock.appendChild(dataEntry);
      nameBlock.appendChild(hr);
    });
  }
};

let generate = (groups) => {
  randomBody.innerText = "";
  let nameArr = shuffle(getFromLocalStorage());
  let groupArr = [];
  let warningBlock = document.createElement("h2");
  randomBody.appendChild(warningBlock);
  if (Number(totalNames.innerText) < groups) {
    warningBlock.innerText = "Not enough names!";
    return null;
  }
  warningBlock.remove();

  console.log(groups);
  for (let i = 0; i < nameArr.length; i += Number(groups)) {
    console.log(i)
    const splicedArr = nameArr.slice(i, i + Number(groups));
    console.log(splicedArr);
    groupArr.push(shuffle(splicedArr));
  }
  console.log(groupArr);
  if (groupArr[groupArr.length - 1].length > groupArr[0].length) {
    const remainder = groupArr[groupArr.length - 1].slice(
      groupArr[0].length,
      groupArr[groupArr.length - 1].length
    );
    groupArr[groupArr.length - 1] = groupArr[groupArr.length - 1].slice(
      0,
      groupArr[0].length
    );
    groupArr.push(remainder);
  }
  let counter = 1;
  console.log(groupArr);
  groupArr.map((entry) => {
    let groupDiv = document.createElement("div");
    let groupText = document.createElement("h2");
    if (entry.length != groupArr[0].length) {
      groupText.innerText = `Remainder(s): ${entry}`;
    } else {
      groupText.innerText = `Group ${counter}: ${entry}`;
      counter++;
    }
    groupDiv.appendChild(groupText);
    randomBody.appendChild(groupDiv);
  });
};

genBtn.addEventListener("click", () => {
  generate(sliderNum.innerText);
});

// Fisher Yates sorting alogrithm
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
entryOnLoad();
