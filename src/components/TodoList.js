import { useState } from "react/cjs/react.development";
import Todo from "./Todo";

const ToDoList = (props) => {
    const todos = props.todos;
    const handleDelete = props.handleDelete;
    const handleComplete = props.handleComplete;
    return (
        <div className="to-do-list-container">
           
          

            <Todo handleComplete = {handleComplete} todos = {todos} handleDelete = {handleDelete} />
        </div>
      );
}
 
export default ToDoList;