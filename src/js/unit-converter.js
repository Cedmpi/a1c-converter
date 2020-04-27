/* weight converter  */

const inputFirstWeight = document.getElementById("first-weight-input");
const inputSecoundWeight = document.getElementById("secound-weight-input");
const weightResetButton = document.getElementById("reset-weight-input");

inputFirstWeight.addEventListener("input", convertInputWeight);
inputSecoundWeight.addEventListener("input", convertInputWeight);

const firstWeightSelect = document.getElementById("first-weight-select");
const secoundWeightSelect = document.getElementById("secound-weight-select");

firstWeightSelect.addEventListener("change", convertInputWeight);
secoundWeightSelect.addEventListener("change", convertInputWeight);

weightResetButton.addEventListener("click", () => {
  weightResetButton.style.visibility = "hidden";
  inputFirstWeight.value = null;
  inputSecoundWeight.value = null;
});

const elementInputSelectWeight = {
  firstInput: inputFirstWeight,
  secoundInput: inputSecoundWeight,
  firstSelect: firstWeightSelect,
  secoundSelect: secoundWeightSelect
};

const weightSelectCombination = {
  // kilogram to pound
  kilogrampound: x => {
    return (x * 2.2).toFixed(1);
  },
  // kilogram to gram
  kilogramgram: x => {
    return x * 1000;
  },
  // kilogram to ounce (us)
  kilogramounce: x => {
    return (x * 35.274).toFixed(2);
  },
  // kilogram to cup (us)
  kilogramcup: x => {
    return (x * 4.166667).toFixed(2);
  },
  // kilogram to tablespoon
  kilogramtablespoon: x => {
    return (x * 66.666666666666666666666666666667).toFixed(2);
  },
  // kilogram to teaspoon
  kilogramteaspoon: x => {
    return x * 200;
  },
  // gram to ounce
  gramounce: x => {
    return (x * 0.035274).toFixed(2);
  },
  // gram to pound
  grampound: x => {
    return (x * 0.0022).toFixed(1);
  },
  // gram to kilogram
  gramkilogram: x => {
    return x / 1000;
  },
  // gram to cup
  gramcup: x => {
    return (x * 0.004166667).toFixed(2);
  },
  // gram to tablespoon
  gramtablespoon: x => {
    return x / 15;
  },
  // gram to teaspoon
  gramteaspoon: x => {
    return x / 5;
  },
  // pound to kilogram
  poundkilogram: x => {
    return (x / 2.2).toFixed(1);
  },
  // pound to gram
  poundgram: x => {
    return (x / 0.0022).toFixed(2);
  },
  // pound to ounce
  poundounce: x => {
    return (x * 16).toFixed(2);
  },
  // pound to cup
  poundcup: x => {
    return (x * 1.899683333333333333333333333333).toFixed(2);
  },
  // pound to tablespoon
  poundtablespoon: x => {
    return (x * 30.239493333333333333333333333333).toFixed(2);
  },
  // pound to teaspoon
  poundteaspoon: x => {
    return (x * 90.718488).toFixed(2);
  },
  // ounce to kilogram
  ouncekilogram: x => {
    return (x / 35.274).toFixed(2);
  },
  // ounce to gram
  ouncegram: x => {
    return (x / 0.035274).toFixed(2);
  },
  // ounce to pound
  ouncepound: x => {
    return (x / 16).toFixed(2);
  },
  // ounce to cup
  ouncecup: x => {
    return (x * 0.11666666666666666666666666666667).toFixed(2);
  },
  // ounce to tablespoon
  ouncetablespoon: x => {
    return (x / 1.8666666666666666666666666666667).toFixed(2);
  },
  // ounce to teaspoon
  ounceteaspoon: x => {
    return (x / 5.6).toFixed(2);
  },
  // cup to kilogram
  cupkilogram: x => {
    return (x / 4.166667).toFixed(2);
  },
  // cup to gram
  cupgram: x => {
    return (x / 0.004166667).toFixed(2);
  },
  // cup to pound
  cuppound: x => {
    return (x / 1.8899683333333333333333333333333).toFixed(2);
  },
  // cup to tablespoon
  cuptablespoon: x => {
    return (x * 16).toFixed(2);
  },
  // cup to teaspoon
  cupteaspoon: x => {
    return (x * 5.6).toFixed(2);
  },
  // cup to ounce
  cupounce: x => {
    return (x / 0.11666666666666666666666666666667).toFixed(2);
  },
  // tablespoon to kilogram
  tablespoonkilogram: x => {
    return (x / 66.666666666666666666666666666667).toFixed(2);
  },
  // tablespoon to gram
  tablespoongram: x => {
    return x * 15;
  },
  // tablespoon to pound
  tablespoonpound: x => {
    return (x / 30.239493333333333333333333333333).toFixed(2);
  },
  // tablespoon to cup
  tablespooncup: x => {
    return (x / 16).toFixed(2);
  },
  // tablespoon to teaspoon
  tablespoonteaspoon: x => {
    return x * 3;
  },
  // tablespoon to ounce
  tablespoonounce: x => {
    return (x / 1.8666666666666666666666666666667).toFixed(2);
  },
  // teaspoon to kilogram
  teaspoonkilogram: x => {
    return (x / 200).toFixed(2);
  },
  // teaspoon to gram
  teaspoongram: x => {
    return x * 5;
  },
  // teaspoon to pound
  teaspoonpound: x => {
    return (x / 90.718488).toFixed(2);
  },
  // teaspoon to cup
  teaspooncup: x => {
    return (x / 48).toFixed(2);
  },
  // teaspoon to tablespoon
  teaspoontablespoon: x => {
    return x / 3;
  },
  // teaspoon to ounce
  teaspoonounce: x => {
    return (x / 5.6).toFixed(2);
  }
};

// pound  gram kilogram cup  ounce     tablespoon teaspoon                    453.5924

//  weight unit conversion
function convertInputWeight(event) {
  event = event || window.event; //  window.event for firefox
  weightResetButton.style.visibility = "visible";
  inputConverter(event, elementInputSelectWeight, weightSelectCombination);
}

// liquid converter

const inputFirstLiquid = document.getElementById("first-liquid-input");
const inputSecoundLiquid = document.getElementById("secound-liquid-input");
const liquidResetButton = document.getElementById("reset-liquid-input");

inputFirstLiquid.addEventListener("input", convertInputLiquid);
inputSecoundLiquid.addEventListener("input", convertInputLiquid);

const firstLiquidSelect = document.getElementById("first-liquid-select");
const secoundLiquidSelect = document.getElementById("secound-liquid-select");

firstLiquidSelect.addEventListener("change", convertInputLiquid);
secoundLiquidSelect.addEventListener("change", convertInputLiquid);

liquidResetButton.addEventListener("click", () => {
  liquidResetButton.style.visibility = "hidden";
  inputFirstLiquid.value = null;
  inputSecoundLiquid.value = null;
});

const elementInputSelectLiquid = {
  firstInput: inputFirstLiquid,
  secoundInput: inputSecoundLiquid,
  firstSelect: firstLiquidSelect,
  secoundSelect: secoundLiquidSelect
};

//  Liquid unit conversion
function convertInputLiquid(event) {
  event = event || window.event; //  window.event for firefox
  liquidResetButton.style.visibility = "visible";
  inputConverter(event, elementInputSelectLiquid, liquidSelectCombination);
}

const liquidSelectCombination = {
  // litre to gallon
  litregallon: x => {
    return (x / 3.785412).toFixed(2);
  },
  // litre to cup
  litrecup: x => {
    return (x / 0.24).toFixed(2);
  },
  // litre to ounce
  litreounce: x => {
    return (x / 0.03).toFixed(2);
  },
  // litre to quart
  litrequart: x => {
    return (x / 0.946353).toFixed(2);
  },
  // litre to millilitre
  litremillilitre: x => {
    return x * 1000;
  },
  //  millilitre to gallon
  millilitregallon: x => {
    return (x / 3785.412).toFixed(6);
  },
  // millilitre to quart
  millilitrequart: x => {
    return (x / 946.353).toFixed(2);
  },
  // millilitre to ounce
  millilitreounce: x => {
    return (x / 30).toFixed(2);
  },
  // millilitre to litre
  millilitrelitre: x => {
    return x / 1000;
  },
  // millilitre to cup
  millilitrecup: x => {
    return (x / 240).toFixed(2);
  },
  // gallon to litre
  gallonlitre: x => {
    return (x * 3.785412).toFixed(2);
  },
  // gallon to millilitre
  gallonmillilitre: x => {
    return (x * 3785.412).toFixed(6);
  },
  // gallon to quart
  gallonquart: x => {
    return x * 4;
  },
  // gallon to cup
  galloncup: x => {
    return (x * 15.767166666666666666666666666667).toFixed(2);
  },
  // gallon to ounce
  gallonounce: x => {
    return (x * 126.13733333333333333333333333333).toFixed(2);
  },
  // cup to litre
  cuplitre: x => {
    return (x * 0.24).toFixed(2);
  },
  // cup to millilitre
  cupmillilitre: x => {
    return (x * 240).toFixed(2);
  },
  // cup to gallon
  cupgallon: x => {
    return (x / 15.767166666666666666666666666667).toFixed(2);
  },
  // cup to ounce
  cupounce: x => {
    return x * 8;
  },
  // cup to quart
  cupquart: x => {
    return (x / 3.943137275).toFixed(2);
  },
  // ounce to litre
  ouncelitre: x => {
    return (x * 0.03).toFixed(2);
  },
  // ounce to millilitre
  ouncemillilitre: x => {
    return (x * 30).toFixed(2);
  },
  // ounce to gallon
  ouncegallon: x => {
    return (x / 126.13733333333333333333333333333).toFixed(2);
  },
  // ounce to quart
  ouncequart: x => {
    return (x / 31.5450982).toFixed(2);
  },
  // ounce to cup
  ouncecup: x => {
    return x / 8;
  },
  // quart to litre
  quartlitre: x => {
    return (x * 0.946353).toFixed(2);
  },
  // quart to millilitre
  quartmillilitre: x => {
    return (x * 946.353).toFixed(2);
  },
  // quart to gallon
  quartgallon: x => {
    return x / 4;
  },
  // quart to ounce
  quartounce: x => {
    return (x * 31.5450982).toFixed(2);
  },
  // quart to cup
  quartcup: x => {
    return (x * 3.943137275).toFixed(2);
  }
};

// length converter

const inputFirstLength = document.getElementById("first-length-input");
const inputSecoundLength = document.getElementById("secound-length-input");
const lengthResetButton = document.getElementById("reset-length-input");

inputFirstLength.addEventListener("input", convertInputLength);
inputSecoundLength.addEventListener("input", convertInputLength);

const firstLengthSelect = document.getElementById("first-length-select");
const secoundLengthSelect = document.getElementById("secound-length-select");

firstLengthSelect.addEventListener("change", convertInputLength);
secoundLengthSelect.addEventListener("change", convertInputLength);

lengthResetButton.addEventListener("click", () => {
  lengthResetButton.style.visibility = "hidden";
  inputFirstLength.value = null;
  inputSecoundLength.value = null;
});

const elementInputSelectLength = {
  firstInput: inputFirstLength,
  secoundInput: inputSecoundLength,
  firstSelect: firstLengthSelect,
  secoundSelect: secoundLengthSelect
};

//  length unit conversion
function convertInputLength(event) {
  event = event || window.event; //  window.event for firefox
  lengthResetButton.style.visibility = "visible";
  inputConverter(event, elementInputSelectLength, lenghtSelectCombination);
}

const lenghtSelectCombination = {
  //  kilometre to mile
  kilometremile: x => {
    return (x / 1.609344).toFixed(2);
  },
  //  kilometre to feet
  kilometrefeet: x => {
    return (x / 0.03048).toFixed(2); 
  },
  //  kilometre to inch
  kilometreinch: x => {
    return (x / 0.0000254).toFixed(3);
  },
  //  kilometre to metre
  kilometremetre: x => {
    return x * 1000;
  },
  //  kilometre to centimetre
  kilometrecentimetre: x => {
    return x * 100000;
  },
  // kilometre to millimetre
  kilometremillimetre: x => {
    return x * 1000000;
  },
  // metre to mile
  metremile: x => {
    return (x / 1609.344).toFixed(2);
  },
  // metre to feet
  metrefeet: x => {
    return (x / 0.3048).toFixed(2);
  },
  // metre to inch
  metreinch: x => {
    return (x / 0.0254).toFixed(2);
  },
  // metre to kilometre
  metrekilometre: x => {
    return x / 1000;
  },
  // metre to centimetre
  metrecentimetre: x => {
    return x * 100;
  },
  // metre to millimetre
  metremillimetre: x => {
    return x * 1000;
  },
  // centimetre to mile
  centimetremile: x => {
    return (x / 160934.4).toFixed(8);
  }, // centimetre feet
  centimetrefeet: x => {
    return (x / 30.48).toFixed(4);
  }, // centimetre to inch
  centimetreinch: x => {
    return (x / 2.54).toFixed(2);
  }, // centimetre to kilometre
  centimetrekilometre: x => {
    return x / 100000;
  }, // centimetre to metre
  centimetremetre: x => {
    return x / 100;
  },
  // centimetre to  millimetre
  centimetremillimetre: x => {
    return x * 10;
  },
  // mile to kilometre
  milekilometre: x => {
    return (x * 1.609344).toFixed(2);
  },
  // mile to metre
  milemetre: x => {
    return (x * 1609.344).toFixed(2);
  },
  // mile to centimetre
  milecentimetre: x => {
    return (x * 160934.4).toFixed(2);
  },
  // mile to millimetre
  milemillimetre: x => {
    return (x * 1609344).toFixed(2);
  },
  // mile to feet
  milefeet: x => {
    return x * 5280;
  },
  // mile to inch
  mileinch: x => {
    return x * 63360;
  },
  // feet to  kilometre
  feetkilometre: x => {
    return (x * 0.0003048).toFixed(2);
  },
  // feet to metre
  feetmetre: x => {
    return (x * 0.3048).toFixed(2);
  },
  // feet to  centimetre
  feetcentimetre: x => {
    return (x * 30.48).toFixed(2);
  },
  // feet to millimetre
  feetmillimetre: x => {
    return (x * 3.048).toFixed(1);
  },
  // feet to mile
  feetmile: x => {
    return (x / 5280).toFixed(2);
  },
  // feet to inch
  feetinch: x => {
    return x * 12;
  },
  // inch to kilometre
  inchkilometre: x => {
    return (x * 0.0000254).toFixed(4);
  },
  // inch to metre
  inchmetre: x => {
    return (x * 0.0254).toFixed(2);
  },
  // inch to centimetre
  inchcentimetre: x => {
    return (x * 2.54).toFixed(2);
  },
  // inch to millimetre
  inchmillimetre: x => {
    return (x * 25.4).toFixed(2);
  },
  // inch to mile
  inchmile: x => {
    return (x / 63360).toFixed(4);
  },
  // inch to feet
  inchfeet: x => {
    return x / 12;
  },
  // millimetre to mile
  millimetremile: x => {
    return (x / 1609344).toFixed(5);
  },
  // millimetre to kilometre
  millimetrekilometre: x => {
    return x / 1000000;
  },
  // millimetre to metre
  millimetremetre: x => {
    return x / 1000;
  },
  // millimetre to centimetre
  millimetrecentimetre: x => {
    return x / 10;
  },
  // millimetre to feet
  millimetrefeet: x => {
    return (x  / 304.8).toFixed(1);
  },
  // millimetre to inch
  millimetreinch: x => {
    return (x / 25.4).toFixed(2);
  }
};

//  Abstract unit input converter
function inputConverter(event, inputElements, unitConversionFunctions) {
  // log values to history
  setTimeout(() => {
    addToHistory(inputElements);
  }, 100);

  /*  both <select> option values combined */
  const firstUnitCombination =
    inputElements.firstSelect.value + inputElements.secoundSelect.value;

  const secoundUnitCombination =
    inputElements.secoundSelect.value + inputElements.firstSelect.value;

  /* checks which input field is used ,convert corresponding input field */

  // first input field
  if (event.target.id === inputElements.firstInput.id) {
    inputElements.secoundInput.value = convertInput(
      unitConversionFunctions,
      inputElements.firstInput.value,
      firstUnitCombination
    );
  }
  // secound input field
  if (event.target.id === inputElements.secoundInput.id) {
    inputElements.firstInput.value = convertInput(
      unitConversionFunctions,
      inputElements.secoundInput.value,
      secoundUnitCombination
    );
  }
  /*  if <select> option is changed, convert corresponding input field */

  // first <select> element
  if (event.target.id === inputElements.firstSelect.id) {
    inputElements.firstInput.value = convertInput(
      unitConversionFunctions,
      inputElements.secoundInput.value,
      secoundUnitCombination
    );
  }
  // secound <select> element
  if (event.target.id === inputElements.secoundSelect.id) {
    inputElements.secoundInput.value = convertInput(
      unitConversionFunctions,
      inputElements.firstInput.value,
      firstUnitCombination
    );
  }
}

// selects and calls correct function and returns the conversion value
function convertInput(conversionFunction, inputValue, unitCombination) {
  const selectOption = `${unitCombination}`;
  return conversionFunction[selectOption](inputValue);
  //  e.g. kg to lbs = combinationFunction[kilogrampound](inputValue)
}

/*  history log for converter calculations */

// display history log
const showHistoryButton = document.getElementById("show-history-button");
const sectionHistory = document.getElementById("converter-history");
showHistoryButton.addEventListener("click", () => {
  sectionHistory.style.visibility = "visible";
});
const closeHistoryLog = document.getElementById("close-history");
closeHistoryLog.addEventListener("click", () => {sectionHistory.style.visibility = "hidden"; });
const historyList = document.getElementById("history-value-list");

function addToHistory(inputElements) {
  if (historyList.childNodes.length > 10) {
    historyList.removeChild(historyList.childNodes[0]);
  }

  const liElement = document.createElement("LI");

  //  logs both <input> <select> values to new <li>
  setTimeout(() => {
    const historyValue = document.createTextNode(
      `${inputElements.firstInput.value} ${inputElements.firstSelect.value}  =  
      ${inputElements.secoundInput.value} ${inputElements.secoundSelect.value}`
    );
    liElement.appendChild(historyValue);
    historyList.appendChild(liElement);

    deleteHistoryDuplicates();
  }, 600);
}

/* delete duplicates from history log*/
const logChildNodes = historyList.childNodes;
function deleteHistoryDuplicates() {
  const length = historyList.childNodes.length;
  // avoids console log TypeError: "logChildNodes[i] is undefined" :/
  try {
    for (let i = 0; i < length; i++) {
      if (logChildNodes[i].isEqualNode(logChildNodes[i + 1])) {
        historyList.removeChild(logChildNodes[i + 1]);
      }
    }
  } catch (error) {}
}
/* delete history log*/
const resetHistoryButton = document.getElementById("reset-history-button");
resetHistoryButton.addEventListener("click", deleteHistory);

function deleteHistory() {
  while (historyList.children.length >= 1) {
    historyList.removeChild(historyList.childNodes[0]);
  }
}

// onclick selects <input> value , for all inputs
const inputTypeNumber = document.querySelectorAll(
  '.converter input[type="number"]'
);

inputTypeNumber.forEach(element => {
  element.addEventListener("click", function() {
    this.select();
  });
});
