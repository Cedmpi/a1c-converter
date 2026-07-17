import { formatNumber, debounce } from "./utils.js";

const historyList = document.getElementById("history-value-list");

function _addToHistory(fromVal, fromUnit, toVal, toUnit) {
  if (!historyList) return;
  const entry = `${fromVal} ${fromUnit} = ${toVal} ${toUnit}`;

  // remove if duplicate
  const existing = Array.from(historyList.children).find(li => li.textContent === entry);
  if (existing) historyList.removeChild(existing);

  // cap at 10 items
  while (historyList.children.length >= 10) {
    historyList.removeChild(historyList.firstElementChild);
  }

  const li = document.createElement("li");
  li.textContent = entry;
  historyList.appendChild(li);
}

const sectionHistory = document.getElementById("converter-history");

const showHistoryButton = document.getElementById("show-history-button");

showHistoryButton.addEventListener("click", () => {
  if (!sectionHistory) return;
  sectionHistory.style.visibility = sectionHistory.style.visibility === "visible" ? "hidden" : "visible";
});

const closeHistoryLog = document.getElementById("close-history");
closeHistoryLog.addEventListener("click", () => { sectionHistory.style.visibility = "hidden"; });

const resetHistoryButton = document.getElementById("reset-history-button");
resetHistoryButton.addEventListener("click", deleteHistory);

function deleteHistory() {
  while (historyList.children.length >= 1) {
    historyList.removeChild(historyList.childNodes[0]);
  }
}

const addToHistory = debounce(_addToHistory, 400);


// --- Generic converter ---
function setupConverter(firstInputId, secondInputId, firstSelectId, secondSelectId, resetId, unitMap, baseUnit) {
  const input1 = document.getElementById(firstInputId);
  const input2 = document.getElementById(secondInputId);
  const select1 = document.getElementById(firstSelectId);
  const select2 = document.getElementById(secondSelectId);
  const resetBtn = document.getElementById(resetId);



  function convert(event) {
    resetBtn.style.visibility = "visible";
    let fromInput, toInput, fromUnit, toUnit;

    if (event.target === input1) {
      fromInput = input1;
      toInput = input2;
      fromUnit = select1.value;
      toUnit = select2.value;
      toInput.value = formatNumber((fromInput.value * unitMap[fromUnit]) / unitMap[toUnit]);
    } else if (event.target === input2) {
      fromInput = input2;
      toInput = input1;
      fromUnit = select2.value;
      toUnit = select1.value;
      toInput.value = formatNumber((fromInput.value * unitMap[fromUnit]) / unitMap[toUnit]);
    } else if (event.target === select1) {
      fromInput = input1;
      toInput = input2;
      fromUnit = select1.value;
      toUnit = select2.value;
      if (toInput.value !== "") {
        fromInput.value = formatNumber((toInput.value * unitMap[toUnit]) / unitMap[fromUnit]);
      }
    } else if (event.target === select2) {
      fromInput = input2;
      toInput = input1;
      fromUnit = select2.value;
      toUnit = select1.value;
      if (toInput.value !== "") {
        fromInput.value = formatNumber((toInput.value * unitMap[toUnit]) / unitMap[fromUnit]);
      }
    }

    // --- add to history (debounced) ---
    if (fromInput.value !== "") {
      addToHistory(fromInput.value, fromUnit, toInput.value, toUnit);
    }
  }




  input1.addEventListener("input", convert);
  input2.addEventListener("input", convert);
  select1.addEventListener("change", convert);
  select2.addEventListener("change", convert);

  resetBtn.addEventListener("click", () => {
    resetBtn.style.visibility = "hidden";
    input1.value = input2.value = "";
  });
}

// --- Weight units (base: gram) ---
const weightUnits = {
  kilogram: 1000,
  gram: 1,
  pound: 453.592,
  ounce: 28.3495
};
setupConverter("first-weight-input", "secound-weight-input", "first-weight-select", "secound-weight-select", "reset-weight-input", weightUnits, "gram");

// --- Liquid units (base: milliliter) ---
const liquidUnits = {
  liter: 1000,
  milliliter: 1,
  gallon: 3785.41,
  cup: 240,
  ounce: 29.5735
};
setupConverter("first-liquid-input", "secound-liquid-input", "first-liquid-select", "secound-liquid-select", "reset-liquid-input", liquidUnits, "milliliter");

// --- Length units (base: meter) ---
const lengthUnits = {
  kilometer: 1000,
  meter: 1,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.34,
  feet: 0.3048,
  inch: 0.0254
};
setupConverter("first-length-input", "secound-length-input", "first-length-select", "secound-length-select", "reset-length-input", lengthUnits, "meter");

// --- Height converter (feet.inch → meter/centimeter) ---
const heightUnits = {
  meter: 1,
  centimeter: 0.01
};

function parseFeetInch(value) {
  const str = String(value).trim();
  if (str === "") return null;
  const parts = str.split(".");
  const feet = parseInt(parts[0], 10);
  const inches = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  if (isNaN(feet) || isNaN(inches) || feet < 0 || inches < 0 || inches > 11) return null;
  return { feet, inches };
}

function feetInchToMeter(feet, inches) {
  return feet * 0.3048 + inches * 0.0254;
}

function meterToFeetInch(meters) {
  const totalInches = meters / 0.0254;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  if (inches === 12) { return `${feet + 1}.0`; }
  return `${feet}.${inches}`;
}

function setupHeightConverter(firstInputId, secondInputId, firstSelectId, secondSelectId, resetId) {
  const input1 = document.getElementById(firstInputId);
  const input2 = document.getElementById(secondInputId);
  const select1 = document.getElementById(firstSelectId);
  const select2 = document.getElementById(secondSelectId);
  const resetBtn = document.getElementById(resetId);

  function convert(event) {
    resetBtn.style.visibility = "visible";
    if (event.target === input1 || event.target === select2) {
      const parsed = parseFeetInch(input1.value);
      if (!parsed) { input2.value = ""; return; }
      const meters = feetInchToMeter(parsed.feet, parsed.inches);
      const toUnit = select2.value;
      const decimals = toUnit === "centimeter" ? 0 : 2;
      input2.value = formatNumber(meters / heightUnits[toUnit], decimals);
    } else if (event.target === input2 || event.target === select1) {
      const val = parseFloat(input2.value);
      if (isNaN(val)) { input1.value = ""; return; }
      const fromUnit = select2.value;
      const meters = val * heightUnits[fromUnit];
      input1.value = meterToFeetInch(meters);
    }

    if (input1.value !== "" && input2.value !== "") {
      addToHistory(input1.value, select1.value, input2.value, select2.value);
    }
  }

  input1.addEventListener("input", convert);
  input2.addEventListener("input", convert);
  select1.addEventListener("change", convert);
  select2.addEventListener("change", convert);

  resetBtn.addEventListener("click", () => {
    resetBtn.style.visibility = "hidden";
    input1.value = input2.value = "";
  });
}

setupHeightConverter("first-height-input", "second-height-input", "first-height-select", "second-height-select", "reset-height-input");
