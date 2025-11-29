# Contributing to Alumni Website

Thank you for your interest in contributing to the Alumni Website! This document provides guidelines and instructions for contributing to this Jekyll-based project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors. Please be considerate and constructive in your communications.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby** (version 2.7 or higher)
- **Bundler** (`gem install bundler`)
- **Git**

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/alumni-website.git
   cd alumni-website
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/alumni-website.git
   ```

4. **Install dependencies**:
   ```bash
   bundle install
   ```

5. **Run the development server**:
   ```bash
   bundle exec jekyll serve
   ```
   
   The site will be available at `http://localhost:4000`

6. **Run with live reload** (optional):
   ```bash
   bundle exec jekyll serve --livereload
   ```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes**: Fix issues in existing functionality
- **New features**: Add new pages, layouts, or functionality
- **Content updates**: Update alumni information, blog posts, or documentation
- **Design improvements**: Enhance the visual design and user experience
- **Documentation**: Improve README, guides, or inline documentation
- **Performance**: Optimize site build time or runtime performance

### Workflow

1. **Create a new branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
   Use descriptive branch names:
   - `feature/add-alumni-directory`
   - `fix/broken-navigation-link`
   - `docs/update-readme`
   - `style/improve-mobile-layout`

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly:
   - Build the site: `bundle exec jekyll build`
   - Check for broken links
   - Test on multiple browsers and screen sizes
   - Verify all pages render correctly

4. **Commit your changes** with clear, descriptive messages

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## Coding Standards

### Jekyll/Liquid Templates

- Use consistent indentation (2 spaces)
- Keep Liquid logic simple and readable
- Use meaningful variable names
- Add comments for complex logic
- Follow Jekyll best practices for includes and layouts

Example:
```liquid
{% comment %}
  Display alumni profile with fallback for missing data
{% endcomment %}
{% if alumni.photo %}
  <img src="{{ alumni.photo }}" alt="{{ alumni.name }}">
{% else %}
  <img src="/images/default-avatar.png" alt="Default avatar">
{% endif %}
```

### HTML/CSS

- Write semantic HTML5
- Use CSS classes over inline styles
- Follow BEM naming convention for CSS classes when applicable
- Ensure responsive design (mobile-first approach)
- Maintain accessibility standards (WCAG 2.1 AA)

### Markdown Content

- Use proper heading hierarchy (h1 → h2 → h3)
- Include alt text for all images
- Use relative links for internal pages
- Follow front matter conventions:

```yaml
---
layout: post
title: "Your Post Title"
date: 2025-11-29 12:00:00 -0000
categories: alumni updates
author: Your Name
---
```

### Ruby (Plugins/Custom Code)

- Follow Ruby style guide (Rubocop standards)
- Write clear, self-documenting code
- Add comments for complex logic
- Include error handling
- Write tests for custom plugins

## Commit Guidelines

Write clear, concise commit messages that explain **why** the change was made:

### Format

```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat: add alumni directory page with search functionality

Implements a searchable directory of alumni with filtering by
graduation year and department. Uses Jekyll data files for
alumni information.

Closes #42
```

```
fix: resolve mobile navigation menu overflow issue

The navigation menu was extending beyond viewport on small screens.
Updated CSS to use flexbox with proper wrapping.
```

```
docs: update README with deployment instructions
```

## Pull Request Process

1. **Ensure your PR**:
   - Has a clear, descriptive title
   - References related issues (e.g., "Fixes #123")
   - Includes a detailed description of changes
   - Passes all checks (if CI/CD is configured)
   - Has been tested locally

2. **PR Description Template**:
   ```markdown
   ## Description
   Brief description of what this PR does
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Style/UI improvement
   
   ## Testing
   - [ ] Tested locally with `bundle exec jekyll serve`
   - [ ] Tested on mobile devices/responsive design
   - [ ] Verified no broken links
   - [ ] Checked browser compatibility
   
   ## Screenshots (if applicable)
   Add screenshots for UI changes
   
   ## Related Issues
   Closes #(issue number)
   ```

3. **Review Process**:
   - At least one maintainer will review your PR
   - Address any requested changes
   - Once approved, a maintainer will merge your PR

4. **After Merge**:
   - Delete your feature branch
   - Pull the latest changes from upstream
   - Celebrate your contribution! 🎉

## Reporting Issues

### Before Creating an Issue

- Search existing issues to avoid duplicates
- Check if the issue exists in the latest version
- Gather relevant information (browser, OS, steps to reproduce)

### Issue Template

```markdown
## Description
Clear description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- Browser: [e.g., Chrome 120, Firefox 121]
- OS: [e.g., macOS 14, Windows 11, Ubuntu 22.04]
- Ruby version: [e.g., 3.2.0]
- Jekyll version: [e.g., 4.3.1]

## Screenshots
If applicable, add screenshots

## Additional Context
Any other relevant information
```

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Check the project's README for additional resources

## Recognition

All contributors will be recognized in our project. Thank you for helping make the Alumni Website better!

---

**Happy Contributing!** 🚀
