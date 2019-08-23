if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt", event => {
  // prevent automatic prompt of <= 67 chrome version
  event.preventDefault();
  // stash event for later use
  deferredPrompt = event;
});

const installPwaButton = document.getElementById("pwa-install");

installPwaButton.addEventListener("click", event => {
  deferredPrompt.prompt();

  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === "accepted") {
    }
    deferredPrompt = null;
  });
});

window.addEventListener("appinstalled", event => {});

const inputHba1c = document.getElementById("input-hba1c");
const outputAverage = document.getElementById("output-values");
const outputPercent = document.getElementById("calculator-average-percent");
const a1cResetButton = document.getElementById("reset-a1c-input");

const normalBloodSugar = 85;

inputHba1c.addEventListener("keyup", averageBloodSugar);
a1cResetButton.addEventListener("click", resetHba1cField);

/* average blood sugar from HbA1c   */
function averageBloodSugar() {
  a1cResetButton.style.visibility = "visible";
  let HbA1c = inputHba1c.valueAsNumber;

  let a1cToAverageBgValue = 35.6 * HbA1c - 77.3;
  let averageValue;

  if (HbA1c >= 1 && HbA1c <= 200) {
    averageValue = a1cToAverageBgValue;

    outputValues(averageValue);
  } else {
    resetHba1cField();
  }
}
function resetHba1cField() {
  a1cResetButton.style.visibility = "hidden";
  inputHba1c.value = null;
  outputAverage.style.visibility = "hidden";
  outputPercent.style.display = "none";
  outputAverage.style.display = "none";
}

const hba1cValue = document.getElementById("hba1c-value");
const mgdlValue = document.getElementById("mgdl-value");
const mmollValue = document.getElementById("mmoll-value");
const calculatorPercent = document.getElementById("calculator-percent");
/*  outputs average values from HbA1c input   */
function outputValues(averageValue) {
  hba1cValue.textContent = inputHba1c.value + "%";
  mgdlValue.textContent = `~ ${averageValue.toFixed(0)} mg/dl`;
  mmollValue.textContent = `~ ${(averageValue / 18).toFixed(1)} mmol/l`;
  calculatorPercent.textContent = bloodSugarPercentIncrease(averageValue) + "%";

  outputAverage.style.visibility = "visible";
  outputAverage.style.display = "block";
}
/* shows average blood sugar percentage increase from HbA1c input */

function bloodSugarPercentIncrease(averageValue) {
  let percentageIncrease = (
    (averageValue / normalBloodSugar) * 100 -
    100
  ).toFixed(0);
  if (percentageIncrease > 5) {
    outputPercent.style.display = "block";
    return percentageIncrease;
  } else {
    outputPercent.style.display = "none";
  }
}
/* mg/dl <--> mmol/l converter*/
const inputMgdl = document.getElementById("mg/dl-converter");
const inputMmmoll = document.getElementById("mmol/l-converter");

inputMgdl.addEventListener("keyup", convertMgdlToMmml);
inputMmmoll.addEventListener("keyup", convertMmollToMgl);

/* mg/dl to mmol/l */
function convertMgdlToMmml() {
  inputMmmoll.value = (inputMgdl.value / 18).toFixed(1);
  percentageIncreaseAboveNormal();
}

/*  mmol/l to mg/dl  */
function convertMmollToMgl() {
  inputMgdl.value = (inputMmmoll.value * 18).toFixed(0);
  percentageIncreaseAboveNormal();
}

const bgIncreasePercentage = document.getElementById("bg-increase-percentage");
const averagePercentIncrease = document.getElementById(
  "average-percent-increase"
);
/* percentage increase  mmol/l <--> mg/dl   */
let percentageIncreaseAboveNormal = function() {
  let number = inputMgdl.value;
  let percentageIncrease = ((number / normalBloodSugar) * 100 - 100).toFixed(0);
  if (number >= 100) {
    bgIncreasePercentage.textContent = percentageIncrease;
    averagePercentIncrease.style.display = "block";
  } else {
    averagePercentIncrease.style.display = "none";
  }
};

// nav menu
const showNavMenu = document.getElementById("nav-open");
const navContent = document.getElementById("navContent");
const darkModeButton = document.getElementById("dark-mode-button");
const darkModeCheckbox = document.getElementById("dark-mode-checkbox");
showNavMenu.addEventListener("click", openNavMenu);
showNavMenu.addEventListener("mouseover", openNavMenu);
navContent.addEventListener("mouseleave", openNavMenu);
darkModeButton.addEventListener("click", enableDarkMode);

function openNavMenu() {
  if (navContent.style.display === "block") {
    navContent.style.display = "none";
    showNavMenu.textContent = "☰";
  } else {
    navContent.style.display = "block";
    showNavMenu.textContent = "⛌";
  }
}

function enableDarkMode() {
  if (!darkModeCheckbox.checked) {
    darkModeCheckbox.checked = true;
    changeTheme(cssVariableNames, cssVariableColor);
  } else {
    darkModeCheckbox.checked = false;
    changeTheme(cssVariableNames, "");
  }
}

const cssVariableNames = [
  "--main-bg-color",
  "--content-bg-color",
  "--input-bg-color",
  "--font-color"
];
const cssVariableColor = ["#313233", "rgb(24, 26, 27)", "#181a1b", "#fff"];

function changeTheme(name, color) {
  const max = cssVariableNames.length;

  if (darkModeCheckbox.checked) {
    for (let i = 0; i < max; i++) {
      document.body.style.setProperty(`${name[i]}`, `${color[i]}`);
    }
  }
  if (!darkModeCheckbox.checked) {
    for (let i = 0; i < max; i++) {
      document.body.style.removeProperty(`${name[i]}`);
    }
  }
}
