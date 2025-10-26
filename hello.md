---
layout: default
title: Hello World
permalink: /hello/
---

# Ruby Hello World

Welcome to our Ruby-powered Hello World page!

## About This Application

This page demonstrates a simple Ruby "Hello World" application integrated with Jekyll.

### Features

- **Standalone Ruby Script**: A complete Ruby class with greeting functionality
- **Jekyll Integration**: This page is generated using Jekyll's Ruby-based templating
- **Dynamic Content**: Shows current Ruby version and platform information
- **Object-Oriented Design**: Uses Ruby classes and methods

### Running the Application

To run the standalone Ruby script:

```bash
ruby hello_world.rb
```

### Ruby Code Structure

The application includes:

- A `HelloWorld` class with customizable greetings
- Instance methods for personalized messages
- Class methods for running the complete application
- Ruby version and platform detection

---

**Generated on**: {{ site.time | date: "%Y-%m-%d %H:%M:%S" }}

**Jekyll Version**: {{ jekyll.version }}

---

[Back to Home]({{ "/" | relative_url }})