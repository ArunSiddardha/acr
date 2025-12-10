// Contact Form Validation and Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        return; // Exit if contact form doesn't exist on this page
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('formMessage');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');

        if (name === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, errorElement, 'Name must be at least 2 characters');
            return false;
        } else {
            showSuccess(nameInput, errorElement);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');

        if (email === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, errorElement);
            return true;
        }
    }

    function validateSubject() {
        const subject = subjectInput.value.trim();
        const errorElement = document.getElementById('subjectError');

        if (subject === '') {
            showError(subjectInput, errorElement, 'Subject is required');
            return false;
        } else if (subject.length < 3) {
            showError(subjectInput, errorElement, 'Subject must be at least 3 characters');
            return false;
        } else {
            showSuccess(subjectInput, errorElement);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const errorElement = document.getElementById('messageError');

        if (message === '') {
            showError(messageInput, errorElement, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, errorElement, 'Message must be at least 10 characters');
            return false;
        } else {
            showSuccess(messageInput, errorElement);
            return true;
        }
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message show ' + type;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.classList.remove('show');
        }, 5000);
    }

    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);

    // Clear error on input
    nameInput.addEventListener('input', function() {
        if (nameInput.classList.contains('error')) {
            validateName();
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailInput.classList.contains('error')) {
            validateEmail();
        }
    });

    subjectInput.addEventListener('input', function() {
        if (subjectInput.classList.contains('error')) {
            validateSubject();
        }
    });

    messageInput.addEventListener('input', function() {
        if (messageInput.classList.contains('error')) {
            validateMessage();
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Disable submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate form submission (replace with actual backend endpoint)
            setTimeout(function() {
                // Success simulation
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Remove success classes
                nameInput.classList.remove('success');
                emailInput.classList.remove('success');
                subjectInput.classList.remove('success');
                messageInput.classList.remove('success');

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';

                // Log form data (for demonstration)
                console.log('Form submitted with data:', formData);
            }, 1500);

            // For actual implementation, use fetch or XMLHttpRequest:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            })
            .catch(error => {
                showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
            */
        } else {
            showFormMessage('Please fix the errors above before submitting.', 'error');
        }
    });
});
