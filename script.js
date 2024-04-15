document.addEventListener("DOMContentLoaded", function () {

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Form and form elements
  const form = document.querySelector(".tax-form");
  const grossAnnualIncomeInput = document.getElementById("gross-annual-income");
  const extraIncomeInput = document.getElementById("extra-income");
  const ageGroupInput = document.getElementById("age-group");
  const deductionsInput = document.getElementById("deductions");

  const grossAnnualIncomeResult = document.getElementById("gross-annual-income-result");
  const extraIncomeResult = document.getElementById("extra-income-result");
  const deductionsResult = document.getElementById("deductions-result");
  const taxableIncomeResult = document.getElementById("taxable-income-result");
  const taxRateResult = document.getElementById("tax-rate-result");
  const taxAmountResult = document.getElementById("tax-amount-result");
  const finalIncomeResult = document.getElementById("final-income-result");

  // Form submission event listener
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate inputs
    if (!validateInputs()) {
      return;   // Exit if inputs are not valid
    }

    const taxResults = calculateTax();

    displayResults(taxResults);
  });

  // Function to validate inputs
  function validateInputs() {
    // Validate gross annual income
    if (!isValidNumber(grossAnnualIncomeInput.value)) {
      displayError(grossAnnualIncomeInput);
      return false;
    } else {
      hideError(grossAnnualIncomeInput);
    }

    // Validate extra income
    if (!isValidNumber(extraIncomeInput.value)) {
      displayError(extraIncomeInput);
      return false;
    } else {
      hideError(extraIncomeInput);
    }

    // Validate age group selection
    if (!ageGroupInput.value) {
      displayError(ageGroupInput);
      return false;
    } else {
      hideError(ageGroupInput);
    }

    // Validate deductions
    if (!isValidNumber(deductionsInput.value)) {
      displayError(deductionsInput);
      return false;
    } else {
      hideError(deductionsInput);
    }

    return true; // All inputs are valid
  }

  // Function to check if a value is a valid number
  function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  // Function to calculate tax
  function calculateTax() {
    const grossAnnualIncome = parseFloat(grossAnnualIncomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const deductions = parseFloat(deductionsInput.value);
    const ageGroup = ageGroupInput.value;

    let taxableIncome = grossAnnualIncome + extraIncome - deductions;
    let taxRate = 0;

    if (taxableIncome <= 800000) {
      return {
        grossAnnualIncome,
        extraIncome,
        deductions,
        taxableIncome,
        taxRate,
        taxAmount: 0,
      };
    } else {
      if (ageGroup === "<40") {
        taxRate = 0.3;
      } else if (ageGroup === ">=40&<60") {
        taxRate = 0.4;
      } else if (ageGroup === ">=60") {
        taxRate = 0.1;
      }

      const taxableAmountAbove8Lakhs = taxableIncome - 800000;
      const taxAmount = taxableAmountAbove8Lakhs * taxRate;
      return {
        grossAnnualIncome,
        extraIncome,
        deductions,
        taxableIncome,
        taxRate,
        taxAmount,
      };
    }
  }

  // Function to display results in the modal
  function displayResults(taxResults) {
    grossAnnualIncomeResult.textContent =
      taxResults.grossAnnualIncome.toFixed(2);
    extraIncomeResult.textContent = taxResults.extraIncome.toFixed(2);
    deductionsResult.textContent = taxResults.deductions.toFixed(2);
    taxableIncomeResult.textContent = taxResults.taxableIncome.toFixed(2);
    taxRateResult.textContent = (taxResults.taxRate * 100).toFixed(2) + "%";
    taxAmountResult.textContent = taxResults.taxAmount.toFixed(2);
    finalIncomeResult.textContent =
      taxResults.taxableIncome.toFixed(2) - taxResults.taxAmount.toFixed(2);

    const taxResultModal = new bootstrap.Modal(
      document.getElementById("taxResultModal")
    );
    taxResultModal.show();
  }

  // Function to display error for an input field
  function displayError(inputField) {
    const errorIcon = inputField.parentElement.querySelector(".error-icon");
    errorIcon.classList.add("visible"); // Show error icon
    //inputField.classList.add("is-invalid"); // Mark input field as invalid (bootstrap based validation)
  }

  // Function to hide error for an input field
  function hideError(inputField) {
    const errorIcon = inputField.parentElement.querySelector(".error-icon");
    errorIcon.classList.remove("visible"); // Hide error icon
    //inputField.classList.remove("is-invalid"); // Mark input field as valid

    // Get the tooltip instance and hide it
    const tooltip = bootstrap.Tooltip.getInstance(errorIcon);
    if (tooltip) {
      tooltip.hide();
    }
  }
});