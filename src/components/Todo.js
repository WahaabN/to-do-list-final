const Todo = (props) => {
  const todos = props.todos;
  const handleDelete = props.handleDelete;
  const handleComplete = props.handleComplete;

  return (
    <div>
      {todos.map((todo, index) => (
        <div className="to-do-item" key={todo.id}>
          <div className={todo.isCompleted ? "completed-task" : ""}>
            {index + 1}: &nbsp;
            {todo.task}
          </div>
          <div className={todo.isCompleted ? "completed-task" : ""}>
            {todo.date} &nbsp;
            {todo.time}
          </div>
          <div>
            <button
              className="check-task-btn" {...todo.isCompleted ? "completed-task" : ""}
              onClick = { () => handleComplete(todo.id, todo.task, todo.date, todo.time, true)}
            >
              <span class="material-symbols-outlined">check</span>
            </button>
          </div>
          <button
            className="delete-task-btn"
            onClick={() => {
              handleDelete(todo.id);
            }}
          >
            <span className="material-icons-outlined">delete</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
