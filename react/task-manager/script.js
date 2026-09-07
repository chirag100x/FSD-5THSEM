const STORAGE_KEY = "task-manager-tasks-v1";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(text) {
  return {
    id: Date.now() + Math.random(),
    text: text.trim(),
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  };
}

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    taskInput.focus();
    return;
  }

  tasks.unshift(createTask(text));
  taskInput.value = "";
  saveTasks();
  render();
  taskInput.focus();
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id !== id) return task;

    const completed = !task.completed;
    return {
      ...task,
      completed,
      completedAt: completed ? new Date().toISOString() : null
    };
  });

  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(dateString));
}

function formatDateTime(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(dateString));
}

function getVisibleTasks() {
  if (currentFilter === "completed") {
    return tasks.filter(task => task.completed);
  }

  if (currentFilter === "pending") {
    return tasks.filter(task => !task.completed);
  }

  return tasks;
}

function renderTasks() {
  const visible = getVisibleTasks();
  taskList.innerHTML = "";

  emptyState.style.display = visible.length ? "none" : "grid";

  visible.forEach(task => {
    const item = document.createElement("article");
    item.className = "task-item";

    item.innerHTML = `
      <input
        class="check"
        type="checkbox"
        ${task.completed ? "checked" : ""}
        aria-label="Mark ${escapeHtml(task.text)} as ${task.completed ? "pending" : "completed"}"
      >
      <div>
        <p class="task-name ${task.completed ? "done" : ""}">${escapeHtml(task.text)}</p>
        <span class="task-date">
          ${task.completed
            ? `Completed ${formatDateTime(task.completedAt)}`
            : `Created ${formatDate(task.createdAt)}`}
        </span>
      </div>
      <button class="delete-btn" aria-label="Delete task" title="Delete task">×</button>
    `;

    item.querySelector(".check").addEventListener("change", () => toggleTask(task.id));
    item.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
    taskList.appendChild(item);
  });
}

function renderStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  document.getElementById("totalCount").textContent = total;
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("pendingCount").textContent = pending;
  document.getElementById("completedBadge").textContent = completed;
  document.getElementById("progressText").textContent = `${percentage}% complete`;
  document.getElementById("progressBar").style.width = `${percentage}%`;
}

function renderCompletedDates() {
  const container = document.getElementById("completedDates");
  const completed = tasks
    .filter(task => task.completed)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  if (!completed.length) {
    container.innerHTML = '<p class="muted">Completed tasks will appear here.</p>';
    return;
  }

  container.innerHTML = completed.map(task => `
    <div class="completed-date-item">
      <strong>${escapeHtml(task.text)}</strong>
      <span>✓ ${formatDateTime(task.completedAt)}</span>
    </div>
  `).join("");
}

function render() {
  renderStats();
  renderTasks();
  renderCompletedDates();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addTask();
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    document.querySelectorAll(".filter").forEach(btn => {
      btn.classList.toggle("active", btn === button);
    });

    renderTasks();
  });
});

render();
