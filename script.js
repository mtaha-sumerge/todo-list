import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyABDzOjCMgiRe-s2ScXD1qlC_ZaYeKu428",
    authDomain: "todo-list-ce942.firebaseapp.com",
    databaseURL: "https://todo-list-ce942-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-list-ce942",
    storageBucket: "todo-list-ce942.firebasestorage.app",
    messagingSenderId: "417090112488",
    appId: "1:417090112488:web:9127859107a14eecfef25d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Nakhod el two collections 3la gamb el awal
const pending_tasks = collection(db, 'pending_tasks');
const completed_tasks = collection(db, 'completed_tasks');

async function loadTasks() {

    // Bakhod spanshot mn el database at this moment w ba extract el tasks (documents)
    try {
        const pending_snapshot = await getDocs(pending_tasks);
        const completed_snapshot = await getDocs(completed_tasks);

        const pendingTasks = pending_snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const completedTasks = completed_snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Pending tasks:', pendingTasks);
        console.log('Completed tasks:', completedTasks);

        // Now time to re render
        // Get el HTML lists
        const pending_tasks_list = document.getElementById("202");
        const completed_tasks_list = document.getElementById("200");

        // Very important clear the old content
        pending_tasks_list.innerHTML = '';
        completed_tasks_list.innerHTML = '';

        // Create a list item le kol task mn awal w gdeed
        pendingTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center task-item";
            li.innerHTML = `
            ${task.name}
            <div class="btn-group ms-auto">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteTask('${task.id}', 'pending')">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-success" onclick="completeTask('${task.id}', '${task.name}')">Done</button>
            </div>
            `;
            pending_tasks_list.appendChild(li);
        });

        completedTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center task-item";
            li.innerHTML = `
            ${task.name}
            <div class="btn-group ms-auto">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteTask('${task.id}', 'completed')">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-primary" onclick="undo('${task.id}', '${task.name}')">Undone</button>
            </div>
            `;
            completed_tasks_list.appendChild(li);
        });
    } catch (error) {
        alert("Couldn't retrieve documents");
    }
}


// document.addEventListener('DOMContentLoaded', () => {
//   loadTasks();
// });
// document.getElementById("add").addEventListener('click', addTask);
// Above was before making the functions global by:
window.loadTasks = loadTasks
window.addTask = addTask;
window.deleteTask = deleteTask;
window.completeTask = completeTask;
window.searchTasks = searchTasks;
window.undo = undo;
// 3ashan n-call it fl html


async function addTask() {
    // Call el textbox w el pending tasks list
    const task_input = document.getElementById("task-input");

    if (task_input.value == '') {
        alert("You must write a task!");
        return;
    }

    try {
        await addDoc(pending_tasks, { name: task_input.value });
    } catch (error) {
        alert("Could not add task");
    }
    task_input.value = ''; // reset el text box tany
    await loadTasks();
}

async function deleteTask(taskId, status) {
    try {
        if (status === 'pending')
            await deleteDoc(doc(pending_tasks, taskId));
        else if (status === 'completed')
            await deleteDoc(doc(completed_tasks, taskId));
    } catch (error) {
        alert("Could not delete task")
    }
    await loadTasks();
}

async function completeTask(taskId, taskName) {
    try {
        await addDoc(completed_tasks, { name: taskName });
        deleteTask(taskId, 'pending');
    } catch (error) {
        alert("Could not move task to completed");
    }
    loadTasks();
}

async function undo(taskId, taskName) {
    try {
        await addDoc(pending_tasks, { name: taskName });
        deleteTask(taskId, 'completed');
    } catch (error) {
        alert("Could not move task to completed");
    }
    loadTasks();
}


async function searchTasks() {

    // Bakhod spanshot mn el database at this moment w ba extract el tasks (documents)
    try {
        const pending_snapshot = await getDocs(pending_tasks);
        const completed_snapshot = await getDocs(completed_tasks);

        let pendingTasks = pending_snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        let completedTasks = completed_snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Pending tasks:', pendingTasks);
        console.log('Completed tasks:', completedTasks);

        const query = document.getElementById("search-input").value.toLowerCase();

        if (!query) {
            loadTasks();
            return;
        };

        console.log(query);
        pendingTasks = pendingTasks.filter(p => p.name.toLowerCase().includes(query)); // ES6 w keda
        console.log(pendingTasks);
        completedTasks = completedTasks.filter(p => p.name.toLowerCase().includes(query));
        console.log(completedTasks);

        // Now time to re render
        // Get el HTML lists
        const pending_tasks_list = document.getElementById("202");
        const completed_tasks_list = document.getElementById("200");

        // Very important clear the old content
        pending_tasks_list.innerHTML = '';
        completed_tasks_list.innerHTML = '';

        // Create a list item le kol task mn awal w gdeed
        pendingTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center task-item";
            li.innerHTML = `
            ${task.name}
            <div class="btn-group ms-auto">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteTask('${task.id}', 'pending')">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-success" onclick="completeTask('${task.id}', '${task.name}')">Done</button>
            </div>
            `;
            pending_tasks_list.appendChild(li);
        });

        completedTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center task-item";
            li.innerHTML = `
            ${task.name}
            <div class="btn-group ms-auto">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteTask('${task.id}', 'completed')">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-primary" onclick="undo('${task.id}', '${task.name}')">Undone</button>
            </div>
            `;
            completed_tasks_list.appendChild(li);
        });
    } catch(error) {
        alert("Couldn't retrieve documents");
    }
}
