document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  const formStatus = document.getElementById('formStatus');

  // Form field elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Validation functions
  function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
      nameError.textContent = 'Name is required';
      nameInput.style.borderColor = '#dc3545';
      return false;
    } else if (name.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters';
      nameInput.style.borderColor = '#dc3545';
      return false;
    } else {
      nameError.textContent = '';
      nameInput.style.borderColor = '#28a745';
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
      emailError.textContent = 'Email is required';
      emailInput.style.borderColor = '#dc3545';
      return false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address';
      emailInput.style.borderColor = '#dc3545';
      return false;
    } else {
      emailError.textContent = '';
      emailInput.style.borderColor = '#28a745';
      return true;
    }
  }

  function validateSubject() {
    const subject = subjectInput.value.trim();
    if (subject === '') {
      subjectError.textContent = 'Subject is required';
      subjectInput.style.borderColor = '#dc3545';
      return false;
    } else if (subject.length < 3) {
      subjectError.textContent = 'Subject must be at least 3 characters';
      subjectInput.style.borderColor = '#dc3545';
      return false;
    } else {
      subjectError.textContent = '';
      subjectInput.style.borderColor = '#28a745';
      return true;
    }
  }

  function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
      messageError.textContent = 'Message is required';
      messageInput.style.borderColor = '#dc3545';
      return false;
    } else if (message.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      messageInput.style.borderColor = '#dc3545';
      return false;
    } else {
      messageError.textContent = '';
      messageInput.style.borderColor = '#28a745';
      return true;
    }
  }

  // Real-time validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  subjectInput.addEventListener('blur', validateSubject);
  messageInput.addEventListener('blur', validateMessage);

  // Clear error on input
  nameInput.addEventListener('input', function() {
    if (nameError.textContent !== '') {
      nameError.textContent = '';
      nameInput.style.borderColor = '#e0e0e0';
    }
  });

  emailInput.addEventListener('input', function() {
    if (emailError.textContent !== '') {
      emailError.textContent = '';
      emailInput.style.borderColor = '#e0e0e0';
    }
  });

  subjectInput.addEventListener('input', function() {
    if (subjectError.textContent !== '') {
      subjectError.textContent = '';
      subjectInput.style.borderColor = '#e0e0e0';
    }
  });

  messageInput.addEventListener('input', function() {
    if (messageError.textContent !== '') {
      messageError.textContent = '';
      messageInput.style.borderColor = '#e0e0e0';
    }
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showStatus('Please fix the errors before submitting', 'error');
      return;
    }

    // Disable submit button and show loader
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';

    // Get form data
    const formData = new FormData(form);

    // Submit to Formspree or handle locally
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        showStatus('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        // Reset border colors
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
          input.style.borderColor = '#e0e0e0';
        });
      } else {
        return response.json().then(data => {
          if (data.errors) {
            showStatus('Oops! There was a problem submitting your form', 'error');
          } else {
            showStatus('Oops! There was a problem submitting your form', 'error');
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showStatus('Oops! There was a problem submitting your form. Please try again later.', 'error');
    })
    .finally(() => {
      // Re-enable submit button and hide loader
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
    });
  });

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';
    }, 5000);
  }
});
