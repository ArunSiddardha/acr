# Contact Page Visual Preview

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         NAVBAR                               │
│  [Logo]  Home  About  Alumni  Awards  Contact  Sign-up Login│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                       Contact Us                              │
│     We'd love to hear from you. Send us a message and        │
│           we'll respond as soon as possible.                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│                              │                              │
│   CONTACT FORM               │   GET IN TOUCH               │
│   ┌────────────────────┐     │   ┌────────────────────┐     │
│   │ Name *             │     │   │ 📧 Email            │     │
│   │ [text input]       │     │   │ alumni@example.com  │     │
│   └────────────────────┘     │   └────────────────────┘     │
│                              │                              │
│   ┌────────────────────┐     │   ┌────────────────────┐     │
│   │ Email *            │     │   │ 📞 Phone            │     │
│   │ [email input]      │     │   │ +1 (234) 567-890    │     │
│   └────────────────────┘     │   └────────────────────┘     │
│                              │                              │
│   ┌────────────────────┐     │   ┌────────────────────┐     │
│   │ Subject            │     │   │ 📍 Address          │     │
│   │ [text input]       │     │   │ IIT Hyderabad       │     │
│   └────────────────────┘     │   │ Kandi, Sangareddy   │     │
│                              │   │ Telangana, India    │     │
│   ┌────────────────────┐     │   └────────────────────┘     │
│   │ Message *          │     │                              │
│   │ [textarea]         │     │   Follow Us                  │
│   │                    │     │   [f] [in] [ig] [tw]         │
│   │                    │     │                              │
│   └────────────────────┘     │                              │
│                              │                              │
│   ┌────────────────────┐     │                              │
│   │  Send Message  →   │     │                              │
│   └────────────────────┘     │                              │
│                              │                              │
└──────────────────────────────┴──────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                               │
│         [f] [in] [ig] [tw]  © 2023, ALL Rights Reserved      │
└─────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Form Section (Left)
- **Background**: Light gray (#f9f9f9)
- **Inputs**: White with gray borders
- **Focus State**: Orange border (#FF8C00)
- **Button**: Dark (#0e0e0e) → Orange on hover (#FF8C00)
- **Error Text**: Red (#dc3545)
- **Success Text**: Green (#28a745)

### Contact Info Section (Right)
- **Background**: Dark (#0e0e0e)
- **Text**: White
- **Headings**: Orange (#FF8C00)
- **Icons**: Orange (#FF8C00)
- **Links**: Light gray → Orange on hover

## Interactive States

### Form Validation
```
┌────────────────────┐
│ Name *             │  ← Empty field
│ [              ]   │
│ ⚠ Name is required │  ← Error message (red)
└────────────────────┘

┌────────────────────┐
│ Email *            │  ← Invalid email
│ [test@invalid  ]   │  ← Red border
│ ⚠ Please enter a   │  ← Error message
│   valid email      │
└────────────────────┘

┌────────────────────┐
│ Name *             │  ← Valid input
│ [John Doe      ]   │  ← Green border
│                    │  ← No error
└────────────────────┘
```

### Submit Button States
```
Normal:     ┌──────────────────┐
            │  Send Message    │  Dark background
            └──────────────────┘

Hover:      ┌──────────────────┐
            │  Send Message    │  Orange background
            └──────────────────┘  Lifts up slightly

Loading:    ┌──────────────────┐
            │  ⟳ Sending...    │  Disabled, spinner animation
            └──────────────────┘
```

### Success Message
```
┌────────────────────────────────────────┐
│ ✓ Success! Your message has been sent │  Green background
│   successfully. We'll get back to you  │  Auto-hides after 5s
│   soon.                                │
└────────────────────────────────────────┘
```

### Error Message
```
┌────────────────────────────────────────┐
│ ✗ Error! Something went wrong. Please │  Red background
│   try again later.                     │  Auto-hides after 5s
└────────────────────────────────────────┘
```

## Mobile Layout (< 768px)

```
┌─────────────────────────┐
│       NAVBAR            │
│  [☰]  [Logo]            │
└─────────────────────────┘

┌─────────────────────────┐
│     Contact Us          │
│  We'd love to hear...   │
└─────────────────────────┘

┌─────────────────────────┐
│   CONTACT FORM          │
│   ┌─────────────────┐   │
│   │ Name *          │   │
│   └─────────────────┘   │
│   ┌─────────────────┐   │
│   │ Email *         │   │
│   └─────────────────┘   │
│   ┌─────────────────┐   │
│   │ Subject         │   │
│   └─────────────────┘   │
│   ┌─────────────────┐   │
│   │ Message *       │   │
│   │                 │   │
│   └─────────────────┘   │
│   ┌─────────────────┐   │
│   │ Send Message    │   │
│   └─────────────────┘   │
└─────────────────────────┘

┌─────────────────────────┐
│   GET IN TOUCH          │
│   📧 Email              │
│   alumni@example.com    │
│                         │
│   📞 Phone              │
│   +1 (234) 567-890      │
│                         │
│   📍 Address            │
│   IIT Hyderabad         │
│                         │
│   Follow Us             │
│   [f] [in] [ig] [tw]    │
└─────────────────────────┘

┌─────────────────────────┐
│       FOOTER            │
│  [f] [in] [ig] [tw]     │
│  © 2023, ALL Rights     │
└─────────────────────────┘
```

## Typography Scale

```
Desktop:
  H1 (Contact Us):        4em (64px)
  Subtitle:               1.2rem (19.2px)
  Section Heading (h3):   2rem (32px)
  Form Labels:            1.1rem (17.6px)
  Body Text:              1rem (16px)
  Button Text:            1.2rem (19.2px)

Tablet (768px):
  H1:                     3em (48px)
  Subtitle:               1rem (16px)
  Section Heading:        1.5rem (24px)
  Button Text:            1.1rem (17.6px)

Mobile (500px):
  H1:                     2.5em (40px)
  All other text scales proportionally
```

## Animations

1. **Button Hover**: Lifts up 2px with color change
2. **Input Focus**: Border color transition (0.3s)
3. **Loading Spinner**: Continuous rotation (0.8s)
4. **Social Icons**: Lift up 3px on hover
5. **Success/Error Messages**: Fade in, auto-hide after 5s

## Accessibility Features

- ✅ All form fields have associated labels
- ✅ Error messages linked via aria-describedby
- ✅ Required fields marked with aria-required
- ✅ Invalid fields marked with aria-invalid
- ✅ Alert messages have role="alert"
- ✅ Keyboard navigation fully supported
- ✅ Focus indicators visible
- ✅ Color contrast meets WCAG AA standards

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **CSS**: 11KB (includes all site styles)
- **JavaScript**: 8KB (contact form only)
- **No external dependencies** (uses existing jQuery, Bootstrap)
- **Optimized animations** (GPU-accelerated transforms)

---

**Note**: This is a text-based preview. The actual page includes smooth animations, hover effects, and interactive validation that enhance the user experience beyond what can be shown in ASCII art.
