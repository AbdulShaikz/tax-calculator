$(document).ready(function() {
  // Initialize Bootstrap tooltips
  $('[data-bs-toggle="tooltip"]').tooltip();

  // Form and form elements
  const form = $(".tax-form");
  const grossAnnualIncomeInput = $("#gross-annual-income");
  const extraIncomeInput = $("#extra-income");
  const ageGroupInput = $("#age-group");
  const deductionsInput = $("#deductions");

  const grossAnnualIncomeResult = $("#gross-annual-income-result");
  const extraIncomeResult = $("#extra-income-result");
  const deductionsResult = $("#deductions-result");
  const taxableIncomeResult = $("#taxable-income-result");
  const taxRateResult = $("#tax-rate-result");
  const taxAmountResult = $("#tax-amount-result");
  const finalIncomeResult = $("#final-income-result");

  // Form submission event listener
  form.on("submit", function(event) {
      event.preventDefault(); // Prevent default form submission

      // Validate inputs
      if (!validateInputs()) {
          return; 
      }

      // Calculate tax
      const taxResults = calculateTax();

      // Display results in modal
      displayResults(taxResults);
  });

  // Function to validate inputs
  function validateInputs() {
      // Validate gross annual income
      if (!isValidNumber(grossAnnualIncomeInput.val())) {
          displayError(grossAnnualIncomeInput);
          return false;
      } else {
          hideError(grossAnnualIncomeInput);
      }

      // Validate extra income
      if (!isValidNumber(extraIncomeInput.val())) {
          displayError(extraIncomeInput);
          return false;
      } else {
          hideError(extraIncomeInput);
      }

      // Validate age group selection
      if (!ageGroupInput.val()) {
          displayError(ageGroupInput);
          return false;
      } else {
          hideError(ageGroupInput);
      }

      // Validate deductions
      if (!isValidNumber(deductionsInput.val())) {
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
      const grossAnnualIncome = parseFloat(grossAnnualIncomeInput.val());
      const extraIncome = parseFloat(extraIncomeInput.val());
      const deductions = parseFloat(deductionsInput.val());
      const ageGroup = ageGroupInput.val();

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
      grossAnnualIncomeResult.text(taxResults.grossAnnualIncome.toFixed(2));
      extraIncomeResult.text(taxResults.extraIncome.toFixed(2));
      deductionsResult.text(taxResults.deductions.toFixed(2));
      taxableIncomeResult.text(taxResults.taxableIncome.toFixed(2));
      taxRateResult.text((taxResults.taxRate * 100).toFixed(2) + "%");
      taxAmountResult.text(taxResults.taxAmount.toFixed(2));
      finalIncomeResult.text((taxResults.taxableIncome.toFixed(2) - taxResults.taxAmount.toFixed(2)));

      const taxResultModal = new bootstrap.Modal($("#taxResultModal"));
      taxResultModal.show();
  }

  // Function to display error for an input field
  function displayError(inputField) {
      const errorIcon = inputField.parent().find(".error-icon");
      errorIcon.addClass("visible"); // Show error icon
      // inputField.addClass("is-invalid"); // Mark input field as invalid (bootstrap based validation)
  }

  // Function to hide error for an input field
  function hideError(inputField) {
      const errorIcon = inputField.parent().find(".error-icon");
      errorIcon.removeClass("visible"); // Hide error icon
      //inputField.removeClass("is-invalid"); // Mark input field as valid

      // Get the tooltip instance and hide it
      const tooltip = bootstrap.Tooltip.getInstance(errorIcon);
      if (tooltip) {
          tooltip.hide();
      }
  }
});