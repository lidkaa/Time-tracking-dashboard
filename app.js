let mainInfo = { 
    userPhoto: "./images/image-jeremy.png",
    userName: "Jeremy",
    userSurname: "Robson",
    textReport: "Report for",
    timeFramesMenu: ["Daily", "Weekly", "Monthly"]
  };
let colors = {
    work: "hsl(15, 100%, 70%",
    play: "hsl(195, 74%, 62%)",
    study: "hsl(348, 100%, 68%",
    exercise: "hsl(145, 58%, 55%",
    social: "hsl(264, 64%, 52%",
    selfcare: "hsl(43, 84%, 65%"
  };
let iconsNames = {
    work: "icon-work.svg",
    play: "icon-play.svg",
    study: "icon-study.svg",
    exercise: "icon-exercise.svg",
    social: "icon-social.svg",
    selfcare: "icon-self-care.svg"
   };

let smallBoxContainer = document.querySelector(".smallBoxContainer");
let dataArray;
let dataBoxes;

//colors
let colorsArray = [];
for (const element in colors) {
colorsArray.push(colors[element]);
}

//icons
let iconsArray = [];
for (const element in iconsNames) {
iconsArray.push(iconsNames[element]);
}

//fetching data
fetch('data.json')
.then(function(response){
return response.json();
})
.then(function(data) {
insertData(data);
})
.catch(function(error) {
console.log("error: ", error);
})

// inserting data and new DOM elements
function insertData(data) {
dataArray = data;

dataArray.forEach(element => {
let box = document.createElement("div");
box.classList.add("smallBox", "boxRound");
smallBoxContainer.appendChild(box);
});

let smallBoxes = document.querySelectorAll(".smallBox");

smallBoxes.forEach((element, index, array) => {
element.style.backgroundColor = colorsArray[index];
element.style.backgroundImage = `url(./images/${iconsArray[index]})`;
element.innerHTML = "<div class='smallInnerBox boxRound'></div>";
})

let smallInnerBoxes = document.querySelectorAll(".smallInnerBox");
dataBoxes = smallInnerBoxes;

for (let i = 0; i < smallInnerBoxes.length; i++) {
smallInnerBoxes[i].innerHTML = `<div class='activityMenu'><span class='activity'></span>
                            <div class='menu'></div></div>
                            <div class='currentTime textLarge'></div>
                            <div class='previousTime textSmall'></div>`;
}

insertDetails(dataArray, smallInnerBoxes, "daily");
}

function insertDetails(dataArray, smallInnerBoxes, time) {
for (let i = 0; i < smallInnerBoxes.length; i++) {
let activity = smallInnerBoxes[i].firstChild.firstChild;
activity.innerText = dataArray[i].title;
let currentTime = smallInnerBoxes[i].children[1];
currentTime.innerText = dataArray[i]["timeframes"][time]["current"] + "hrs";
let previousTime = smallInnerBoxes[i].children[2];
previousTime.innerText = `Last week- ${dataArray[i]['timeframes'][time]['previous']}hrs`;
}

let activeTimeOption = document.querySelector(".timeFramesMenu").children;

for (let i = 0; i < activeTimeOption.length; i++) {
if (activeTimeOption[i].innerText.toLowerCase() === time) {
activeTimeOption[i].style.color = "white";
} else {
activeTimeOption[i].style.color = "hsl(246, 57%, 77%)";
}
}
}

//mainBox - inserting data and new DOM elements
document.querySelector(".textReport").innerText =  mainInfo.textReport;
document.querySelector(".name").innerText = mainInfo.userName;
document.querySelector(".surname").innerText = mainInfo.userSurname;
document.querySelector(".userImage").src = mainInfo.userPhoto;

let timeFramesMenu = document.querySelector(".timeFramesMenu");
let menuContent = [];

for (let i = 0; i < mainInfo.timeFramesMenu.length; i++) {
menuContent.push(`<li onclick="insertDetails(dataArray, dataBoxes, event.target.innerText.toLowerCase())">${mainInfo.timeFramesMenu[i]}</li>`);
}

timeFramesMenu.innerHTML = menuContent.join('');