/**
 * Contact Form Validation and Submission Handler
 * Provides client-side validation and form submission functionality
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        
        // Exit if form doesn't exist on current page
        if (!form) return;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const successAlert = document.getElementById('successAlert');
        const errorAlert = document.getElementById('errorAlert');
        const errorAlertMessage = document.getElementById('errorAlertMessage');

        // Validation rules
        const validationRules = {
            name: {
                minLength: 2,
                pattern: /^[a-zA-Z\s'-]+$/,
                errorMessages: {
                    required: 'Name is required',
                    minLength: 'Name must be at least 2 characters',
                    pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes'
                }
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                errorMessages: {
                    required: 'Email is required',
                    pattern: 'Please enter a valid email address'
                }
            },
            subject: {
                minLength: 5,
                errorMessages: {
                    required: 'Subject is required',
                    minLength: 'Subject must be at least 5 characters'
                }
            },
            message: {
                minLength: 10,
                errorMessages: {
                    required: 'Message is required',
                    minLength: 'Message must be at least 10 characters'
                }
            }
        };

        /**
         * Validate a single field
         */
        function validateField(input, rules) {
            const value = input.value.trim();
            const errorElement = document.getElementById(input.id + 'Error');
            
            // Check if required field is empty
            if (!value) {
                showError(input, errorElement, rules.errorMessages.required);
                return false;
            }

            // Check minimum length
            if (rules.minLength && value.length < rules.minLength) {
                showError(input, errorElement, rules.errorMessages.minLength);
                return false;
            }

            // Check pattern
            if (rules.pattern && !rules.pattern.test(value)) {
                showError(input, errorElement, rules.errorMessages.pattern);
                return false;
            }

            // Field is valid
            showSuccess(input, errorElement);
            return true;
        }

        /**
         * Show error state for a field
         */
        function showError(input, errorElement, message) {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        /**
         * Show success state for a field
         */
        function showSuccess(input, errorElement) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }

        /**
         * Validate entire form
         */
        function validateForm() {
            const isNameValid = validateField(nameInput, validationRules.name);
            const isEmailValid = validateField(emailInput, validationRules.email);
            const isSubjectValid = validateField(subjectInput, validationRules.subject);
            const isMessageValid = validateField(messageInput, validationRules.message);

            return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
        }

        /**
         * Show alert message
         */
        function showAlert(type, message) {
            hideAlerts();
            
            if (type === 'success') {
                successAlert.style.display = 'block';
                successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                errorAlertMessage.textContent = message || 'Something went wrong. Please try again later.';
                errorAlert.style.display = 'block';
                errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        /**
         * Hide all alerts
         */
        function hideAlerts() {
            successAlert.style.display = 'none';
            errorAlert.style.display = 'none';
        }

        /**
         * Toggle submit button loading state
         */
        function setLoadingState(isLoading) {
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            if (isLoading) {
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-flex';
                submitBtn.disabled = true;
            } else {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        }

        /**
         * Reset form to initial state
         */
        function resetForm() {
            form.reset();
            
            // Remove validation classes
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });

            // Hide error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.classList.remove('show');
            });
        }

        /**
         * Submit form data
         * In a production environment, this would send data to a backend API
         * For this static site, we'll simulate submission and store locally
         */
        function submitForm(formData) {
            return new Promise((resolve, reject) => {
                // Simulate API call delay
                setTimeout(() => {
                    try {
                        // Store submission in localStorage for demonstration
                        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                        submissions.push({
                            ...formData,
                            timestamp: new Date().toISOString(),
                            id: Date.now()
                        });
                        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                        
                        // Log to console for verification
                        console.log('Form submitted successfully:', formData);
                        
                        resolve({ success: true });
                    } catch (error) {
                        reject(error);
                    }
                }, 1500);
            });
        }

        /**
         * Handle form submission
         */
        async function handleSubmit(event) {
            event.preventDefault();
            hideAlerts();

            // Validate form
            if (!validateForm()) {
                showAlert('error', 'Please fix the errors in the form before submitting.');
                return;
            }

            // Collect form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Set loading state
            setLoadingState(true);

            try {
                // Submit form
                await submitForm(formData);
                
                // Show success message
                showAlert('success');
                
                // Reset form after short delay
                setTimeout(() => {
                    resetForm();
                }, 2000);
                
            } catch (error) {
                console.error('Form submission error:', error);
                showAlert('error', 'Failed to send message. Please try again.');
            } finally {
                setLoadingState(false);
            }
        }

        // Add real-time validation on blur
        nameInput.addEventListener('blur', () => validateField(nameInput, validationRules.name));
        emailInput.addEventListener('blur', () => validateField(emailInput, validationRules.email));
        subjectInput.addEventListener('blur', () => validateField(subjectInput, validationRules.subject));
        messageInput.addEventListener('blur', () => validateField(messageInput, validationRules.message));

        // Add input event listeners to clear errors while typing
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    const errorElement = document.getElementById(this.id + 'Error');
                    this.classList.remove('is-invalid');
                    errorElement.classList.remove('show');
                }
            });
        });

        // Handle form submission
        form.addEventListener('submit', handleSubmit);

        // Initialize: hide alerts on page load
        hideAlerts();
    });
})();
