const API_URL = "http://localhost:5045/api";

export async function getTasks() {
  const response = await fetch(`${API_URL}/task`);
  return response.json();
}

export async function createTask(task) {
  const response = await fetch(`${API_URL}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/task/${id}`, { method: "DELETE" });
}

// ✅ ADD THIS — UPDATE TASK
export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response;
}
