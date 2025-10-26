#!/usr/bin/env ruby

# Hello World Ruby Application
class HelloWorld
  def initialize(name = "World")
    @name = name
  end

  def greet
    "Hello, #{@name}!"
  end

  def display_greeting
    puts greet
    puts "Welcome to Ruby programming!"
    puts "Current time: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"
  end
end

# Main execution
if __FILE__ == $0
  puts "=" * 40
  puts "    HELLO WORLD RUBY APPLICATION"
  puts "=" * 40
  
  # Create instances with different names
  hello_default = HelloWorld.new
  hello_ruby = HelloWorld.new("Ruby Developer")
  hello_user = HelloWorld.new("Amazing Coder")
  
  # Display greetings
  hello_default.display_greeting
  puts
  hello_ruby.display_greeting
  puts
  hello_user.display_greeting
  
  puts "=" * 40
  puts "Thanks for using our Hello World app!"
  puts "=" * 40
end