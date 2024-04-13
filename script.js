const numberFields = document.querySelectorAll('.number-field');

  numberFields.forEach(field => {
    field.addEventListener('keyup', () => {
      const errorIcon = field.nextElementSibling; // Access the next sibling element (error icon)
      if (isNaN(field.value)) {
        errorIcon.classList.add('visible'); // Show error icon
      } else {
        errorIcon.classList.remove('visible'); // Hide error icon
      }
    });
  });