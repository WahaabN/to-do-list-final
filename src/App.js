import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import ToDoList from "./components/TodoList";
import Navbar from "./components/Navbar";

function App() {
  const [todos, setTodDos] = useState([]);

  const [mainTask, setMainTask] = useState("Test");

  const fetchData = () => {
    fetch("http://localhost:8000/tasks/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTodDos(data);
      });
  };

  const handleDelete = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8000/tasks/" + id, options)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((update) => {
        console.log(update);
        fetchData();
      });
  };

  const addTask = (task) => {
    const date = new Date();
    const listLength = todos.length;
    let newData = {
      id: Math.floor(Math.random(listLength) * 1000000),
      task: task,
      date: date.getDate() + "/" + (1 + date.getMonth()),
      time: date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2),
      isCompleted: false,
    };

    /*let newTodos = todos.slice();
    newTodos.push(newData);
    console.log(newTodos);
    console.log(todos);
     setTodDos(newTodos);*/

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    };

    console.log(JSON.stringify(newData));

    fetch("http://localhost:8000/tasks/", options)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((update) => {
        console.log(update);
        fetchData();
      });
  };

  const handleComplete = (id, task, date, time, isCompleted) => {
    let updatedData = {
      id: id,
      task: task,
      date: date,
      time: time,
      isCompleted: isCompleted,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    };

    console.log(JSON.stringify(updatedData));

    fetch("http://localhost:8000/tasks/" + id, options)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((update) => {
        console.log(update);
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
      <Navbar />
      <div className="body-content">
        <ToDoList
          todos={todos}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
        />
      
        <form action="javascript:void(0);">
          <input id="task-to-add"></input>
          <button
            id
            onClick={() => {
              addTask(document.getElementById("task-to-add").value);
            }}
          >
            Add task
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
