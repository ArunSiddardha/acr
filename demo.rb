#!/usr/bin/env ruby

# Demo script to show the Ruby Todo App functionality
require_relative 'todo_list'

puts "🚀 Ruby Todo App - Demo Script"
puts "=" * 50

# Create a new todo list
todo_list = TodoList.new

puts "\n📝 Adding sample todos..."

# Add some sample todos
todo1 = todo_list.add_todo("Learn Ruby programming", "Complete Ruby tutorial and exercises", "high", "2024-01-15")
todo2 = todo_list.add_todo("Buy groceries", "Milk, bread, eggs, fruits", "normal", "2024-01-10")
todo3 = todo_list.add_todo("Call mom", "", "normal")
todo4 = todo_list.add_todo("Finish project report", "Complete the quarterly analysis", "high", "2024-01-12")
todo5 = todo_list.add_todo("Exercise", "30 minutes cardio", "low")

puts "✅ Added #{todo_list.count} todos"

puts "\n📋 Listing all todos:"
puts "-" * 40
todo_list.list_todos.each_with_index do |todo, index|
  puts "#{index + 1}. #{todo}"
  puts "   📄 #{todo.description}" unless todo.description.empty?
end

puts "\n✅ Completing some todos..."
# Complete a few todos
todo_list.complete_todo(todo2.id)
todo_list.complete_todo(todo5.id)

puts "\n📋 Listing pending todos:"
puts "-" * 40
pending = todo_list.list_todos(:pending)
pending.each_with_index do |todo, index|
  puts "#{index + 1}. #{todo}"
  puts "   📄 #{todo.description}" unless todo.description.empty?
end

puts "\n📋 Listing completed todos:"
puts "-" * 40
completed = todo_list.list_todos(:completed)
completed.each_with_index do |todo, index|
  puts "#{index + 1}. #{todo}"
  puts "   📄 #{todo.description}" unless todo.description.empty?
end

puts "\n🔍 Searching for 'project':"
puts "-" * 40
results = todo_list.search_todos("project")
results.each_with_index do |todo, index|
  puts "#{index + 1}. #{todo}"
  puts "   📄 #{todo.description}" unless todo.description.empty?
end

puts "\n📊 Todo Statistics:"
puts "-" * 40
puts "📝 Total todos:     #{todo_list.count}"
puts "✅ Completed:       #{todo_list.completed_count}"
puts "⏳ Pending:         #{todo_list.pending_count}"
puts "🚨 Overdue:         #{todo_list.overdue_count}"

completion_rate = todo_list.count > 0 ? (todo_list.completed_count.to_f / todo_list.count * 100).round(1) : 0
puts "📈 Completion rate: #{completion_rate}%"

puts "\n🎉 Demo completed! The todos have been saved to 'todos.json'"
puts "💡 Run 'ruby todo_app.rb' to start the interactive todo app!"
