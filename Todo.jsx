import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
 

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const newTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(newTasks);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_,idx) => idx !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

 


  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={addTask}
            className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
        <div className="mb-4 flex justify-around">
          <label className="flex items-center">
            <input
              type="radio"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
              className="form-radio"
            />
            <span className="ml-2">All</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filter === "completed"}
              onChange={() => setFilter("completed")}
              className="form-radio"
            />
            <span className="ml-2">Completed</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filter === "incomplete"}
              onChange={() => setFilter("incomplete")}
              className="form-radio"
            />
            <span className="ml-2">Incomplete</span>
          </label>
        </div>
        <ul>
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 border-b ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.text}
              <div>
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className={`mr-2 p-2 rounded ${task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo
