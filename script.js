document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Form submission event listener
  const form = document.querySelector(".tax-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate inputs
    if (!validateInputs()) {
      return; // Exit if inputs are not valid
    }

    // Calculate tax
    const taxResults = calculateTax();

    // Display results in modal
    displayResults(taxResults);
  });

  // Function to validate inputs
  function validateInputs() {
    // Validate gross annual income
    const grossAnnualIncomeInput = document.getElementById(
      "gross-annual-income"
    );
    if (!isValidNumber(grossAnnualIncomeInput.value)) {
      displayError(grossAnnualIncomeInput);
      return false;
    } else {
      hideError(grossAnnualIncomeInput);
    }

    // Validate extra income
    const extraIncomeInput = document.getElementById("extra-income");
    if (!isValidNumber(extraIncomeInput.value)) {
      displayError(extraIncomeInput);
      return false;
    } else {
      hideError(extraIncomeInput);
    }

    // Validate age group selection
    const ageGroupInput = document.getElementById("age-group");
    if (!ageGroupInput.value) {
      displayError(ageGroupInput);
      return false;
    } else {
      hideError(ageGroupInput);
    }

    // Validate deductions
    const deductionsInput = document.getElementById("deductions");
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
    const grossAnnualIncome = parseFloat(
      document.getElementById("gross-annual-income").value
    );
    const extraIncome = parseFloat(
      document.getElementById("extra-income").value
    );
    const deductions = parseFloat(document.getElementById("deductions").value);
    const ageGroup = document.getElementById("age-group").value;

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
    
    document.getElementById("gross-annual-income-result").textContent =
      taxResults.grossAnnualIncome.toFixed(2);
    document.getElementById("extra-income-result").textContent =
      taxResults.extraIncome.toFixed(2);
    document.getElementById("deductions-result").textContent =
      taxResults.deductions.toFixed(2);
    document.getElementById("taxable-income-result").textContent =
      taxResults.taxableIncome.toFixed(2);
    document.getElementById("tax-rate-result").textContent =
      (taxResults.taxRate * 100).toFixed(2) + "%";
    document.getElementById("tax-amount-result").textContent =
      taxResults.taxAmount.toFixed(2);
      console.log(document.getElementById("final-income-number"));
    document.getElementById("final-income-number").textContent =
    taxResults.taxableIncome.toFixed(2) - taxResults.taxAmount.toFixed(2);;

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
    inputField.classList.remove("is-invalid"); // Mark input field as valid

    // Get the tooltip instance and hide it
    const tooltip = bootstrap.Tooltip.getInstance(errorIcon);
    if (tooltip) {
      tooltip.hide();
    }
  }
});
