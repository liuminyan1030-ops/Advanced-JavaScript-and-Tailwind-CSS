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
const kilogramsToPounds = (kilograms: number): number => kilograms * 2.20462;
const poundsToKilograms = (pounds: number): number => pounds / 2.20462;
const kilometresToMiles = (kilometres: number): number => kilometres / 1.609344;
const milesToKilometres = (miles: number): number => miles * 1.609344;
const celsiusToFahrenheit = (celsius: number): number => celsius * 1.8 + 32;
const fahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - 32) / 1.8;

// Pick one formula from the two units, then convert one number.
const convertOneNumber = (fromUnit: string, toUnit: string, value: number): number => {
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
  PART 2 — higher-order function 
  Two parameters: the unit to convert from, and the unit to convert to.
  It returns an arrow function.
  That arrow function accepts one number or an array of numbers.
*/
const createConverter = (fromUnit: string, toUnit: string) => {
  return (input: number | number[]): number | number[] => {
    if (Array.isArray(input)) {
      return input.map((value: number): number => convertOneNumber(fromUnit, toUnit, value));
    }
    return convertOneNumber(fromUnit, toUnit, input);
  };
};

const parseInput = (text: string): number | number[] => {
  if (text.includes(",") === false) {
    return Number(text);
  }
  return text.split(",").map((part: string): number => Number(part));
};

const formatResult = (result: number | number[]): string => {
  if (Array.isArray(result)) {
    return result.map((value: number): string => value.toFixed(2)).join(", ");
  }
  return result.toFixed(2);
};

// PART 3 — Weight: kilograms to pounds
const weightKgInput = document.getElementById("weight-kg-input") as HTMLInputElement;
const weightKgButton = document.getElementById("weight-kg-button") as HTMLButtonElement;
const weightKgOutput = document.getElementById("weight-kg-output") as HTMLInputElement;
const convertKgToLb = createConverter("kg", "lb");

const handleKgToLb = (): void => {
  const kilograms = parseInput(weightKgInput.value);
  const pounds = convertKgToLb(kilograms);
  weightKgOutput.value = formatResult(pounds);
};

weightKgButton.addEventListener("click", handleKgToLb);

// PART 4 — Weight: pounds to kilograms
const weightLbInput = document.getElementById("weight-lb-input") as HTMLInputElement;
const weightLbButton = document.getElementById("weight-lb-button") as HTMLButtonElement;
const weightLbOutput = document.getElementById("weight-lb-output") as HTMLInputElement;
const convertLbToKg = createConverter("lb", "kg");

const handleLbToKg = (): void => {
  const pounds = parseInput(weightLbInput.value);
  const kilograms = convertLbToKg(pounds);
  weightLbOutput.value = formatResult(kilograms);
};

weightLbButton.addEventListener("click", handleLbToKg);

// PART 5 — Distance: kilometres to miles
const distanceKmInput = document.getElementById("distance-km-input") as HTMLInputElement;
const distanceKmButton = document.getElementById("distance-km-button") as HTMLButtonElement;
const distanceKmOutput = document.getElementById("distance-km-output") as HTMLInputElement;
const convertKmToMi = createConverter("km", "mi");

const handleKmToMi = (): void => {
  const kilometres = parseInput(distanceKmInput.value);
  const miles = convertKmToMi(kilometres);
  distanceKmOutput.value = formatResult(miles);
};

distanceKmButton.addEventListener("click", handleKmToMi);

// PART 6 — Distance: miles to kilometres
const distanceMiInput = document.getElementById("distance-mi-input") as HTMLInputElement;
const distanceMiButton = document.getElementById("distance-mi-button") as HTMLButtonElement;
const distanceMiOutput = document.getElementById("distance-mi-output") as HTMLInputElement;
const convertMiToKm = createConverter("mi", "km");

const handleMiToKm = (): void => {
  const miles = parseInput(distanceMiInput.value);
  const kilometres = convertMiToKm(miles);
  distanceMiOutput.value = formatResult(kilometres);
};

distanceMiButton.addEventListener("click", handleMiToKm);

// PART 7 — Temperature: Celsius to Fahrenheit
const temperatureCInput = document.getElementById("temperature-c-input") as HTMLInputElement;
const temperatureCButton = document.getElementById("temperature-c-button") as HTMLButtonElement;
const temperatureCOutput = document.getElementById("temperature-c-output") as HTMLInputElement;
const convertCToF = createConverter("c", "f");

const handleCToF = (): void => {
  const celsius = parseInput(temperatureCInput.value);
  const fahrenheit = convertCToF(celsius);
  temperatureCOutput.value = formatResult(fahrenheit);
};

temperatureCButton.addEventListener("click", handleCToF);

// PART 8 — Temperature: Fahrenheit to Celsius
const temperatureFInput = document.getElementById("temperature-f-input") as HTMLInputElement;
const temperatureFButton = document.getElementById("temperature-f-button") as HTMLButtonElement;
const temperatureFOutput = document.getElementById("temperature-f-output") as HTMLInputElement;
const convertFToC = createConverter("f", "c");

const handleFToC = (): void => {
  const fahrenheit = parseInput(temperatureFInput.value);
  const celsius = convertFToC(fahrenheit);
  temperatureFOutput.value = formatResult(celsius);
};

temperatureFButton.addEventListener("click", handleFToC);
