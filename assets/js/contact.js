// Contact Form Validation and Submission Handler
(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');

        // Error message elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation functions
        function validateName() {
            const value = nameField.value.trim();
            if (value === '') {
                showError(nameField, nameError, 'Name is required');
                return false;
            } else if (value.length < 2) {
                showError(nameField, nameError, 'Name must be at least 2 characters');
                return false;
            } else {
                showSuccess(nameField, nameError);
                return true;
            }
        }

        function validateEmail() {
            const value = emailField.value.trim();
            if (value === '') {
                showError(emailField, emailError, 'Email is required');
                return false;
            } else if (!emailRegex.test(value)) {
                showError(emailField, emailError, 'Please enter a valid email address');
                return false;
            } else {
                showSuccess(emailField, emailError);
                return true;
            }
        }

        function validateMessage() {
            const value = messageField.value.trim();
            if (value === '') {
                showError(messageField, messageError, 'Message is required');
                return false;
            } else if (value.length < 10) {
                showError(messageField, messageError, 'Message must be at least 10 characters');
                return false;
            } else {
                showSuccess(messageField, messageError);
                return true;
            }
        }

        function showError(field, errorElement, message) {
            field.classList.add('error');
            field.classList.remove('success');
            errorElement.textContent = message;
            field.setAttribute('aria-invalid', 'true');
        }

        function showSuccess(field, errorElement) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
            field.setAttribute('aria-invalid', 'false');
        }

        function clearMessages() {
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
        }

        // Real-time validation
        nameField.addEventListener('blur', validateName);
        emailField.addEventListener('blur', validateEmail);
        messageField.addEventListener('blur', validateMessage);

        // Input event for immediate feedback after first validation
        nameField.addEventListener('input', function() {
            if (nameField.classList.contains('error') || nameField.classList.contains('success')) {
                validateName();
            }
        });

        emailField.addEventListener('input', function() {
            if (emailField.classList.contains('error') || emailField.classList.contains('success')) {
                validateEmail();
            }
        });

        messageField.addEventListener('input', function() {
            if (messageField.classList.contains('error') || messageField.classList.contains('success')) {
                validateMessage();
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            clearMessages();

            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            // If all validations pass, submit the form
            if (isNameValid && isEmailValid && isMessageValid) {
                submitForm();
            } else {
                // Focus on first error field
                if (!isNameValid) {
                    nameField.focus();
                } else if (!isEmailValid) {
                    emailField.focus();
                } else if (!isMessageValid) {
                    messageField.focus();
                }
            }
        });

        function submitForm() {
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';

            // Get form data
            const formData = new FormData(form);

            // Submit to Formspree using AJAX
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    // Success
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Clear validation classes
                    [nameField, emailField, subjectField, messageField].forEach(function(field) {
                        field.classList.remove('error', 'success');
                        field.removeAttribute('aria-invalid');
                    });

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    // Error response from server
                    return response.json().then(function(data) {
                        throw new Error(data.error || 'Form submission failed');
                    });
                }
            })
            .catch(function(error) {
                // Error
                console.error('Form submission error:', error);
                errorMessage.style.display = 'block';
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Hide error message after 5 seconds
                setTimeout(function() {
                    errorMessage.style.display = 'none';
                }, 5000);
            })
            .finally(function() {
                // Re-enable submit button and hide loading state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            });
        }

        // Keyboard accessibility - Enter key on submit button
        submitBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
})();
