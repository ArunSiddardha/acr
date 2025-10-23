class TodoItem
  attr_accessor :id, :title, :description, :completed, :priority, :due_date, :created_at
  
  def initialize(title, description = "", priority = "normal", due_date = nil)
    @id = generate_id
    @title = title
    @description = description
    @completed = false
    @priority = priority # low, normal, high
    @due_date = due_date
    @created_at = Time.now
  end
  
  def complete!
    @completed = true
  end
  
  def incomplete!
    @completed = false
  end
  
  def completed?
    @completed
  end
  
  def overdue?
    return false unless @due_date
    @due_date < Date.today && !@completed
  end
  
  def to_hash
    {
      id: @id,
      title: @title,
      description: @description,
      completed: @completed,
      priority: @priority,
      due_date: @due_date,
      created_at: @created_at
    }
  end
  
  def self.from_hash(data)
    item = allocate
    item.instance_variable_set(:@id, data[:id])
    item.instance_variable_set(:@title, data[:title])
    item.instance_variable_set(:@description, data[:description])
    item.instance_variable_set(:@completed, data[:completed])
    item.instance_variable_set(:@priority, data[:priority])
    item.instance_variable_set(:@due_date, data[:due_date])
    item.instance_variable_set(:@created_at, data[:created_at])
    item
  end
  
  def to_s
    status = @completed ? "✓" : " "
    priority_symbol = case @priority
                      when "high" then "!"
                      when "low" then "-"
                      else ""
                      end
    
    due_info = if @due_date
                 if overdue?
                   " (OVERDUE: #{@due_date})"
                 else
                   " (Due: #{@due_date})"
                 end
               else
                 ""
               end
    
    "[#{status}] #{@id}. #{@title}#{priority_symbol}#{due_info}"
  end
  
  private
  
  def generate_id
    Time.now.to_i.to_s(36) + rand(1000).to_s(36)
  end
end
