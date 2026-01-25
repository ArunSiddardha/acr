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
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      clearErrors();
      
      // Validate form
      let isValid = true;
      const formData = {};
      
      // Validate name
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
      } else {
        formData.name = name.value.trim();
      }
      
      // Validate email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      } else {
        formData.email = email.value.trim();
      }
      
      // Validate phone (optional)
      const phone = document.getElementById('phone');
      if (phone.value.trim()) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone.value.trim())) {
          showError(phone, 'Please enter a valid phone number');
          isValid = false;
        } else {
          formData.phone = phone.value.trim();
        }
      }
      
      // Validate subject
      const subject = document.getElementById('subject');
      if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
      } else {
        formData.subject = subject.value;
      }
      
      // Validate message
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
      } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
      } else {
        formData.message = message.value.trim();
      }
      
      if (isValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(function() {
          // Show success message
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Clear status after 5 seconds
          setTimeout(function() {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
          }, 5000);
        }, 1500);
      }
    });
  }
  
  function showError(input, message) {
    input.classList.add('error');
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
  
  function clearErrors() {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.classList.remove('error');
      const errorElement = input.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = '';
      }
    });
    
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }
  }
  
  // Clear errors on input
  const inputs = contactForm.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('error');
      const errorElement = this.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = '';
      }
    });
  });
});










