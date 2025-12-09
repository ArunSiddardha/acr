# Contact Form Implementation

## Overview
A fully functional, responsive contact form has been successfully implemented for the Alumni Association Jekyll website.

## Files Created/Modified

### 1. **contact.html** (New)
- Main contact page with Jekyll front matter
- Responsive two-column layout (contact info + form)
- Form fields: Name, Email, Subject, Message
- Integration with Formspree for form submission

### 2. **assets/css/styles.css** (Modified)
- Added comprehensive contact form styling
- Responsive design for mobile and desktop
- Matches existing site theme (dark #0e0e0e with orange #FF8C00 accents)
- Hover effects and focus states
- Form validation error styling

### 3. **assets/js/contact.js** (New)
- Client-side form validation
- Real-time field validation on blur
- Email format validation
- Minimum length requirements
- Form submission handling
- Success/error message display
- Loading state management

### 4. **_includes/navbar.html** (Modified)
- Added "Contact" link to navigation menu

### 5. **contact-test.html** (New - For Testing)
- Standalone HTML file to test the contact form
- Can be opened directly in a browser

## Features

### Form Validation
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Subject**: Required, minimum 3 characters
- **Message**: Required, minimum 10 characters

### User Experience
- Real-time validation feedback
- Visual indicators (green border for valid, red for invalid)
- Clear error messages
- Loading state during submission
- Success/error notifications
- Fully responsive design

### Styling
- Matches existing site design
- Dark theme with orange accents
- Smooth transitions and hover effects
- Mobile-first responsive design
- Accessible form labels and ARIA attributes

## Setup Instructions

### 1. Configure Form Submission Service

The form is currently configured to use **Formspree**. To enable form submissions:

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint ID
5. Update `contact.html` line 28:
   ```html
   <form id="contactForm" class="contact-form" method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
   ```
   Replace `YOUR_FORM_ID` with your actual Formspree form ID

### Alternative: Netlify Forms

If hosting on Netlify, you can use Netlify Forms instead:

1. Add `netlify` attribute to the form tag:
   ```html
   <form id="contactForm" class="contact-form" method="POST" netlify>
   ```
2. Add a hidden input for bot protection:
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```

### 2. Build and Serve Jekyll Site

```bash
# Install dependencies (if not already done)
bundle install

# Serve the site locally
bundle exec jekyll serve

# Visit http://localhost:4000/contact.html
```

### 3. Test the Form

Open `contact-test.html` directly in a browser to test the form without running Jekyll:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server

# Then visit http://localhost:8000/contact-test.html
```

## Testing Checklist

- [ ] Form displays correctly on desktop (1920x1080)
- [ ] Form displays correctly on tablet (768x1024)
- [ ] Form displays correctly on mobile (375x667)
- [ ] All validation rules work correctly
- [ ] Error messages display properly
- [ ] Success message displays after submission
- [ ] Form integrates with Formspree/Netlify Forms
- [ ] Navigation link works correctly
- [ ] Styling matches site theme

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
Edit `/assets/css/styles.css` to change colors:
- Primary dark: `#0e0e0e`
- Accent orange: `#FF8C00`
- Success green: `#28a745`
- Error red: `#dc3545`

### Validation Rules
Edit `/assets/js/contact.js` to modify validation:
- Minimum name length: Line 18
- Email regex: Line 32
- Minimum subject length: Line 50
- Minimum message length: Line 68

### Contact Information
Edit `contact.html` to update:
- Email address (line 19)
- Physical address (lines 23-25)
- Social media links (lines 30-33)

## Troubleshooting

### Form not submitting
1. Check that Formspree form ID is correct
2. Verify internet connection
3. Check browser console for errors
4. Ensure all required fields are filled

### Styling issues
1. Clear browser cache
2. Verify CSS file is loaded (check Network tab)
3. Check for CSS conflicts with other stylesheets

### Validation not working
1. Ensure contact.js is loaded
2. Check browser console for JavaScript errors
3. Verify form field IDs match JavaScript selectors

## Future Enhancements

- [ ] Add CAPTCHA for spam protection
- [ ] Implement file upload functionality
- [ ] Add phone number field with validation
- [ ] Create email templates for responses
- [ ] Add analytics tracking for form submissions
- [ ] Implement rate limiting
- [ ] Add multi-language support

## Support

For issues or questions about the contact form implementation, please refer to:
- [Formspree Documentation](https://help.formspree.io/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [MDN Web Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)
