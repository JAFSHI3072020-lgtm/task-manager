const { loadTasks, saveTasks } = require('./fileHandler');
const { capitalize } = require('./utils');

let tasks = loadTasks();
let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 101;

function addTask(title, description, priority, dueDate) {
  const normalizedTitle    = title.trim();
  const normalizedPriority = capitalize(priority.trim());
  const normalizedDate     = dueDate.trim();

  const duplicate = tasks.find(
    t => t.title.toLowerCase() === normalizedTitle.toLowerCase() &&
         t.dueDate === normalizedDate
  );
  if (duplicate)
    return { success: false, message: 'Error: Task with same title and due date already exists.' };

  const newTask = {
    id:          nextId++,
    title:       normalizedTitle,
    description: description.trim(),
    priority:    normalizedPriority,
    dueDate:     normalizedDate,
    status:      'Pending',
    createdAt:   new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  return { success: true, message: `Task added successfully! (ID: ${newTask.id})` };
}

function getAllTasks() {
  return tasks;
}

function getTasksGrouped() {
  const groups = { High: [], Medium: [], Low: [] };
  tasks.forEach(t => {
    const key = capitalize(t.priority);
    if (groups[key]) groups[key].push(t);
    else groups['Low'].push(t);
  });
  return groups;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === Number(id));
  if (index === -1)
    return { success: false, message: `Error: No task found with ID ${id}.` };
  tasks.splice(index, 1);
  saveTasks(tasks);
  return { success: true, message: 'Task deleted successfully.' };
}

function updateStatus(id, newStatus) {
  const task = tasks.find(t => t.id === Number(id));
  if (!task)
    return { success: false, message: `Error: No task found with ID ${id}.` };

  const normalized = newStatus.trim().toLowerCase();
  const statusMap = { 'pending': 'Pending', 'in progress': 'In Progress', 'completed': 'Completed' };
  if (!statusMap[normalized])
    return { success: false, message: 'Error: Status must be Pending, In Progress, or Completed.' };

  task.status = statusMap[normalized];
  saveTasks(tasks);
  return { success: true, message: `Task [${id}] status updated to "${task.status}".` };
}

function searchTasks({ title, status, priority }) {
  return tasks.filter(t => {
    let match = true;
    if (title)    match = match && t.title.toLowerCase().includes(title.toLowerCase());
    if (status)   match = match && t.status.toLowerCase() === status.toLowerCase();
    if (priority) match = match && t.priority.toLowerCase() === priority.toLowerCase();
    return match;
  });
}

function findById(id) {
  return tasks.find(t => t.id === Number(id)) || null;
}

module.exports = { addTask, getAllTasks, getTasksGrouped, deleteTask, updateStatus, searchTasks, findById };