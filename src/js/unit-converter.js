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
