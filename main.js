"use strict";
/*Student Name: Hoang Yen Nguyen
  Student ID:000975511
  Date: September 25th,2026


  Program: Metric / Imperial Unit Converter
  Three tabs (in the navbar): Weight, Distance, Temperature.
  Each tab has two forms: metric -> imperial, and imperial -> metric.
  Each form accepts one number, or several numbers separated by commas.


  Inputs: text typed into a form's input field (one number, or a comma-separated list of numbers).
  Processing: createConverter(fromUnit, toUnit) is a higher-order function.
  Outputs: the converted value(s), rounded to 2 decimal places, shown in the form's result box.
*/
// 1.Conversion rules
const kilogramsToPounds = (kilograms) => kilograms * 2.20462;
const poundsToKilograms = (pounds) => pounds / 2.20462;
const kilometresToMiles = (kilometres) => kilometres * 0.621371;
const milesToKilometres = (miles) => miles / 0.621371;
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
// 2.Formula lookup table
const conversionFormulas = {
    "kg-lb": kilogramsToPounds,
    "lb-kg": poundsToKilograms,
    "km-mi": kilometresToMiles,
    "mi-km": milesToKilometres,
    "c-f": celsiusToFahrenheit,
    "f-c": fahrenheitToCelsius,
};
// 3.createConverter
function createConverter(fromUnit, toUnit) {
    const key = `${fromUnit}-${toUnit}`;
    const formula = conversionFormulas[key];
    if (!formula) {
        throw new Error(`No conversion rule for "${fromUnit}" to "${toUnit}".`);
    }
    const round = (value) => Math.round(value * 100) / 100;
    return (input) => {
        if (Array.isArray(input)) {
            return input.map((value) => round(formula(value)));
        }
        return round(formula(input));
    };
}
// The six converter functions the site uses, one per direction
const convertKgToLb = createConverter("kg", "lb");
const convertLbToKg = createConverter("lb", "kg");
const convertKmToMi = createConverter("km", "mi");
const convertMiToKm = createConverter("mi", "km");
const convertCToF = createConverter("c", "f");
const convertFToC = createConverter("f", "c");
// 4.Input/output helpers
function parseInputValue(rawText) {
    const parts = rawText
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);
    if (parts.length === 0) {
        throw new Error("Enter at least one number.");
    }
    const numbers = parts.map((part) => {
        const value = Number(part);
        if (Number.isNaN(value)) {
            throw new Error(`"${part}" is not a valid number.`);
        }
        return value;
    });
    return numbers.length === 1 ? numbers[0] : numbers;
}
function formatResult(result) {
    if (Array.isArray(result)) {
        return result.map((value) => value.toFixed(2)).join(", ");
    }
    return result.toFixed(2);
}
// 5. Generic form wiring
function wireConversionForm(inputId, buttonId, resultId, converter) {
    const inputEl = document.getElementById(inputId);
    const buttonEl = document.getElementById(buttonId);
    const resultEl = document.getElementById(resultId);
    const handleConvert = () => {
        try {
            const parsedInput = parseInputValue(inputEl.value);
            const result = converter(parsedInput);
            resultEl.textContent = formatResult(result);
            resultEl.classList.remove("text-red-600");
        }
        catch (error) {
            resultEl.textContent = error.message;
            resultEl.classList.add("text-red-600");
        }
    };
    buttonEl.addEventListener("click", handleConvert);
}
// 6a.Weight tab: kg -> lb and lb -> kg
wireConversionForm("weight-kg-input", "weight-kg-button", "weight-kg-result", convertKgToLb);
wireConversionForm("weight-lb-input", "weight-lb-button", "weight-lb-result", convertLbToKg);
// 6b.Distance tab: km -> mi and mi -> km
wireConversionForm("distance-km-input", "distance-km-button", "distance-km-result", convertKmToMi);
wireConversionForm("distance-mi-input", "distance-mi-button", "distance-mi-result", convertMiToKm);
// 6c. Temperature tab: C -> F and F -> C
wireConversionForm("temperature-c-input", "temperature-c-button", "temperature-c-result", convertCToF);
wireConversionForm("temperature-f-input", "temperature-f-button", "temperature-f-result", convertFToC);
// 7. Tab switching
function wireTabs() {
    const tabButtons = document.querySelectorAll("[data-tab-target]");
    const tabPanels = document.querySelectorAll("[data-tab-panel]");
    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-tab-target");
            tabPanels.forEach((panel) => {
                panel.classList.toggle("hidden", panel.getAttribute("data-tab-panel") !== targetId);
            });
            tabButtons.forEach((btn) => {
                btn.classList.remove("border-blue-600", "text-slate-900");
                btn.classList.add("border-transparent", "text-slate-500");
            });
            button.classList.add("border-blue-600", "text-slate-900");
            button.classList.remove("border-transparent", "text-slate-500");
        });
    });
}
wireTabs();
//# sourceMappingURL=main.js.map