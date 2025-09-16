
let pending_tasks = [];
let completed_tasks = [];


function addTask() {
    // Call el textbox w el pending tasks list
    const task_input = document.getElementById("task-input");
    const pending_tasks_list = document.getElementById("202"); // ana mesameeha keda

    if (task_input.value == '') {
        alert("You must write a task!");
    } else {

        // Add the new to task to local storage (I didn't use JSON objects 3ashan mafesh property lel task gher its name)
        console.log(task_input.value);
        pending_tasks.push(task_input.value);

        console.log(pending_tasks);

        // Create new typical list item
        let li = document.createElement("li");
        li.className = "list-group-item d-flex align-items-center task-item"

        li.innerHTML = `
        ${task_input.value}
        <div class="btn-group ms-auto">
        <button type="button" onclick="deleteTask(this)" class="btn btn-sm btn-outline-danger">Delete</button>
        <button type="button" onclick="completeTask(this)" class="btn btn-sm btn-outline-success">Done</button>
        </div>
    `;

        console.log(li);

        // Add the new item to the list
        pending_tasks_list.appendChild(li);

        task_input.value = ''; // reset el text box tany
    }
}

function deleteTask(button) {
    const li = button.closest("li"); // el ancestor bta3 el button badal ma a3ml id le kol li
    // Nshelha ml DOM
    if (li) li.remove();
    // Nshelha b2a ml list
    const taskName = li.childNodes[0].textContent.trim();
    // console.log(taskName);
    pending_tasks = pending_tasks.filter(t => t !== taskName);
    completed_tasks = completed_tasks.filter(t => t !== taskName);
    console.log("pending_tasks:", pending_tasks);
    console.log("completed_tasks:", completed_tasks);

}

function completeTask(button) {
    const li = button.closest("li");
    const pending_tasks_list = document.getElementById("200"); // bardo ana mesameeha keda

    // Already hatshelha ml pending tasks list (interface & inner storage)
    deleteTask(button);

    const taskName = li.childNodes[0].textContent.trim();

    completed_tasks.push(taskName);
    console.log("completed_tasks:", completed_tasks);

    // 3ashan nsheel el done button
    li.className = "list-group-item d-flex align-items-center task-item"
    li.innerHTML = `
    ${taskName}
    <div class="btn-group ms-auto">
    <button type="button" onclick="deleteTask(this)" class="btn btn-sm btn-outline-danger">Delete</button>
    </div>
`;
    // li.classList.add('task-item');

    pending_tasks_list.appendChild(li);
}

function searchTask() {

  const query = document.getElementById("search-input").value.toLowerCase(); // Not case sensitive
  console.log(query);

  const itemsList = Array.from(document.getElementsByClassName("task-item"));

  // Han3ady 3ala kol el items w nelghy el display bta3 el msh by match el query
  itemsList.forEach(li => {
        const taskName = li.childNodes[0].textContent.trim().toLowerCase();
        if (taskName.includes(query)) {
            // console.log(true);
            li.style.removeProperty("display");
        } else li.style.setProperty("display", "none", "important");
    });

}
