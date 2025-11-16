import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setTasks(await getTasks());
  }

  async function addTask() {
    if (!title.trim() || !description.trim()) return;

    await createTask({ title, description, isCompleted: false });

    setTitle("");
    setDescription("");
    loadTasks();
  }

  async function removeTask(id) {
    await deleteTask(id);
    loadTasks();
  }

  async function saveUpdatedTask() {
    await updateTask(editId, {
      title: editTitle,
      description: editDescription,
      isCompleted: false,
    });

    setEditId(null);
    setEditTitle("");
    setEditDescription("");

    loadTasks();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      {/* Add Task */}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ padding: "8px", width: "250px" }}
        />
        <br />
        <br />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ padding: "8px", width: "250px" }}
        />
        <br />
        <br />

        <button onClick={addTask} style={{ padding: "8px" }}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "15px" }}>
            {/* If editing this task */}
            {editId === task.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ padding: "6px", width: "200px" }}
                />
                <br />
                <br />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ padding: "6px", width: "200px" }}
                />
                <br />
                <br />
                <button onClick={saveUpdatedTask}>Save</button>
                <button
                  onClick={() => setEditId(null)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Normal display
              <div>
                <strong>{task.title}</strong>
                <br />
                <span style={{ color: "gray" }}>{task.description}</span>
                <br />

                <button
                  onClick={() => {
                    setEditId(task.id);
                    setEditTitle(task.title);
                    setEditDescription(task.description);
                  }}
                  style={{
                    marginTop: "5px",
                    padding: "4px 8px",
                    background: "orange",
                    color: "white",
                    border: "none",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => removeTask(task.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "4px 8px",
                    background: "red",
                    color: "white",
                    border: "none",
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
