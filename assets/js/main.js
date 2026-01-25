let year = document.querySelector("#year");

$(document).ready(function () {
  year.innerText = new Date().getFullYear();
  
  // Contact form handling
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      subject: $('#subject').val(),
      message: $('#message').val(),
      newsletter: $('#newsletter').is(':checked')
    };
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      $('#errorMessage').text('Please fill in all required fields.').show();
      $('#successMessage').hide();
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      $('#errorMessage').text('Please enter a valid email address.').show();
      $('#successMessage').hide();
      return;
    }
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(function() {
      $('#successMessage').show();
      $('#errorMessage').hide();
      $('#contactForm')[0].reset();
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        $('#successMessage').fadeOut();
      }, 5000);
    }, 1000);
  });
});
