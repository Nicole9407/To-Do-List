const taskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(listItem => {
        const taskSpan = listItem.querySelector('span').textContent;
        const isCompleted = listItem.classList.contains('completed');
        tasks.push({ text: taskSpan, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            listItem.classList.toggle('completed');
            saveTasks(); // Save when completion status changes
        });
        listItem.appendChild(checkbox);

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            saveTasks(); // Save when a task is deleted
        });
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
        taskInput.value = '';
        saveTasks(); // Save when a new task is added
    }
});

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (task.completed) {
                checkbox.checked = true;
                listItem.classList.add('completed');
            }
            checkbox.addEventListener('change', function() {
                listItem.classList.toggle('completed');
                saveTasks();
            });
            listItem.appendChild(checkbox);

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            listItem.appendChild(taskSpan);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', function() {
                taskList.removeChild(listItem);
                saveTasks();
            });
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
        });
    }
}

loadTasks(); // Call this function when the script runs to load any saved tasks