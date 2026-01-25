// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // Simple validation
      if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        showError('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission (replace with actual endpoint)
      simulateFormSubmission(data);
    });
  }
  
  function simulateFormSubmission(data) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Reset form
      contactForm.reset();
      
      // Show success message
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
      
      // Log form data (in production, this would be sent to a server)
      console.log('Form submitted with data:', data);
      
    }, 1500);
  }
  
  function showError(message) {
    errorMessage.innerHTML = `<strong>Error!</strong> ${message}`;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }
  
  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0) {
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
      }
      e.target.value = value;
    });
  }
});