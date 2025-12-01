# Contact Form Setup Guide

## What Was Added

I've successfully added a contact form to your Jekyll Alumni Association website. Here's what was implemented:

### 1. New Contact Page (`contact.html`)
- Created a fully functional contact form with the following fields:
  - **Name** (required)
  - **Email** (required)
  - **Subject** (optional)
  - **Message** (required)
- Responsive design using Bootstrap classes
- Custom styling with modern aesthetics
- Contact information section with email, social links, and address

### 2. Navigation Update
- Added "Contact" link to the navigation menu in `_includes/navbar.html`
- Link points to `/contact/` permalink

### 3. Form Styling
- Modern, clean design with:
  - Light gray background wrapper
  - Smooth transitions and hover effects
  - Blue primary color scheme matching Bootstrap
  - Responsive layout for mobile and desktop
  - Form validation indicators

## Setting Up Form Submission

The contact form is currently configured to use **Formspree** (a free service for static sites). To make it functional:

### Option 1: Using Formspree (Recommended for Static Sites)

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)
5. Edit `contact.html` and replace `YOUR_FORM_ID` with your actual form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST" class="contact-form">
   ```

### Option 2: Using Netlify Forms (If hosted on Netlify)

1. Replace the form opening tag in `contact.html` with:
   ```html
   <form name="contact" method="POST" data-netlify="true" class="contact-form">
   ```
2. Add a hidden input for bot protection:
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```

### Option 3: Custom Backend

If you have your own backend API, update the form action to point to your endpoint:
```html
<form action="https://your-api.com/contact" method="POST" class="contact-form">
```

## Building the Jekyll Site

Due to native gem compilation issues in the sandbox environment, you'll need to build the site on your local machine or deployment environment:

### Local Development:
```bash
# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve

# Visit http://localhost:4000/contact/ to see the contact form
```

### Production Build:
```bash
bundle exec jekyll build
```

## Customization

### Update Contact Information
Edit `contact.html` to update:
- Email address (currently uses `{{ site.email }}` from `_config.yml`)
- Physical address
- Social media links

### Change Colors
Modify the `<style>` section in `contact.html`:
- Primary color: Change `#007bff` to your brand color
- Background: Change `#f8f9fa` for the form wrapper

### Add More Fields
Add additional form fields by following the existing pattern:
```html
<div class="mb-3">
  <label for="phone" class="form-label">Phone</label>
  <input type="tel" class="form-control" id="phone" name="phone" placeholder="Your phone number">
</div>
```

## Testing

1. **HTML5 Validation**: The form uses built-in HTML5 validation for required fields
2. **Responsive Design**: Test on different screen sizes
3. **Form Submission**: After configuring Formspree or your backend, test the submission
4. **Email Notifications**: Configure email notifications in your form service

## Files Modified

- ✅ `/vercel/sandbox/contact.html` - New contact page
- ✅ `/vercel/sandbox/_includes/navbar.html` - Added Contact link

## Next Steps

1. Configure form submission service (Formspree recommended)
2. Update contact information in `_config.yml` and `contact.html`
3. Test the form on your deployed site
4. Customize colors and styling to match your brand

## Support

If you encounter any issues:
- Check that all form fields have proper `name` attributes
- Verify the form action URL is correct
- Test with browser developer tools to see any JavaScript errors
- Ensure your Jekyll site builds without errors

Enjoy your new contact form! 🎉
