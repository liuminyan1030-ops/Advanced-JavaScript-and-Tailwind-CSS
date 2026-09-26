/*
Author: Iris Dunbar



*/

// Element constants for ease of use across program without re-writing constantly
const weightButton = document.getElementById("weightTab") as HTMLButtonElement;
const distanceButton = document.getElementById("distanceTab") as HTMLButtonElement;
const temperatureButton = document.getElementById("temperatureTab") as HTMLButtonElement;

const iToMTitle = document.getElementById("imperialToMetricTitle") as HTMLParagraphElement;
const iToMLabelIn = document.getElementById("imperialToMetricLabelIn") as HTMLParagraphElement;
const imperialInput = document.getElementById("imperialToMetricInput") as HTMLInputElement;
const iToMButton = document.getElementById("imperialToMetricButton") as HTMLButtonElement;
const iToMLabelOut = document.getElementById("imperialToMetricLabelOut") as HTMLParagraphElement;
const metricOutput = document.getElementById("imperialToMetricOutput") as HTMLOutputElement;

const mToITitle = document.getElementById("metricToImperialTitle") as HTMLParagraphElement;
const mToILabelIn = document.getElementById("metricToImperialLabelIn") as HTMLParagraphElement;
const metricInput = document.getElementById("metricToImperialInput") as HTMLInputElement;
const mToIButton = document.getElementById("metricToImperialButton") as HTMLButtonElement;
const mToILabelOut = document.getElementById("metricToImperialLabelOut") as HTMLParagraphElement;
const imperialOutput = document.getElementById("metricToImperialOutput") as HTMLOutputElement;

//Equation constants for use in calculations
const kilogramsToPounds = (kilograms: number): number => kilograms * 2.20462;
const poundsToKilograms = (pounds: number): number => pounds / 2.20462;
const kilometersToMiles = (kilometres: number): number => kilometres / 1.609344;
const milesToKilometers = (miles: number): number => miles * 1.609344;
const celsiusToFahrenheit = (celsius: number): number => celsius * 1.8 + 32;
const fahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - 32) / 1.8;

// Sets initial unit values to be changed later and used in calculations
let currentImpToMetricUnits = { from: "lb", to: "kg" };
let currentMetricToImpUnits = { from: "kg", to: "lb" };

const converter = (fromUnit: string, toUnit: string, value: number): number => {
  if (fromUnit === "kg" && toUnit === "lb") return kilogramsToPounds(value);
  if (fromUnit === "lb" && toUnit === "kg") return poundsToKilograms(value);
  if (fromUnit === "km" && toUnit === "mi") return kilometersToMiles(value);
  if (fromUnit === "mi" && toUnit === "km") return milesToKilometers(value);
  if (fromUnit === "c" && toUnit === "f") return celsiusToFahrenheit(value);
  if (fromUnit === "f" && toUnit === "c") return fahrenheitToCelsius(value);
  return value;
};

const createConverter = (fromUnit: string, toUnit: string) => {
  return (input: number | number[]): number | number[] => {
    if (Array.isArray(input)) {
      return input.map((value: number): number => converter(fromUnit, toUnit, value));
    }
    return converter(fromUnit, toUnit, input);
  };
};

const parseInput = (input: string): number | number[] => {
  if (!input.includes(",")) return Number(input);
  return input.split(",").map((arrayValue: string): number => Number(arrayValue.trim()));
};

const formatResult = (result: number | number[]): string => {
  if (Array.isArray(result)) {
    return result.map((value: number): string => value.toFixed(1)).join(", ");
  }
  return result.toFixed(2);
};

const weightTab = (): void => {
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

const distanceTab = (): void => {
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

const temperatureTab = (): void => {
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

const ImpToMetricConverter = (): void => {
  const imperial = parseInput(imperialInput.value);
  const metric = createConverter(currentImpToMetricUnits.from, currentImpToMetricUnits.to)(imperial);
  metricOutput.value = formatResult(metric);
};

const MetricToImpConverter = (): void => {
  const metric = parseInput(metricInput.value);
  const imperial = createConverter(currentMetricToImpUnits.from, currentMetricToImpUnits.to)(metric);
  imperialOutput.value = formatResult(imperial); 
};

iToMButton.addEventListener("click", ImpToMetricConverter);
mToIButton.addEventListener("click", MetricToImpConverter);

// Initializes page with weight tab
weightTab();