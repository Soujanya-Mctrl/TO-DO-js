flatpickr("#taskDeadline", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: false,
    minuteIncrement: 1,
    minDate: new Date(),
  });

  const taskForm = document.getElementById("taskForm");
  const taskContainer = document.getElementById("taskContainer");
  let tasks = [];

  function renderTasks() {
    taskContainer.innerHTML = "";
    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.className = `task-card ${task.completed ? "completed" : ""}`;
      card.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Type:</strong> ${task.type}</p>
      <p><strong>Deadline:</strong> ${new Date(
        task.deadline
      ).toLocaleString()}</p>
      <p class="urgency"><strong>${
        task.completed ? "Completed" : "Pending"
      }</strong></p>
      <button class="complete-btn" onclick="markCompleted(${index})">
        <i class="fas fa-check"></i> Complete
      </button>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
      taskContainer.appendChild(card);
    });
  }

  function markCompleted(index) {
    tasks[index].completed = true;
    renderTasks();
    setTimeout(() => {
      tasks.splice(index, 1);
      renderTasks();
    }, 60000);
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value,
      type = document.getElementById("taskType").value;
    const deadline = document.getElementById("taskDeadline").value,
      description = document.getElementById("taskDescription").value;
    const category = document.getElementById("taskCategory").value;
    tasks.push({
      id: Date.now(),
      title,
      type,
      deadline,
      description,
      category,
      completed: false,
    });
    renderTasks();
    taskForm.reset();
  });