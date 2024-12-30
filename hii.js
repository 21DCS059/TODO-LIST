document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.toggle("completed", task.completed);

            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskItem.querySelector("span").addEventListener("click", () => toggleComplete(index));

            taskList.appendChild(taskItem);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", addTask);

    // Render tasks initially
    renderTasks();
});
