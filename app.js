const readline = require("readline");
const { loadTasks } = require("./fileHandler");
const {
  addTask,
  viewTasks,
  deleteTask,
  updateStatus,
  searchTasks
} = require("./taskService");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = loadTasks();

function menu() {
  console.log("\n========= TASK MANAGER =========");
  console.log("1. Add Task");
  console.log("2. View Tasks");
  console.log("3. Search Task");
  console.log("4. Update Task Status");
  console.log("5. Delete Task");
  console.log("6. Exit");
  console.log("================================");

  rl.question("Enter your choice: ", choice => {
    switch (choice) {
      case "1":
        addTaskFlow();
        break;
      case "2":
        viewTasks(tasks);
        menu();
        break;
      case "3":
        rl.question("Enter search keyword: ", key => {
          searchTasks(tasks, key);
          menu();
        });
        break;
      case "4":
        rl.question("Enter Task ID: ", id => {
          rl.question("Enter new status: ", status => {
            updateStatus(tasks, id, status);
            menu();
          });
        });
        break;
      case "5":
        rl.question("Enter Task ID: ", id => {
          rl.question("Are you sure? (y/n): ", ans => {
            if (ans.toLowerCase() === "y") {
              deleteTask(tasks, id);
            }
            menu();
          });
        });
        break;
      case "6":
        rl.close();
        break;
      default:
        console.log("Invalid choice");
        menu();
    }
  });
}

function addTaskFlow() {
  rl.question("Enter Title: ", title => {
    rl.question("Enter Description: ", desc => {
      rl.question("Enter Priority: ", priority => {
        rl.question("Enter Due Date (YYYY-MM-DD): ", date => {
          addTask(tasks, title, desc, priority, date);
          menu();
        });
      });
    });
  });
}

menu();