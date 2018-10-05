const characterCounter = str => {
  let lng = str.length;
  document.getElementById("character-counter").innerHTML =
    lng + "/200 caractères restant";
};
