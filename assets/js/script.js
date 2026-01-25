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

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      clearErrors();
      
      // Validate form
      const isValid = validateForm();
      
      if (isValid) {
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual endpoint)
        submitForm(data);
      }
    });
    
    // Reset button functionality
    const resetBtn = contactForm.querySelector('.btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        clearErrors();
        hideMessage();
      });
    }
  }
  
  function validateForm() {
    let isValid = true;
    
    // Name validation
    const nameField = document.getElementById('name');
    if (!nameField.value.trim()) {
      showError(nameField, 'Name is required');
      isValid = false;
    } else if (nameField.value.trim().length < 2) {
      showError(nameField, 'Name must be at least 2 characters');
      isValid = false;
    }
    
    // Email validation
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim()) {
      showError(emailField, 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(emailField.value.trim())) {
      showError(emailField, 'Please enter a valid email address');
      isValid = false;
    }
    
    // Phone validation (optional)
    const phoneField = document.getElementById('phone');
    if (phoneField.value.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phoneField.value.trim())) {
        showError(phoneField, 'Please enter a valid phone number');
        isValid = false;
      }
    }
    
    // Subject validation
    const subjectField = document.getElementById('subject');
    if (!subjectField.value) {
      showError(subjectField, 'Please select a subject');
      isValid = false;
    }
    
    // Message validation
    const messageField = document.getElementById('message');
    if (!messageField.value.trim()) {
      showError(messageField, 'Message is required');
      isValid = false;
    } else if (messageField.value.trim().length < 10) {
      showError(messageField, 'Message must be at least 10 characters');
      isValid = false;
    } else if (messageField.value.trim().length > 1000) {
      showError(messageField, 'Message must be less than 1000 characters');
      isValid = false;
    }
    
    return isValid;
  }
  
  function showError(field, message) {
    field.classList.add('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    // Remove error on input
    field.addEventListener('input', function() {
      hideFieldError(field);
    });
  }
  
  function hideFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.style.display = 'none';
    }
  }
  
  function clearErrors() {
    const fields = contactForm.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
      hideFieldError(field);
    });
  }
  
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
  }
  
  function hideMessage() {
    formMessage.style.display = 'none';
  }
  
  function submitForm(data) {
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual form submission)
    setTimeout(function() {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Show success message
      showMessage('Thank you for your message! We will get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Hide message after 5 seconds
      setTimeout(function() {
        hideMessage();
      }, 5000);
      
      // Log form data (remove in production)
      console.log('Form submitted with data:', data);
      
    }, 2000);
  }
});

