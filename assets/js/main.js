let year = document.querySelector("#year");

$(document).ready(function () {
  year.innerText = new Date().getFullYear();
  
  // Contact form validation and submission
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous validation states
      const formControls = contactForm.querySelectorAll('.form-control');
      formControls.forEach(control => {
        control.classList.remove('is-invalid');
      });
      
      // Validate form
      let isValid = true;
      const formData = new FormData(contactForm);
      
      // Validate name
      const name = formData.get('name').trim();
      if (name.length < 2) {
        document.getElementById('name').classList.add('is-invalid');
        isValid = false;
      }
      
      // Validate email
      const email = formData.get('email').trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
      }
      
      // Validate phone (optional but if provided, should be valid)
      const phone = formData.get('phone').trim();
      if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
        document.getElementById('phone').classList.add('is-invalid');
        isValid = false;
      }
      
      // Validate subject
      const subject = formData.get('subject');
      if (!subject) {
        document.getElementById('subject').classList.add('is-invalid');
        isValid = false;
      }
      
      // Validate message
      const message = formData.get('message').trim();
      if (message.length < 10) {
        document.getElementById('message').classList.add('is-invalid');
        isValid = false;
      }
      
      if (isValid) {
        // Simulate form submission
        submitContactForm(formData);
      }
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
          validateField(this);
        }
      });
    });
  }
  
  function validateField(field) {
    field.classList.remove('is-invalid');
    
    const value = field.value.trim();
    const fieldId = field.id;
    
    switch(fieldId) {
      case 'name':
        if (value.length < 2) {
          field.classList.add('is-invalid');
          return false;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          field.classList.add('is-invalid');
          return false;
        }
        break;
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
          field.classList.add('is-invalid');
          return false;
        }
        break;
      case 'subject':
        if (!value) {
          field.classList.add('is-invalid');
          return false;
        }
        break;
      case 'message':
        if (value.length < 10) {
          field.classList.add('is-invalid');
          return false;
        }
        break;
    }
    
    return true;
  }
  
  function submitContactForm(formData) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Hide messages
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';
      
      // Simulate success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        // Show success message
        successMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      } else {
        // Show error message
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  }
});
