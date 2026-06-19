let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks(filter = "all") {

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        if (
            filter === "active" && task.completed ||
            filter === "completed" && !task.completed
        ) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function filterTasks(type) {
    displayTasks(type);
}

displayTasks();