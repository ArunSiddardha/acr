// let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// let interval = null;

// document.getElementById("test").onmouseover = event => {  
//   let iteration = 0;
  
//   clearInterval(interval);
  
//   interval = setInterval(() => {
//     event.target.innerText = event.target.innerText
//       .split("")
//       .map((letter, index) => {
//         if(index < iteration) {
//           return event.target.dataset.value[index];
//         }
      
//         return letters[Math.floor(Math.random() * 26)]
//       })
//       .join("");
    
//     if(iteration >= event.target.dataset.value.length){ 
//       clearInterval(interval);
//     }
    
//     iteration += 1 / 3;
//   }, 30);
// }
var viewportHeader = document.querySelector(".viewport-header");

document.body.addEventListener("scroll", function(event) {
  var opacity = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
  var scale = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
  document.documentElement.style.setProperty('--headerOpacity', opacity);
  document.documentElement.style.setProperty('--headerScale', scale);
});

// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const messageTextarea = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const formAlert = document.getElementById('formAlert');
  const submitBtn = document.querySelector('.btn-submit');
  const btnText = document.querySelector('.btn-text');
  const btnSpinner = document.querySelector('.btn-spinner');

  if (contactForm) {
    // Character counter for message field
    if (messageTextarea && charCount) {
      messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 500) {
          this.value = this.value.substring(0, 500);
          charCount.textContent = 500;
        }
        
        // Change color based on character count
        if (length > 450) {
          charCount.style.color = '#dc3545';
        } else if (length > 400) {
          charCount.style.color = '#ffc107';
        } else {
          charCount.style.color = '#666';
        }
      });
    }

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous validation states
      clearValidation();
      
      // Validate form
      if (!validateForm()) {
        return;
      }
      
      // Show loading state
      setLoadingState(true);
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(function() {
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted with data:', data);
        
        // Show success message
        showAlert('success', 'Thank you for your message! We will get back to you within 24-48 hours.');
        
        // Reset form
        contactForm.reset();
        charCount.textContent = '0';
        charCount.style.color = '#666';
        
        // Reset loading state
        setLoadingState(false);
        
      }, 2000); // Simulate network delay
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
          validateField(this);
        }
      });
    });

    // Reset button functionality
    const resetBtn = document.querySelector('.btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        clearValidation();
        hideAlert();
        charCount.textContent = '0';
        charCount.style.color = '#666';
      });
    }
  }

  function validateForm() {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    // Additional validation for message length
    if (messageTextarea && messageTextarea.value.trim().length < 10) {
      showFieldError(messageTextarea, 'Message must be at least 10 characters long.');
      isValid = false;
    }
    
    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Clear previous error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      showFieldError(field, 'This field is required.');
      return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address.');
        return false;
      }
    }
    
    // Phone validation (optional but if provided)
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
        showFieldError(field, 'Please enter a valid phone number (at least 10 digits).');
        return false;
      }
    }
    
    // Message length validation
    if (field.id === 'message' && value) {
      if (value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long.');
        return false;
      }
      if (value.length > 500) {
        showFieldError(field, 'Message cannot exceed 500 characters.');
        return false;
      }
    }
    
    return isValid;
  }

  function showFieldError(field, message) {
    field.classList.add('is-invalid', 'shake');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = message;
    }
    
    // Remove shake animation after completion
    setTimeout(() => {
      field.classList.remove('shake');
    }, 500);
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = '';
    }
  }

  function clearValidation() {
    const invalidFields = contactForm.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
      clearFieldError(field);
    });
  }

  function setLoadingState(loading) {
    if (loading) {
      submitBtn.disabled = true;
      btnText.classList.add('d-none');
      btnSpinner.classList.remove('d-none');
    } else {
      submitBtn.disabled = false;
      btnText.classList.remove('d-none');
      btnSpinner.classList.add('d-none');
    }
  }

  function showAlert(type, message) {
    formAlert.className = `alert alert-${type}`;
    formAlert.textContent = message;
    formAlert.classList.remove('d-none');
    
    // Scroll to alert
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      hideAlert();
    }, 10000);
  }

  function hideAlert() {
    formAlert.classList.add('d-none');
  }
});










