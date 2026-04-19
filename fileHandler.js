const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'tasks.json');

function loadTasks() {
  try {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Warning: Could not load tasks file. Starting fresh.');
    return [];
  }
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (err) {
    console.error('Error: Could not save tasks to file.', err.message);
  }
}

module.exports = { loadTasks, saveTasks };