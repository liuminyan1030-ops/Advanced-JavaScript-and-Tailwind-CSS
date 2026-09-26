"use strict";
/*
Author: Iris Dunbar



*/
// Element constants for ease of use across program without re-writing constantly
const weightButton = document.getElementById("weightTab");
const distanceButton = document.getElementById("distanceTab");
const temperatureButton = document.getElementById("temperatureTab");
const iToMTitle = document.getElementById("imperialToMetricTitle");
const iToMLabelIn = document.getElementById("imperialToMetricLabelIn");
const imperialInput = document.getElementById("imperialToMetricInput");
const iToMButton = document.getElementById("imperialToMetricButton");
const iToMLabelOut = document.getElementById("imperialToMetricLabelOut");
const metricOutput = document.getElementById("imperialToMetricOutput");
const mToITitle = document.getElementById("metricToImperialTitle");
const mToILabelIn = document.getElementById("metricToImperialLabelIn");
const metricInput = document.getElementById("metricToImperialInput");
const mToIButton = document.getElementById("metricToImperialButton");
const mToILabelOut = document.getElementById("metricToImperialLabelOut");
const imperialOutput = document.getElementById("metricToImperialOutput");
//Equation constants for use in calculations
const kilogramsToPounds = (kilograms) => kilograms * 2.20462;
const poundsToKilograms = (pounds) => pounds / 2.20462;
const kilometersToMiles = (kilometres) => kilometres / 1.609344;
const milesToKilometers = (miles) => miles * 1.609344;
const celsiusToFahrenheit = (celsius) => celsius * 1.8 + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) / 1.8;
// Sets initial unit values to be changed later and used in calculations
let currentImpToMetricUnits = { from: "lb", to: "kg" };
let currentMetricToImpUnits = { from: "kg", to: "lb" };
const converter = (fromUnit, toUnit, value) => {
    if (fromUnit === "kg" && toUnit === "lb")
        return kilogramsToPounds(value);
    if (fromUnit === "lb" && toUnit === "kg")
        return poundsToKilograms(value);
    if (fromUnit === "km" && toUnit === "mi")
        return kilometersToMiles(value);
    if (fromUnit === "mi" && toUnit === "km")
        return milesToKilometers(value);
    if (fromUnit === "c" && toUnit === "f")
        return celsiusToFahrenheit(value);
    if (fromUnit === "f" && toUnit === "c")
        return fahrenheitToCelsius(value);
    return value;
};
const createConverter = (fromUnit, toUnit) => {
    return (input) => {
        if (Array.isArray(input)) {
            return input.map((value) => converter(fromUnit, toUnit, value));
        }
        return converter(fromUnit, toUnit, input);
    };
};
const parseInput = (input) => {
    if (!input.includes(","))
        return Number(input);
    return input.split(",").map((arrayValue) => Number(arrayValue.trim()));
};
const formatResult = (result) => {
    if (Array.isArray(result)) {
        return result.map((value) => value.toFixed(1)).join(", ");
    }
    return result.toFixed(2);
};
const weightTab = () => {
    imperialInput.value = "";
    metricInput.value = "";
    imperialOutput.value = "";
    metricOutput.value = "";
    iToMTitle.textContent = "Pounds to Kilograms converter";
    iToMLabelIn.textContent = "Pounds";
    iToMLabelOut.textContent = "Kilograms";
    mToITitle.textContent = "Kilograms to Pounds converter";
    mToILabelIn.textContent = "Kilograms";
    mToILabelOut.textContent = "Pounds";
    currentImpToMetricUnits = { from: "lb", to: "kg" };
    currentMetricToImpUnits = { from: "kg", to: "lb" };
};
const distanceTab = () => {
    imperialInput.value = "";
    metricInput.value = "";
    imperialOutput.value = "";
    metricOutput.value = "";
    iToMTitle.textContent = "Miles to Kilometers converter";
    iToMLabelIn.textContent = "Miles";
    iToMLabelOut.textContent = "Kilometers";
    mToITitle.textContent = "Kilometers to Miles converter";
    mToILabelIn.textContent = "Kilometers";
    mToILabelOut.textContent = "Miles";
    currentImpToMetricUnits = { from: "mi", to: "km" };
    currentMetricToImpUnits = { from: "km", to: "mi" };
};
const temperatureTab = () => {
    imperialInput.value = "";
    metricInput.value = "";
    imperialOutput.value = "";
    metricOutput.value = "";
    iToMTitle.textContent = "Fahrenheit to Celsius converter";
    iToMLabelIn.textContent = "Fahrenheit";
    iToMLabelOut.textContent = "Celsius";
    mToITitle.textContent = "Celsius to Fahrenheit converter";
    mToILabelIn.textContent = "Celsius";
    mToILabelOut.textContent = "Fahrenheit";
    currentImpToMetricUnits = { from: "f", to: "c" };
    currentMetricToImpUnits = { from: "c", to: "f" };
};
weightButton.addEventListener('click', weightTab);
distanceButton.addEventListener('click', distanceTab);
temperatureButton.addEventListener('click', temperatureTab);
const ImpToMetricConverter = () => {
    const imperial = parseInput(imperialInput.value);
    const metric = createConverter(currentImpToMetricUnits.from, currentImpToMetricUnits.to)(imperial);
    metricOutput.value = formatResult(metric);
};
const MetricToImpConverter = () => {
    const metric = parseInput(metricInput.value);
    const imperial = createConverter(currentMetricToImpUnits.from, currentMetricToImpUnits.to)(metric);
    imperialOutput.value = formatResult(imperial);
};
iToMButton.addEventListener("click", ImpToMetricConverter);
mToIButton.addEventListener("click", MetricToImpConverter);
// Initializes page with weight tab
weightTab();
//# sourceMappingURL=main.js.map