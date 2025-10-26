#!/usr/bin/env ruby

# Simple Hello World Ruby application
class HelloWorld
  def initialize(name = "World")
    @name = name
  end

  def greet
    puts "Hello, #{@name}!"
    puts "Welcome to Ruby programming!"
    puts "Current time: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"
  end

  def self.run
    # Create instances with different greetings
    default_greeting = new
    custom_greeting = new("Ruby Developer")
    
    puts "=" * 40
    puts "Ruby Hello World Application"
    puts "=" * 40
    
    default_greeting.greet
    puts
    custom_greeting.greet
    
    puts "=" * 40
    puts "Ruby version: #{RUBY_VERSION}"
    puts "Platform: #{RUBY_PLATFORM}"
    puts "=" * 40
  end
end

# Run the application if this file is executed directly
if __FILE__ == $0
  HelloWorld.run
end