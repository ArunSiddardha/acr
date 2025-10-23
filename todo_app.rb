#!/usr/bin/env ruby

require_relative 'todo_list'

class TodoApp
  def initialize
    @todo_list = TodoList.new
  end
  
  def run
    puts "📝 Welcome to Ruby Todo App!"
    puts "Type 'help' for available commands or 'quit' to exit.\n\n"
    
    loop do
      print "todo> "
      input = gets.chomp.strip
      
      break if input.downcase == 'quit' || input.downcase == 'exit'
      
      process_command(input)
    end
    
    puts "\n👋 Thanks for using Ruby Todo App!"
  end
  
  private
  
  def process_command(input)
    parts = input.split(' ', 2)
    command = parts[0].downcase
    args = parts[1]
    
    case command
    when 'help', '?'
      show_help
    when 'add', 'new'
      add_todo_interactive(args)
    when 'list', 'ls'
      list_todos(args)
    when 'complete', 'done'
      complete_todo(args)
    when 'incomplete', 'undone'
      incomplete_todo(args)
    when 'delete', 'rm'
      delete_todo(args)
    when 'search', 'find'
      search_todos(args)
    when 'stats', 'status'
      show_stats
    when 'clear'
      clear_completed
    when ''
      # Do nothing for empty input
    else
      puts "❌ Unknown command: #{command}. Type 'help' for available commands."
    end
  rescue => e
    puts "❌ Error: #{e.message}"
  end
  
  def show_help
    puts <<~HELP
      📋 Available Commands:
      
      📝 Managing Todos:
        add <title>                 - Add a new todo (interactive mode)
        list [all|pending|done]     - List todos (default: all)
        complete <id>               - Mark todo as completed
        incomplete <id>             - Mark todo as incomplete
        delete <id>                 - Delete a todo
      
      🔍 Finding Todos:
        search <query>              - Search todos by title/description
        
      📊 Information:
        stats                       - Show todo statistics
        clear                       - Remove all completed todos
        
      ❓ Help & Exit:
        help                        - Show this help message
        quit/exit                   - Exit the application
      
      💡 Tips:
        - Use 'list pending' to see only incomplete todos
        - Use 'list done' to see only completed todos
        - Todo IDs are shown in the list and used for complete/delete commands
    HELP
  end
  
  def add_todo_interactive(initial_title = nil)
    title = initial_title
    
    if title.nil? || title.empty?
      print "📝 Enter todo title: "
      title = gets.chomp.strip
    end
    
    if title.empty?
      puts "❌ Title cannot be empty!"
      return
    end
    
    print "📄 Enter description (optional): "
    description = gets.chomp.strip
    
    print "⭐ Enter priority (low/normal/high) [normal]: "
    priority = gets.chomp.strip.downcase
    priority = "normal" if priority.empty?
    priority = "normal" unless %w[low normal high].include?(priority)
    
    print "📅 Enter due date (YYYY-MM-DD, optional): "
    due_date_str = gets.chomp.strip
    due_date = nil
    
    if !due_date_str.empty?
      begin
        due_date = Date.parse(due_date_str)
      rescue Date::Error
        puts "⚠️  Invalid date format. Todo created without due date."
      end
    end
    
    todo = @todo_list.add_todo(title, description, priority, due_date)
    puts "✅ Added todo: #{todo}"
  end
  
  def list_todos(filter = nil)
    filter_sym = case filter&.downcase
                 when 'done', 'completed'
                   :completed
                 when 'pending', 'incomplete'
                   :pending
                 when 'overdue'
                   :overdue
                 else
                   :all
                 end
    
    todos = @todo_list.list_todos(filter_sym)
    
    if todos.empty?
      puts "📭 No todos found."
      return
    end
    
    filter_text = case filter_sym
                  when :completed then " (Completed)"
                  when :pending then " (Pending)"
                  when :overdue then " (Overdue)"
                  else ""
                  end
    
    puts "📋 Todo List#{filter_text}:"
    puts "─" * 50
    
    todos.each_with_index do |todo, index|
      puts "#{index + 1}. #{todo}"
      unless todo.description.empty?
        puts "   📄 #{todo.description}"
      end
    end
    
    puts "─" * 50
    puts "📊 Total: #{todos.length} todo(s)"
  end
  
  def complete_todo(id)
    if id.nil? || id.empty?
      puts "❌ Please provide a todo ID. Use 'list' to see todo IDs."
      return
    end
    
    if @todo_list.complete_todo(id)
      puts "✅ Todo marked as completed!"
    else
      puts "❌ Todo not found with ID: #{id}"
    end
  end
  
  def incomplete_todo(id)
    if id.nil? || id.empty?
      puts "❌ Please provide a todo ID. Use 'list' to see todo IDs."
      return
    end
    
    if @todo_list.incomplete_todo(id)
      puts "🔄 Todo marked as incomplete!"
    else
      puts "❌ Todo not found with ID: #{id}"
    end
  end
  
  def delete_todo(id)
    if id.nil? || id.empty?
      puts "❌ Please provide a todo ID. Use 'list' to see todo IDs."
      return
    end
    
    print "⚠️  Are you sure you want to delete this todo? (y/N): "
    confirmation = gets.chomp.strip.downcase
    
    if confirmation == 'y' || confirmation == 'yes'
      if @todo_list.delete_todo(id)
        puts "🗑️  Todo deleted successfully!"
      else
        puts "❌ Todo not found with ID: #{id}"
      end
    else
      puts "❌ Delete cancelled."
    end
  end
  
  def search_todos(query)
    if query.nil? || query.empty?
      puts "❌ Please provide a search query."
      return
    end
    
    results = @todo_list.search_todos(query)
    
    if results.empty?
      puts "🔍 No todos found matching: '#{query}'"
      return
    end
    
    puts "🔍 Search results for: '#{query}'"
    puts "─" * 50
    
    results.each_with_index do |todo, index|
      puts "#{index + 1}. #{todo}"
      unless todo.description.empty?
        puts "   📄 #{todo.description}"
      end
    end
    
    puts "─" * 50
    puts "📊 Found: #{results.length} todo(s)"
  end
  
  def show_stats
    total = @todo_list.count
    completed = @todo_list.completed_count
    pending = @todo_list.pending_count
    overdue = @todo_list.overdue_count
    
    completion_rate = total > 0 ? (completed.to_f / total * 100).round(1) : 0
    
    puts "📊 Todo Statistics:"
    puts "─" * 30
    puts "📝 Total todos:     #{total}"
    puts "✅ Completed:       #{completed}"
    puts "⏳ Pending:         #{pending}"
    puts "🚨 Overdue:         #{overdue}"
    puts "📈 Completion rate: #{completion_rate}%"
    puts "─" * 30
  end
  
  def clear_completed
    print "⚠️  Are you sure you want to delete all completed todos? (y/N): "
    confirmation = gets.chomp.strip.downcase
    
    if confirmation == 'y' || confirmation == 'yes'
      cleared = @todo_list.clear_completed
      puts "🗑️  Cleared #{cleared} completed todo(s)."
    else
      puts "❌ Clear cancelled."
    end
  end
end

# Run the app if this file is executed directly
if __FILE__ == $0
  app = TodoApp.new
  app.run
end
