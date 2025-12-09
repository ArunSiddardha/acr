# Contact Form Implementation

## Overview
A fully functional, responsive contact form has been successfully implemented for the Alumni Association Jekyll website.

## Files Created/Modified

### 1. **contact.html** (New)
- Main contact page with Jekyll front matter
- Responsive two-column layout (contact info + form)
- Form fields: Name, Email, Subject, Message
- Integrated with site layout using `layout: default`

### 2. **assets/css/styles.css** (Modified)
- Added comprehensive contact form styling
- Responsive design for mobile, tablet, and desktop
- Hover effects and focus states
- Success/error message styling
- Matches existing site theme (dark #0e0e0e with orange #FF8C00 accents)

### 3. **assets/js/contact.js** (New)
- Client-side form validation
- Real-time error messages
- Email format validation
- Minimum length validation for all fields
- Form submission handling with loading states
- Success/error status display

### 4. **_includes/navbar.html** (Modified)
- Added "Contact" link to navigation menu
- Link points to `/contact.html`

### 5. **contact-demo.html** (New - For Testing)
- Standalone HTML file for testing without Jekyll build
- Can be opened directly in a browser

## Features

### Form Validation
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Subject**: Required, minimum 3 characters
- **Message**: Required, minimum 10 characters

### User Experience
- Real-time validation on blur
- Clear error messages
- Visual feedback (border colors change)
- Loading state during submission
- Success/error notifications

### Responsive Design
- Desktop: Two-column layout (info sidebar + form)
- Tablet: Adjusted spacing and font sizes
- Mobile: Single column, stacked layout

### Styling
- Matches existing site design
- Dark theme with orange accents
- Smooth transitions and hover effects
- Professional, modern appearance

## Form Submission Setup

The form is configured to work with **Formspree** (a popular form backend service). To activate:

1. Sign up at [https://formspree.io](https://formspree.io)
2. Create a new form
3. Get your form ID
4. Update the form action in `contact.html`:
   ```html
   <form id="contactForm" class="contact-form" method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
   ```
   Replace `YOUR_FORM_ID` with your actual Formspree form ID

### Alternative Backend Options
- **Netlify Forms**: If hosting on Netlify, add `netlify` attribute to form
- **Custom Backend**: Modify `contact.js` fetch URL to point to your API endpoint
- **Email Service**: Integrate with services like SendGrid, Mailgun, etc.

## Testing

### Manual Testing Checklist
- [ ] Form displays correctly on desktop
- [ ] Form displays correctly on mobile
- [ ] All validation rules work
- [ ] Error messages display properly
- [ ] Form submission works (after configuring backend)
- [ ] Success message displays after submission
- [ ] Form resets after successful submission
- [ ] Navigation link works

### Quick Test
1. Open `contact-demo.html` in a browser
2. Try submitting empty form (should show errors)
3. Enter invalid email (should show error)
4. Fill all fields correctly (validation should pass)

## Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
Edit in `assets/css/styles.css`:
- Primary color: `#0e0e0e`
- Accent color: `#FF8C00`
- Success: `#28a745`
- Error: `#dc3545`

### Validation Rules
Edit in `assets/js/contact.js`:
- Modify minimum length requirements
- Add custom validation rules
- Change error messages

### Layout
Edit in `contact.html`:
- Modify contact information
- Add/remove form fields
- Change grid layout

## Accessibility
- Proper label associations
- ARIA labels for social links
- Keyboard navigation support
- Focus states for all interactive elements
- Required field indicators

## Next Steps
1. Configure form backend (Formspree or alternative)
2. Update contact information in `contact.html`
3. Test form submission end-to-end
4. Add reCAPTCHA if needed for spam protection
5. Set up email notifications for form submissions

## Support
For issues or questions about the contact form implementation, refer to:
- Formspree documentation: https://help.formspree.io/
- Jekyll documentation: https://jekyllrb.com/docs/
