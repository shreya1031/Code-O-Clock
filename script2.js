
// VARIABLES

let timer = 0;
let interval = null;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const taskName = document.getElementById("taskName");
const projectSelect = document.getElementById("projectSelect");
const tableBody = document.getElementById("taskTableBody");

// timer function
function updateTimer() {
    timer++;
    let hrs = Math.floor(timer / 3600);
    let mins = Math.floor((timer % 3600) / 60);
    let secs = timer % 60;

    timerDisplay.textContent =
        String(hrs).padStart(2, "0") + ":" +
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
    const project = projectSelect.value;
    const task = taskName.value.trim();

    
    if (!project) {
        alert("Please select a project type before starting!");
        return;
    }

    if (task === "") {
        alert("Please enter a task description before starting!");
        return;
    }

    // Prevent multiple intervals
    if (interval) return;

    interval = setInterval(updateTimer, 1000);
});


pauseBtn.addEventListener("click", () => {
    const project = projectSelect.value;
    const task = taskName.value.trim();

    if (!interval) {
        alert("Timer has not started yet!");
        return;
    }

    if (!project) {
        alert("Please select a project type before pausing!");
        return;
    }

    if (task === "") {
        alert("Please enter a task description before pausing!");
        return;
    }

    clearInterval(interval);
    interval = null;

    addTaskToTable("Pending");
});


stopBtn.addEventListener("click", () => {
    const project = projectSelect.value;
    const task = taskName.value.trim();

    if (!interval) {
        alert("Timer has not started yet!");
        return;
    }

    if (!project) {
        alert("Please select a project type before stopping!");
        return;
    }

    if (task === "") {
        alert("Please enter a task description before stopping!");
        return;
    }

    clearInterval(interval);
    interval = null;

    addTaskToTable("Completed");

    // Reset timer
    timer = 0;
    timerDisplay.textContent = "00:00:00";
});



// ADD ROW TO TABLE
function addTaskToTable(status) {
    let date = new Date().toISOString().split("T")[0].replace(/-/g, "/");
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${date}</td>
        <td>${timerDisplay.textContent}</td>
        <td class="editable">${taskName.value || "Untitled Task"}</td>
        <td>${status}</td>
        <td class="actions">
            <span class="edit">✏️</span>
            <span class="delete">🗑️</span>
        </td>
    `;

    tableBody.appendChild(row);

    enableRowActions(row);


    // Clear text box's
    
    taskName.value = "";
    projectSelect.selectedIndex = 0; 
}

// Row edit

function enableRowActions(row) {
    const editBtn = row.querySelector(".edit");
    const deleteBtn = row.querySelector(".delete");
    const projectCell = row.querySelector(".editable");

    // Edit project name
    editBtn.addEventListener("click", () => {
        let newName = prompt("Edit Task / Project Name:", projectCell.textContent);
        if (newName) {
            projectCell.textContent = newName;
        }
    });

    // Delete row
    deleteBtn.addEventListener("click", () => {
        row.remove();
    });
}
