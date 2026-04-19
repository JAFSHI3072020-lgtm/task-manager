function validateTitle(title) {
  if (!title || title.trim() === '') return 'Error: Title cannot be empty.';
  return null;
}

function validatePriority(priority) {
  const valid = ['low', 'medium', 'high'];
  if (!priority || !valid.includes(priority.trim().toLowerCase()))
    return 'Error: Priority must be Low, Medium, or High.';
  return null;
}

function validateDate(date) {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date.trim()))
    return 'Error: Due date must be in YYYY-MM-DD format.';
  if (isNaN(new Date(date.trim()).getTime()))
    return 'Error: Invalid date value.';
  return null;
}

function validateId(id) {
  if (!id || isNaN(Number(id)) || !Number.isInteger(Number(id)))
    return 'Error: ID must be a numeric value.';
  return null;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function padEnd(str, len) {
  str = String(str);
  while (str.length < len) str += ' ';
  return str.slice(0, len);
}

function formatTaskRow(index, task) {
  const id     = padEnd(`[${task.id}]`, 7);
  const title  = padEnd(task.title, 22);
  const status = padEnd(task.status, 14);
  const due    = `Due: ${task.dueDate}`;
  return `  ${padEnd(index, 3)} ${id} ${title} ${status} ${due}`;
}

module.exports = {
  validateTitle, validatePriority, validateDate, validateId,
  capitalize, padEnd, formatTaskRow,
};