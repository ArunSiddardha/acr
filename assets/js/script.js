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

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous messages
      formMessage.className = 'form-message';
      formMessage.textContent = '';
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validation
      let isValid = true;
      let errorMessage = '';
      
      if (name.length < 2) {
        errorMessage = 'Name must be at least 2 characters long.';
        isValid = false;
      } else if (!isValidEmail(email)) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
      } else if (phone && !isValidPhone(phone)) {
        errorMessage = 'Please enter a valid phone number.';
        isValid = false;
      } else if (subject.length < 3) {
        errorMessage = 'Subject must be at least 3 characters long.';
        isValid = false;
      } else if (message.length < 10) {
        errorMessage = 'Message must be at least 10 characters long.';
        isValid = false;
      }
      
      if (!isValid) {
        formMessage.className = 'form-message error';
        formMessage.textContent = errorMessage;
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(function() {
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(function() {
          formMessage.className = 'form-message';
          formMessage.textContent = '';
        }, 5000);
      }, 1500);
    });
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Phone validation helper
  function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }
});










