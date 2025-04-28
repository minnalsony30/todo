import { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';

const baseURL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(baseURL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (text.trim() === "") return;
    const res = await axios.post(baseURL, { text });
    setTasks([...tasks, res.data]);
    setText("");
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${baseURL}/${id}`, { completed: !completed });
    setTasks(tasks.map(task => task.id === id ? res.data : task));
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{textDecoration: task.completed ? "line-through" : "none"}}>
            {task.text}
            <button onClick={() => toggleComplete(task.id, task.completed)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
