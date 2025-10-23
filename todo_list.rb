require 'json'
require 'date'
require_relative 'todo_item'

class TodoList
  DATA_FILE = 'todos.json'
  
  def initialize
    @todos = []
    load_todos
  end
  
  def add_todo(title, description = "", priority = "normal", due_date = nil)
    due_date = Date.parse(due_date) if due_date.is_a?(String) && !due_date.empty?
    todo = TodoItem.new(title, description, priority, due_date)
    @todos << todo
    save_todos
    todo
  end
  
  def list_todos(filter = :all)
    case filter
    when :completed
      @todos.select(&:completed?)
    when :pending
      @todos.reject(&:completed?)
    when :overdue
      @todos.select(&:overdue?)
    else
      @todos
    end
  end
  
  def find_todo(id)
    @todos.find { |todo| todo.id == id }
  end
  
  def complete_todo(id)
    todo = find_todo(id)
    if todo
      todo.complete!
      save_todos
      true
    else
      false
    end
  end
  
  def incomplete_todo(id)
    todo = find_todo(id)
    if todo
      todo.incomplete!
      save_todos
      true
    else
      false
    end
  end
  
  def delete_todo(id)
    initial_count = @todos.length
    @todos.reject! { |todo| todo.id == id }
    if @todos.length < initial_count
      save_todos
      true
    else
      false
    end
  end
  
  def search_todos(query)
    @todos.select do |todo|
      todo.title.downcase.include?(query.downcase) ||
      todo.description.downcase.include?(query.downcase)
    end
  end
  
  def count
    @todos.length
  end
  
  def completed_count
    @todos.count(&:completed?)
  end
  
  def pending_count
    @todos.count { |todo| !todo.completed? }
  end
  
  def overdue_count
    @todos.count(&:overdue?)
  end
  
  def clear_completed
    initial_count = @todos.length
    @todos.reject!(&:completed?)
    save_todos
    initial_count - @todos.length
  end
  
  private
  
  def save_todos
    data = @todos.map(&:to_hash)
    File.write(DATA_FILE, JSON.pretty_generate(data))
  end
  
  def load_todos
    return unless File.exist?(DATA_FILE)
    
    begin
      data = JSON.parse(File.read(DATA_FILE), symbolize_names: true)
      @todos = data.map { |item_data| TodoItem.from_hash(item_data) }
    rescue JSON::ParserError
      puts "Warning: Could not parse todos file. Starting with empty list."
      @todos = []
    end
  end
end
