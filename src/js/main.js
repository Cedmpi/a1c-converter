if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("https://cedmpi.github.io/a1c-converter/src/sw.js");
  });
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt", event => {
  // prevent automatic prompt of <= 67 chrome version
  event.preventDefault();
  // stash event for later use
  deferredPrompt = event;
});

window.addEventListener("appinstalled", event => {});

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

/* HbA1c converter */

const outputAverage = document.getElementById("output-values");
const outputPercent = document.getElementById("calculator-average-percent");
const a1cResetButton = document.getElementById("reset-a1c-input");

const inputHba1cPercent = document.getElementById("hba1c-percent-input");
const inputHba1cMmoll = document.getElementById("hba1c-mmoll-input");

const normalBloodSugar = 85;

inputHba1cPercent.addEventListener("keyup", convertHba1cPercentInput);
inputHba1cMmoll.addEventListener("keyup", convertHba1cMmollInput);
a1cResetButton.addEventListener("click", resetHba1cField);

function convertHba1cPercentInput() {
  let n = inputHba1cPercent.value;
  if (n <= 100) {
    a1cResetButton.style.visibility = "visible";
    inputHba1cMmoll.value = convertA1cPercentToA1cMmoll().toFixed(2);
    convertAverageBloodSugarFromHba1c(
      (HbA1c = inputHba1cPercent.valueAsNumber)
    );
  } else {
    resetHba1cField();
  }
}
function convertHba1cMmollInput() {
  let n = inputHba1cMmoll.value;
  if (n <= 1200) {
    a1cResetButton.style.visibility = "visible";
    inputHba1cPercent.value = convertA1cMmollToA1cPercent().toFixed(1);
    convertAverageBloodSugarFromHba1c(
      (HbA1c = inputHba1cPercent.valueAsNumber)
    );
  } else {
    resetHba1cField();
  }
}
/* average blood sugar from HbA1c   */
function convertAverageBloodSugarFromHba1c(hbA1c) {
  let a1cToAverageBgValue = 35.6 * hbA1c - 77.3;

  let averageValue;
  averageValue = a1cToAverageBgValue;
  outputValues(averageValue);
}

function resetHba1cField() {
  a1cResetButton.style.visibility = "hidden";
  inputHba1cMmoll.value = null;
  inputHba1cPercent.value = null;
  outputAverage.style.visibility = "hidden";
  outputPercent.style.display = "none";
  outputAverage.style.display = "none";
}
function convertA1cPercentToA1cMmoll() {
  let percentHba1c = inputHba1cPercent.value;
  let hbA1cMmoll = (percentHba1c - 2.15) * 10.929;
  return hbA1cMmoll;
}
function convertA1cMmollToA1cPercent() {
  let mmollHba1c = inputHba1cMmoll.value;
  let hbA1cPercent = mmollHba1c * 0.0915 + 2.15;
  return hbA1cPercent;
}

const hba1cValuePercent = document.getElementById("hba1c-value-percent");
const hba1cValueMmoll = document.getElementById("hba1c-value-mmoll");

const mgdlValueOutput = document.getElementById("mgdl-value");
const mmollValueOutput = document.getElementById("mmoll-value");
const hba1cPercentIncrease = document.getElementById("hba1c-percent-increase");

/*  outputs average values from HbA1c input   */
function outputValues(averageValue) {
  hba1cValuePercent.textContent = inputHba1cPercent.value + " percent";
  hba1cValueMmoll.textContent = inputHba1cMmoll.value;
  mgdlValueOutput.textContent = `~ ${averageValue.toFixed(0)} mg/dl`;
  mmollValueOutput.textContent = `~ ${(averageValue / 18).toFixed(1)} mmol/l`;
  hba1cPercentIncrease.textContent =
    bloodSugarPercentIncrease(averageValue) + "%";

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

// nav menu
const showNavMenu = document.getElementById("nav-open");
const navContent = document.getElementById("navContent");
const darkModeButton = document.getElementById("dark-mode-button");
const darkModeCheckbox = document.getElementById("dark-mode-checkbox");
showNavMenu.addEventListener("click", openNavMenu);
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
