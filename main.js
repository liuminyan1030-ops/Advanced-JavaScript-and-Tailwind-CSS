"use strict";
/*
  Student Name: Minyan Liu
  Student ID: 000973198
  Date: September 23, 2026

  Program: Metric / Imperial Unit Converter
  Three cards: weight, distance, and temperature.
  The top row of each card converts one way.
  The bottom row converts the opposite way.
  One higher-order function handles a single number or a list.

  Inputs: one number or a comma-separated list.
  Processing: createConverter returns a function that converts one value or an array.
  Outputs: the converted number or list, with two decimal places.
*/

// PART 1 — conversion formulas
const kilogramsToPounds = (kilograms) => kilograms * 2.20462;
const poundsToKilograms = (pounds) => pounds / 2.20462;
const kilometresToMiles = (kilometres) => kilometres / 1.609344;
const milesToKilometres = (miles) => miles * 1.609344;
const celsiusToFahrenheit = (celsius) => celsius * 1.8 + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) / 1.8;
// Pick one formula from the two units, then convert one number.
const convertOneNumber = (fromUnit, toUnit, value) => {
    if (fromUnit === "kg" && toUnit === "lb") {
        return kilogramsToPounds(value);
    }
    if (fromUnit === "lb" && toUnit === "kg") {
        return poundsToKilograms(value);
    }
    if (fromUnit === "km" && toUnit === "mi") {
        return kilometresToMiles(value);
    }
    if (fromUnit === "mi" && toUnit === "km") {
        return milesToKilometres(value);
    }
    if (fromUnit === "c" && toUnit === "f") {
        return celsiusToFahrenheit(value);
    }
    if (fromUnit === "f" && toUnit === "c") {
        return fahrenheitToCelsius(value);
    }
    return value;
};
/*
  PART 2 — higher-order function from the assignment.
  Two parameters: the unit to convert from, and the unit to convert to.
  It returns an arrow function.
  That arrow function accepts one number or an array of numbers.
*/
const createConverter = (fromUnit, toUnit) => {
    return (input) => {
        if (Array.isArray(input)) {
            return input.map((value) => convertOneNumber(fromUnit, toUnit, value));
        }
        return convertOneNumber(fromUnit, toUnit, input);
    };
};
const parseInput = (text) => {
    if (text.includes(",") === false) {
        return Number(text);
    }
    return text.split(",").map((part) => Number(part));
};
const formatResult = (result) => {
    if (Array.isArray(result)) {
        return result.map((value) => value.toFixed(2)).join(", ");
    }
    return result.toFixed(2);
};
// PART 3 — Weight: kilograms to pounds
const weightKgInput = document.getElementById("weight-kg-input");
const weightKgButton = document.getElementById("weight-kg-button");
const weightKgOutput = document.getElementById("weight-kg-output");
const convertKgToLb = createConverter("kg", "lb");
const handleKgToLb = () => {
    const kilograms = parseInput(weightKgInput.value);
    const pounds = convertKgToLb(kilograms);
    weightKgOutput.value = formatResult(pounds);
};
weightKgButton.addEventListener("click", handleKgToLb);
// PART 4 — Weight: pounds to kilograms
const weightLbInput = document.getElementById("weight-lb-input");
const weightLbButton = document.getElementById("weight-lb-button");
const weightLbOutput = document.getElementById("weight-lb-output");
const convertLbToKg = createConverter("lb", "kg");
const handleLbToKg = () => {
    const pounds = parseInput(weightLbInput.value);
    const kilograms = convertLbToKg(pounds);
    weightLbOutput.value = formatResult(kilograms);
};
weightLbButton.addEventListener("click", handleLbToKg);
// PART 5 — Distance: kilometres to miles
const distanceKmInput = document.getElementById("distance-km-input");
const distanceKmButton = document.getElementById("distance-km-button");
const distanceKmOutput = document.getElementById("distance-km-output");
const convertKmToMi = createConverter("km", "mi");
const handleKmToMi = () => {
    const kilometres = parseInput(distanceKmInput.value);
    const miles = convertKmToMi(kilometres);
    distanceKmOutput.value = formatResult(miles);
};
distanceKmButton.addEventListener("click", handleKmToMi);
// PART 6 — Distance: miles to kilometres
const distanceMiInput = document.getElementById("distance-mi-input");
const distanceMiButton = document.getElementById("distance-mi-button");
const distanceMiOutput = document.getElementById("distance-mi-output");
const convertMiToKm = createConverter("mi", "km");
const handleMiToKm = () => {
    const miles = parseInput(distanceMiInput.value);
    const kilometres = convertMiToKm(miles);
    distanceMiOutput.value = formatResult(kilometres);
};
distanceMiButton.addEventListener("click", handleMiToKm);
// PART 7 — Temperature: Celsius to Fahrenheit
const temperatureCInput = document.getElementById("temperature-c-input");
const temperatureCButton = document.getElementById("temperature-c-button");
const temperatureCOutput = document.getElementById("temperature-c-output");
const convertCToF = createConverter("c", "f");
const handleCToF = () => {
    const celsius = parseInput(temperatureCInput.value);
    const fahrenheit = convertCToF(celsius);
    temperatureCOutput.value = formatResult(fahrenheit);
};
temperatureCButton.addEventListener("click", handleCToF);
// PART 8 — Temperature: Fahrenheit to Celsius
const temperatureFInput = document.getElementById("temperature-f-input");
const temperatureFButton = document.getElementById("temperature-f-button");
const temperatureFOutput = document.getElementById("temperature-f-output");
const convertFToC = createConverter("f", "c");
const handleFToC = () => {
    const fahrenheit = parseInput(temperatureFInput.value);
    const celsius = convertFToC(fahrenheit);
    temperatureFOutput.value = formatResult(celsius);
};
temperatureFButton.addEventListener("click", handleFToC);
const tabWeight = document.getElementById("tab-weight");
const tabDistance = document.getElementById("tab-distance");
const tabTemperature = document.getElementById("tab-temperature");
const panelWeight = document.getElementById("panel-weight");
const panelDistance = document.getElementById("panel-distance");
const panelTemperature = document.getElementById("panel-temperature");
const inactiveTab = "rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700";
const activeWeightTab = "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white";
const activeDistanceTab = "rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white";
const activeTemperatureTab = "rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white";
const showPanel = (name) => {
    panelWeight.classList.add("hidden");
    panelDistance.classList.add("hidden");
    panelTemperature.classList.add("hidden");
    tabWeight.className = inactiveTab;
    tabDistance.className = inactiveTab;
    tabTemperature.className = inactiveTab;
    if (name === "weight") {
        panelWeight.classList.remove("hidden");
        tabWeight.className = activeWeightTab;
    }
    if (name === "distance") {
        panelDistance.classList.remove("hidden");
        tabDistance.className = activeDistanceTab;
    }
    if (name === "temperature") {
        panelTemperature.classList.remove("hidden");
        tabTemperature.className = activeTemperatureTab;
    }
};
tabWeight.addEventListener("click", () => {
    showPanel("weight");
});
tabDistance.addEventListener("click", () => {
    showPanel("distance");
});
tabTemperature.addEventListener("click", () => {
    showPanel("temperature");
});