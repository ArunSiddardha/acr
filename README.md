# Ruby Todo App 📝

A feature-rich command-line todo application written in Ruby with persistent storage, priority levels, due dates, and an intuitive CLI interface.

## Features ✨

- ✅ Add, complete, and delete todo items
- 📋 List todos with filtering (all/pending/completed/overdue)
- ⭐ Priority levels (low, normal, high)
- 📅 Due dates with overdue detection
- 🔍 Search functionality
- 💾 Persistent file-based storage (JSON)
- 📊 Statistics and progress tracking
- 🎨 Clean, emoji-enhanced CLI interface

## Installation & Setup 🚀

1. **Clone or download** the todo app files
2. **Ensure Ruby is installed** (Ruby 2.7+ recommended)
3. **Navigate to the project directory**

```bash
cd path/to/todo-app
```

## Usage 🖥️

### Starting the Application

```bash
ruby todo_app.rb
```

### Available Commands

Once the app is running, you can use these commands:

#### Managing Todos 📝
- `add <title>` - Add a new todo with interactive prompts
- `list [filter]` - List todos
  - `list` or `list all` - Show all todos
  - `list pending` - Show only incomplete todos
  - `list done` - Show only completed todos
  - `list overdue` - Show only overdue todos
- `complete <id>` - Mark a todo as completed
- `incomplete <id>` - Mark a todo as incomplete
- `delete <id>` - Delete a todo (with confirmation)

#### Finding Todos 🔍
- `search <query>` - Search todos by title or description

#### Information & Maintenance 📊
- `stats` - Show todo statistics
- `clear` - Remove all completed todos (with confirmation)
- `help` - Show help message
- `quit` or `exit` - Exit the application

### Example Usage Session

```
📝 Welcome to Ruby Todo App!
Type 'help' for available commands or 'quit' to exit.

todo> add
📝 Enter todo title: Learn Ruby
📄 Enter description (optional): Complete Ruby tutorial and practice exercises
⭐ Enter priority (low/normal/high) [normal]: high
📅 Enter due date (YYYY-MM-DD, optional): 2024-01-15
✅ Added todo: [ ] abc123. Learn Ruby! (Due: 2024-01-15)

todo> list
📋 Todo List:
──────────────────────────────────────────────────
1. [ ] abc123. Learn Ruby! (Due: 2024-01-15)
   📄 Complete Ruby tutorial and practice exercises
──────────────────────────────────────────────────
📊 Total: 1 todo(s)

todo> complete abc123
✅ Todo marked as completed!

todo> stats
📊 Todo Statistics:
──────────────────────────────
📝 Total todos:     1
✅ Completed:       1
⏳ Pending:         0
🚨 Overdue:         0
📈 Completion rate: 100.0%
──────────────────────────────
```

## File Structure 📁

```
todo-app/
├── todo_app.rb      # Main application and CLI interface
├── todo_list.rb     # Todo list management and persistence
├── todo_item.rb     # Todo item model with properties
├── todos.json       # Data storage file (created automatically)
└── README.md        # This file
```

## Features in Detail 🔍

### Priority Levels
- **High priority** todos are marked with `!`
- **Low priority** todos are marked with `-`
- **Normal priority** todos have no special marking

### Due Dates
- Todos can have optional due dates
- Overdue todos are clearly marked as `(OVERDUE: date)`
- Use `list overdue` to see only overdue items

### Data Persistence
- All todos are automatically saved to `todos.json`
- Data persists between application sessions
- JSON format allows for easy backup and migration

### Search Functionality
- Search through both titles and descriptions
- Case-insensitive matching
- Shows total number of matching results

### Statistics
- Track total, completed, pending, and overdue todos
- Calculate completion percentage
- Monitor your productivity progress

## Error Handling 🛡️

The application includes robust error handling for:
- Invalid todo IDs
- Malformed dates
- Corrupted data files
- Empty inputs where required

## Customization 🎨

The app can be easily customized by modifying:
- **Emoji symbols** in the CLI interface
- **Priority levels** in `TodoItem` class
- **Data storage format** in `TodoList` class
- **Command aliases** in `TodoApp` class

## Requirements 📋

- Ruby 2.7 or higher
- Standard Ruby libraries (JSON, Date)
- Terminal/Command prompt access

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Contributing 🤝

Feel free to submit issues, feature requests, or pull requests to improve the todo app!

---

**Happy organizing!** 🎉
