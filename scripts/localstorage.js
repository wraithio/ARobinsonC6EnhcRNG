function saveToLocalStorage(name) {
    let nameArr = getFromLocalStorage("Names");
  
    if (!nameArr.includes(name)) {
      nameArr.push(`${name}`);
    }
  
    localStorage.setItem("Names", JSON.stringify(nameArr));
  }
   
  function getFromLocalStorage() {
    let localStorageData = localStorage.getItem("Names");
  
    if (localStorageData == null) {
      return [];
    }
    return JSON.parse(localStorageData);
  }
  
  function removeFromLocalStorage(name) {
    let localStorageData = getFromLocalStorage("Names");
  
    let Index = localStorageData.indexOf(name);
  
    localStorageData.splice(Index, 1);
  
    localStorage.setItem("Names", JSON.stringify(localStorageData));
  }
  
  export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage};
  